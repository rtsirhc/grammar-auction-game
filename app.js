// ==========================================
// SCREENS
// ==========================================
const screens = {
    landing: document.getElementById('landing-screen'),
    clientJoin: document.getElementById('client-join-screen'),
    hostLobby: document.getElementById('host-lobby-screen'),
    hostGame: document.getElementById('host-game-screen'),
    clientLobby: document.getElementById('client-lobby-screen'),
    clientGame: document.getElementById('client-game-screen')
};

function showScreen(s) {
    Object.values(screens).forEach(el => { if (el) el.classList.remove('active'); });
    if (s) s.classList.add('active');
}
function showLoading(text) {
    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('loading-text').innerText = text;
}
function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}
function escHtml(s) {
    const d = document.createElement('div'); d.textContent = s; return d.innerHTML;
}

// ==========================================
// STATE
// ==========================================
let peer = null;
let connections = {};   // peerId -> DataConnection
let teams = {};         // peerId -> { id, name, bankroll, lastBet, lastChoice }
let isHost = false;

// Host
let currentQuestionIndex = 0;
let currentQuestion = null;
let gameQuestions = [];
let hostTimerInterval = null;
let timeLeft = 20;
let roundRevealed = false;

// Client
let hostConn = null;
let myBankroll = 1000;
let myTeamName = '';
let selectedOption = null;

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('room');

    document.body.addEventListener('click', () => {
        if (typeof audioCtx !== 'undefined' && audioCtx.state === 'suspended') audioCtx.resume();
    }, { once: true });

    document.getElementById('btn-host-game').addEventListener('click', initHost);
    document.getElementById('btn-show-join').addEventListener('click', () => {
        showScreen(screens.clientJoin);
        if (roomCode) document.getElementById('join-room-code').value = roomCode;
    });
    document.getElementById('btn-back-landing').addEventListener('click', () => showScreen(screens.landing));
    document.getElementById('btn-join-game').addEventListener('click', initClient);

    if (roomCode) {
        showScreen(screens.clientJoin);
        document.getElementById('join-room-code').value = roomCode;
    }

    document.getElementById('btn-mute').addEventListener('click', (e) => {
        const m = sounds.toggleMute();
        e.target.innerText = m ? 'Unmute 🔇' : 'Mute 🔊';
    });
});

// ==========================================
// HOST
// ==========================================
function initHost() {
    isHost = true;
    showLoading('Creating Room...');

    const roomCode = String(Math.floor(1000 + Math.random() * 9000));
    const peerId = 'grammar-auction-' + roomCode;

    peer = new Peer(peerId);

    peer.on('open', () => {
        hideLoading();
        showScreen(screens.hostLobby);
        document.getElementById('host-room-code-display').innerText = roomCode;

        const shareUrl = window.location.origin + window.location.pathname + '?room=' + roomCode;
        document.getElementById('share-url').innerText = shareUrl;

        document.getElementById('qrcode').innerHTML = '';
        new QRCode(document.getElementById('qrcode'), {
            text: shareUrl, width: 200, height: 200,
            colorDark: '#0f172a', colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });

        // Shuffle questions randomly
        gameQuestions = [...QUESTIONS].sort(() => 0.5 - Math.random());
    });

    peer.on('connection', (conn) => {
        conn.on('data', (data) => handleClientMsg(conn, data));
        conn.on('close', () => {
            delete teams[conn.peer];
            delete connections[conn.peer];
            updateLobbyUI();
            if (roundRevealed === false) updateBetsUI();
        });
    });

    document.getElementById('btn-copy-url').addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('share-url').innerText);
        const b = document.getElementById('btn-copy-url');
        b.innerText = '✓ Copied!';
        setTimeout(() => b.innerText = '📋 Copy Student Link', 2000);
    });

    document.getElementById('btn-start-game').addEventListener('click', startNextRound);
    document.getElementById('btn-skip-timer').addEventListener('click', endTimer);
    document.getElementById('btn-next-round').addEventListener('click', startNextRound);
}

