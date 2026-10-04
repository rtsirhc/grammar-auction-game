// Simple Web Audio API Synthesizer for game sounds
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const playTone = (frequency, type, duration, vol=0.1) => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

const sounds = {
    muted: false,
    
    tick: () => {
        if (sounds.muted) return;
        playTone(800, 'sine', 0.1, 0.05);
    },
    
    buzz: () => {
        if (sounds.muted) return;
        playTone(150, 'sawtooth', 0.5, 0.1);
        setTimeout(() => playTone(140, 'sawtooth', 0.5, 0.1), 100);
    },
    
    chime: () => {
        if (sounds.muted) return;
        playTone(1200, 'sine', 0.2, 0.1);
        setTimeout(() => playTone(1600, 'sine', 0.4, 0.1), 150);
    },
    
    toggleMute: () => {
        sounds.muted = !sounds.muted;
        return sounds.muted;
    }
};