function handleClientMsg(conn, msg) {
    if (msg.type === 'JOIN') {
        // duplicate name?
        if (Object.values(teams).some(t => t.name === msg.teamName)) {
            conn.send({ type: 'ERROR', message: 'Team name already taken!' });
            setTimeout(() => conn.close(), 500);
            return;
        }
        connections[conn.peer] = conn;
        teams[conn.peer] = { id: conn.peer, name: msg.teamName, bankroll: 1000, lastBet: 0, lastChoice: null };
        conn.send({ type: 'JOIN_SUCCESS', bankroll: 1000 });
        updateLobbyUI();
    }
    else if (msg.type === 'SUBMIT_BET') {
        const t = teams[conn.peer];
        if (t && !roundRevealed) {
            t.lastBet = Math.min(Math.max(10, msg.amount), t.bankroll);
            t.lastChoice = msg.choice;
            conn.send({ type: 'BET_CONFIRMED' });
            updateBetsUI();
        }
    }
}

function broadcast(msg) {
    Object.values(connections).forEach(c => { if (c.open) c.send(msg); });
}

// ---- Lobby UI ----
function updateLobbyUI() {
    const list = document.getElementById('host-team-list');
    const count = Object.keys(teams).length;
    document.getElementById('connectedCount').innerText = count;

    if (count === 0) {
        list.innerHTML = '<p style="color:#64748b;font-style:italic;font-size:0.85rem;grid-column:1/-1;">Waiting for students to join...</p>';
    } else {
        list.innerHTML = '';
        Object.values(teams).forEach(t => {
            const div = document.createElement('div');
            div.className = 'team-chip';
            div.innerHTML = '<span class="name">' + escHtml(t.name) + '</span>';
            const kb = document.createElement('button');
            kb.className = 'kick-btn'; kb.innerText = '✕';
            kb.onclick = () => {
                if (connections[t.id]) { connections[t.id].send({ type: 'KICKED' }); connections[t.id].close(); }
                delete teams[t.id]; delete connections[t.id];
                updateLobbyUI();
            };
            div.appendChild(kb);
            list.appendChild(div);
        });
    }

    const btn = document.getElementById('btn-start-game');
    btn.disabled = count < 1;
    btn.innerText = count < 1 ? '🎮 Need at least 1 team' : '🎮 Start Game (' + count + ' teams)';
}

// ---- Leaderboard ----
function updateLeaderboard() {
    const lb = document.getElementById('leaderboard-list');
    lb.innerHTML = '';
    const sorted = Object.values(teams).sort((a, b) => b.bankroll - a.bankroll);
    sorted.forEach((t, i) => {
        const row = document.createElement('div');
        row.className = 'lb-row';
        row.innerHTML = '<div class="lb-rank">#' + (i + 1) + '</div>' +
            '<div class="lb-name">' + escHtml(t.name) + '</div>' +
            '<div class="lb-balance">$' + t.bankroll + '</div>';
        lb.appendChild(row);
    });
}

// ---- Bets UI (during betting) ----
function updateBetsUI() {
    const grid = document.getElementById('bets-grid');
    grid.innerHTML = '';
    Object.values(teams).forEach(t => {
        const card = document.createElement('div');
        card.className = 'bet-card' + (t.lastChoice ? ' submitted' : '');
        let html = '<div class="team-name">' + escHtml(t.name) + '</div>';
        html += '<div class="balance">$' + t.bankroll + '</div>';
        if (t.lastChoice) {
            html += '<div class="bet-info">Bet: <span class="bet-amount">$' + t.lastBet + '</span></div>';
        } else {
            html += '<div class="bet-info" style="color:#94a3b8;">Waiting...</div>';
        }
        card.innerHTML = html;
        grid.appendChild(card);
    });
}

// ---- Bets UI (after reveal) ----
function updateBetsUIReveal(results) {
    const grid = document.getElementById('bets-grid');
    grid.innerHTML = '';
    Object.values(teams).forEach(t => {
        const r = results[t.id];
        const card = document.createElement('div');
        let cls = 'bet-card';
        if (r.result === 'WIN') cls += ' correct-reveal';
        else if (r.result === 'LOSE') cls += ' incorrect-reveal';
        else cls += ' no-bet-reveal';
        card.className = cls;

        let html = '<div class="team-name">' + escHtml(t.name) + '</div>';
        html += '<div class="balance">$' + t.bankroll + '</div>';

        if (t.lastChoice) {
            const choiceClass = r.result === 'WIN' ? 'correct-choice' : 'wrong-choice';
            html += '<div class="bet-info">Bet: <span class="bet-amount">$' + t.lastBet + '</span>';
            html += ' <span class="reveal-choice ' + choiceClass + '">' + t.lastChoice + '</span></div>';
        } else {
            html += '<div class="bet-info" style="color:#ef4444;">No bet (penalty!)</div>';
        }

        if (r.result === 'WIN') {
            html += '<div class="delta positive">+$' + r.change + '</div>';
        } else if (r.result === 'LOSE') {
            html += '<div class="delta negative">-$' + r.change + '</div>';
        } else {
            html += '<div class="delta negative">-$' + r.change + ' (penalty)</div>';
        }

        card.innerHTML = html;
        grid.appendChild(card);
    });
}

// ---- Game Flow ----
function startNextRound() {
    if (currentQuestionIndex >= gameQuestions.length) {
        alert('Game Over! All questions completed.');
        return;
    }

    currentQuestion = gameQuestions[currentQuestionIndex];
    currentQuestionIndex++;
    roundRevealed = false;

    // Reset bets
    Object.values(teams).forEach(t => { t.lastBet = 0; t.lastChoice = null; });

    showScreen(screens.hostGame);

    // Hide answer reveal + next button
    document.getElementById('answer-reveal').classList.add('hidden');
    document.getElementById('btn-next-round').classList.add('hidden');
    document.getElementById('btn-skip-timer').classList.remove('hidden');
    document.getElementById('btn-skip-timer').disabled = false;

    // Question
    document.getElementById('question-counter').innerText = 'Question ' + currentQuestionIndex + '/' + gameQuestions.length;
    document.getElementById('question-display').innerText = currentQuestion.question;

    // Options
    const og = document.getElementById('options-display');
    og.innerHTML = '';
    Object.entries(currentQuestion.options).forEach(([key, val]) => {
        const d = document.createElement('div');
        d.className = 'option-btn';
        d.id = 'host-opt-' + key;
        d.innerText = key + ') ' + val;
        og.appendChild(d);
    });

    // Timer
    timeLeft = 20;
    const td = document.getElementById('timer-display');
    td.innerText = timeLeft;
    td.classList.remove('urgent');

    clearInterval(hostTimerInterval);
    hostTimerInterval = setInterval(() => {
        timeLeft--;
        td.innerText = timeLeft;
        if (timeLeft <= 5) { sounds.tick(); td.classList.add('urgent'); }
        if (timeLeft <= 0) endTimer();
    }, 1000);

    // Broadcast to clients
    broadcast({
        type: 'START_BETTING',
        options: Object.keys(currentQuestion.options),
        optionTexts: currentQuestion.options
    });

    // Init bets grid
    updateBetsUI();
    updateLeaderboard();
}

function endTimer() {
    clearInterval(hostTimerInterval);
    document.getElementById('timer-display').innerText = '0';
    document.getElementById('timer-display').classList.remove('urgent');
    document.getElementById('btn-skip-timer').disabled = true;
    resolveBets();
}

function resolveBets() {
    roundRevealed = true;
    const correctAns = currentQuestion.correct;

    // Highlight correct option on host
    const correctEl = document.getElementById('host-opt-' + correctAns);
    if (correctEl) correctEl.classList.add('correct');
    Object.keys(currentQuestion.options).forEach(k => {
        if (k !== correctAns) {
            const el = document.getElementById('host-opt-' + k);
            if (el) el.classList.add('wrong');
        }
    });

    // Show answer reveal bar
    const revealBar = document.getElementById('answer-reveal');
    revealBar.classList.remove('hidden');
    revealBar.classList.add('correct-bg');
    revealBar.innerHTML = '<div class="verdict green">✅ Correct Answer: ' + correctAns + ') ' + escHtml(currentQuestion.options[correctAns]) + '</div>';

    // Calculate economy
    let bonusPot = 0;
    let correctTeamIds = [];
    const results = {};

    // Pass 1: collect losses to build the bonus pot
    Object.values(teams).forEach(t => {
        if (t.lastChoice === null) {
            // No vote penalty goes to pot
            t.bankroll -= 1000;
            bonusPot += 1000;
            results[t.id] = { result: 'NO_VOTE', change: 1000 };
        } else if (t.lastChoice !== correctAns) {
            // Wrong vote penalty goes to pot
            t.bankroll -= t.lastBet;
            bonusPot += t.lastBet;
            results[t.id] = { result: 'LOSE', change: t.lastBet };
        } else {
            // They are correct, save them for pass 2
            correctTeamIds.push(t.id);
        }
    });

    // Pass 2: distribute winnings to correct teams
    const bonusPerWinner = correctTeamIds.length > 0 ? Math.floor(bonusPot / correctTeamIds.length) : 0;
    correctTeamIds.forEach(id => {
        const t = teams[id];
        // Earn what they bet PLUS their share of the pot
        const totalWin = t.lastBet + bonusPerWinner;
        t.bankroll += totalWin;
        results[id] = { result: 'WIN', change: totalWin };
    });

    let anyoneCorrect = correctTeamIds.length > 0;

    // Sounds
    if (anyoneCorrect) sounds.chime(); else sounds.buzz();

    // Update host UI
    updateBetsUIReveal(results);
    updateLeaderboard();

    // Show next button
    document.getElementById('btn-skip-timer').classList.add('hidden');
    document.getElementById('btn-next-round').classList.remove('hidden');

    // Notify clients
    Object.values(teams).forEach(t => {
        const r = results[t.id];
        if (connections[t.id] && connections[t.id].open) {
            connections[t.id].send({
                type: 'RESULT',
                result: r.result,
                change: r.change,
                newBankroll: t.bankroll,
                correctAnswer: correctAns,
                correctText: currentQuestion.options[correctAns]
            });
        }
    });
}


// ==========================================
// CLIENT
// ==========================================
function initClient() {
    const roomCode = document.getElementById('join-room-code').value.trim();
    myTeamName = document.getElementById('join-team-name').value.trim();
    const errorDiv = document.getElementById('join-error');

    if (!roomCode || roomCode.length !== 4) {
        errorDiv.innerText = 'Please enter a valid 4-digit code.';
        errorDiv.classList.remove('hidden'); return;
    }
    if (!myTeamName) {
        errorDiv.innerText = 'Please enter a team name.';
        errorDiv.classList.remove('hidden'); return;
    }

    errorDiv.classList.add('hidden');
    showLoading('Connecting to Host...');

    peer = new Peer();
    peer.on('open', () => {
        hostConn = peer.connect('grammar-auction-' + roomCode);

        hostConn.on('open', () => {
            hostConn.send({ type: 'JOIN', teamName: myTeamName });
        });

        hostConn.on('data', handleHostMsg);

        hostConn.on('close', () => {
            alert('Disconnected from Host.');
            location.reload();
        });

        setTimeout(() => {
            if (!hostConn.open && !screens.clientLobby.classList.contains('active')) {
                hideLoading();
                errorDiv.innerText = 'Host not found. Check the code.';
                errorDiv.classList.remove('hidden');
                peer.destroy();
            }
        }, 6000);
    });
}

function handleHostMsg(msg) {
    hideLoading();

    if (msg.type === 'ERROR') {
        alert(msg.message);
        location.reload();
    }
    else if (msg.type === 'JOIN_SUCCESS') {
        myBankroll = msg.bankroll;
        document.getElementById('client-team-name-display').innerText = myTeamName;
        document.getElementById('client-team-name-game').innerText = myTeamName;
        document.getElementById('client-bankroll').innerText = myBankroll;
        showScreen(screens.clientLobby);
    }
    else if (msg.type === 'START_BETTING') {
        selectedOption = null;
        showScreen(screens.clientGame);

        document.getElementById('client-bankroll-game').innerText = myBankroll;
        document.getElementById('client-status-game').innerText = 'Place your bet!';
        document.getElementById('client-betting-area').classList.remove('hidden');
        document.getElementById('client-waiting-area').classList.add('hidden');
        document.getElementById('client-result-area').classList.add('hidden');
        document.getElementById('btn-submit-bet').disabled = true;

        // Slider setup
        const slider = document.getElementById('wager-slider');
        const numInput = document.getElementById('wager-amount');
        slider.max = myBankroll; numInput.max = myBankroll;
        const defBet = Math.max(10, Math.floor(myBankroll * 0.1));
        slider.value = defBet; numInput.value = defBet;
        slider.oninput = () => numInput.value = slider.value;
        numInput.oninput = () => slider.value = Math.min(Math.max(10, numInput.value), myBankroll);

        document.getElementById('btn-bet-min').onclick = () => { slider.value = 10; numInput.value = 10; };
        document.getElementById('btn-bet-half').onclick = () => { const v = Math.floor(myBankroll / 2); slider.value = v; numInput.value = v; };
        document.getElementById('btn-bet-max').onclick = () => { slider.value = myBankroll; numInput.value = myBankroll; };

        // Option buttons
        const optDiv = document.getElementById('client-options');
        optDiv.innerHTML = '';
        msg.options.forEach(key => {
            const btn = document.createElement('button');
            btn.className = 'client-option-btn';
            const label = msg.optionTexts ? (key + ') ' + msg.optionTexts[key]) : ('Option ' + key);
            btn.innerText = label;
            btn.onclick = () => {
                document.querySelectorAll('.client-option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedOption = key;
                document.getElementById('btn-submit-bet').disabled = false;
            };
            optDiv.appendChild(btn);
        });

        document.getElementById('btn-submit-bet').onclick = submitBet;
    }
    else if (msg.type === 'BET_CONFIRMED') {
        // Already showing waiting area from submitBet()
    }
    else if (msg.type === 'RESULT') {
        document.getElementById('client-betting-area').classList.add('hidden');
        document.getElementById('client-waiting-area').classList.add('hidden');
        document.getElementById('client-result-area').classList.remove('hidden');

        myBankroll = msg.newBankroll;
        document.getElementById('client-bankroll-game').innerText = myBankroll;

        const title = document.getElementById('client-result-title');
        const detail = document.getElementById('client-result-detail');

        if (msg.result === 'WIN') {
            title.innerText = '🎉 CORRECT!';
            title.style.color = '#22c55e';
            detail.innerHTML = 'You won <span style="color:#22c55e;font-weight:900;">+$' + msg.change + '</span>!<br><span style="color:#94a3b8;font-size:0.9rem;">Answer: ' + msg.correctAnswer + ') ' + escHtml(msg.correctText) + '</span>';
            sounds.chime();
        } else if (msg.result === 'LOSE') {
            title.innerText = '❌ WRONG!';
            title.style.color = '#ef4444';
            detail.innerHTML = 'You lost <span style="color:#ef4444;font-weight:900;">-$' + msg.change + '</span><br><span style="color:#94a3b8;font-size:0.9rem;">Correct: ' + msg.correctAnswer + ') ' + escHtml(msg.correctText) + '</span>';
            sounds.buzz();
        } else {
            title.innerText = '⏱️ TOO SLOW!';
            title.style.color = '#ef4444';
            detail.innerHTML = 'No vote penalty: <span style="color:#ef4444;font-weight:900;">-$' + msg.change + '</span><br><span style="color:#94a3b8;font-size:0.9rem;">Correct: ' + msg.correctAnswer + ') ' + escHtml(msg.correctText) + '</span>';
            sounds.buzz();
        }
    }
    else if (msg.type === 'KICKED') {
        alert('You have been kicked by the host.');
        location.reload();
    }
}

function submitBet() {
    if (!selectedOption) return;
    let amount = parseInt(document.getElementById('wager-amount').value, 10);
    amount = Math.min(Math.max(10, amount), myBankroll);

    hostConn.send({ type: 'SUBMIT_BET', amount: amount, choice: selectedOption });

    document.getElementById('client-betting-area').classList.add('hidden');
    document.getElementById('client-waiting-area').classList.remove('hidden');
    document.getElementById('client-current-bet').innerText = amount;
    document.getElementById('client-current-choice').innerText = selectedOption;
    document.getElementById('client-status-game').innerText = 'Bet locked in!';
}
