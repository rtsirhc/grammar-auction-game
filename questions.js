const QUESTIONS = [
    {
        "id": 1,
        "topic": "Study Method Trap",
        "question": "Studying intensively for hours immediately before an exam, without long-term retention, is known as:",
        "options": {
            "A": "rote learning",
            "B": "cramming",
            "C": "drafting",
            "D": "mapping"
        },
        "correct": "B"
    },
    {
        "id": 2,
        "topic": "Memory Trick Spelling",
        "question": "Which option is the correctly spelled term for a formula or technique that aids memory?",
        "options": {
            "A": "nemonics",
            "B": "mnemonics",
            "C": "mnomonics",
            "D": "pnemonic"
        },
        "correct": "B"
    },
    {
        "id": 3,
        "topic": "Academic Writing Definition",
        "question": "A long essay involving personal research submitted as part of a university degree is a:",
        "options": {
            "A": "portfolio",
            "B": "dissertation",
            "C": "draft",
            "D": "assignment"
        },
        "correct": "B"
    },
    {
        "id": 4,
        "topic": "Double Consonant Trap",
        "question": "TRUE or FALSE: The noun form of the verb *assess* is spelled **assesment**.",
        "options": {
            "A": "TRUE",
            "B": "FALSE"
        },
        "correct": "B"
    },
    {
        "id": 5,
        "topic": "Idiomatic Expression Trap",
        "question": "\"Before finals week, I had to __________ my books and ignore my social life.\"",
        "options": {
            "A": "bury myself in",
            "B": "hide myself under",
            "C": "drown myself with",
            "D": "lock myself among"
        },
        "correct": "A"
    },
    {
        "id": 6,
        "topic": "Citation Terminology",
        "question": "When you give formal credit to an author whose work you used in your essay, you __________ their contribution.",
        "options": {
            "A": "plagiarise",
            "B": "acknowledge",
            "C": "submit",
            "D": "assess"
        },
        "correct": "B"
    },
    {
        "id": 7,
        "topic": "Academic Resource Trap",
        "question": "To borrow a book from a different university library system, you request an:",
        "options": {
            "A": "open educational resource",
            "B": "academic journal",
            "C": "inter-library loan",
            "D": "online database"
        },
        "correct": "C"
    },
    {
        "id": 8,
        "topic": "Rote Learning Definition",
        "question": "Learning something \"by rote\" means:",
        "options": {
            "A": "understanding the deep logical concepts behind a subject",
            "B": "memorizing facts by repetition without necessarily understanding them",
            "C": "creating visual mind maps to connect ideas",
            "D": "carrying out field research with a team"
        },
        "correct": "B"
    },
    {
        "id": 9,
        "topic": "Collocation Trap",
        "question": "\"She studied the manual for weeks, so she knows the entire protocol __________.\"",
        "options": {
            "A": "from top to down",
            "B": "inside out",
            "C": "back to front",
            "D": "side to side"
        },
        "correct": "B"
    },
    {
        "id": 10,
        "topic": "Academic Misconduct",
        "question": "Passing off someone else's academic research as your own without citation is called:",
        "options": {
            "A": "plagiarism",
            "B": "feedback",
            "C": "submission",
            "D": "dissertation"
        },
        "correct": "A"
    },
    {
        "id": 11,
        "topic": "Writing Process Sequence",
        "question": "Before submitting your **final draft**, you must complete the rough text, which is known as the:",
        "options": {
            "A": "write up",
            "B": "first draft",
            "C": "paper",
            "D": "composition"
        },
        "correct": "B"
    },
    {
        "id": 12,
        "topic": "Student Status Trap",
        "question": "A student who leaves university before completing their degree is said to:",
        "options": {
            "A": "write up",
            "B": "drop out",
            "C": "cram",
            "D": "submit"
        },
        "correct": "B"
    },
    {
        "id": 13,
        "topic": "False Friend School System",
        "question": "A state school in the UK that accepts all pupils regardless of academic ability is a __________ school.",
        "options": {
            "A": "selective",
            "B": "comprehensive",
            "C": "sympathetic",
            "D": "elective"
        },
        "correct": "B"
    },
    {
        "id": 14,
        "topic": "Direct Translation Trap",
        "question": "Wealthier individuals who hold financial advantages are often described as:",
        "options": {
            "A": "well-off",
            "B": "good-funded",
            "C": "high-moneyed",
            "D": "rich-born"
        },
        "correct": "A"
    },
    {
        "id": 15,
        "topic": "Vocabulary Meaning Trap",
        "question": "Which verb means \"to cause a bad situation or inequality to continue indefinitely\"?",
        "options": {
            "A": "perceive",
            "B": "perpetuate",
            "C": "bursary",
            "D": "tuition"
        },
        "correct": "B"
    },
    {
        "id": 16,
        "topic": "Educational Inequality",
        "question": "When a country has two unequal standards of education\u2014one for the wealthy and one for the poor\u2014it has a:",
        "options": {
            "A": "two-tier system",
            "B": "league table",
            "C": "core curriculum",
            "D": "continuing education"
        },
        "correct": "A"
    },
    {
        "id": 17,
        "topic": "Financial Aid Distinction",
        "question": "Money awarded to a university student based on **financial need** (rather than academic merit) is typically called a:",
        "options": {
            "A": "bursary",
            "B": "league table",
            "C": "tuition",
            "D": "scholarship"
        },
        "correct": "A"
    },
    {
        "id": 18,
        "topic": "Collocation Trap",
        "question": "Published rankings that compare schools or universities based on exam results are called:",
        "options": {
            "A": "opportunity gaps",
            "B": "league tables",
            "C": "bursary lists",
            "D": "tier metrics"
        },
        "correct": "B"
    },
    {
        "id": 19,
        "topic": "Adult Education Terminology",
        "question": "Adults who enter university several years after leaving school are referred to as:",
        "options": {
            "A": "continuing students",
            "B": "mature students",
            "C": "special needs students",
            "D": "selective students"
        },
        "correct": "B"
    },
    {
        "id": 20,
        "topic": "Spelling Trap",
        "question": "Which is the correct spelling for the set of subjects taught at a school?",
        "options": {
            "A": "curiculum",
            "B": "curriculum",
            "C": "curricullum",
            "D": "curicullum"
        },
        "correct": "B"
    },
    {
        "id": 21,
        "topic": "Concept Matching",
        "question": "The principle that everyone should have an equal chance to succeed, regardless of background, is:",
        "options": {
            "A": "equality of opportunity",
            "B": "inherent elitism",
            "C": "opportunity gap",
            "D": "selective entry"
        },
        "correct": "A"
    },
    {
        "id": 22,
        "topic": "Vocabulary Meaning Trap",
        "question": "If a problem is an essential and permanent part of a system's structure, it is:",
        "options": {
            "A": "inherent",
            "B": "deprived",
            "C": "perceived",
            "D": "comprehensive"
        },
        "correct": "A"
    },
    {
        "id": 23,
        "topic": "Spanish Translation Trap",
        "question": "In English, the document accompanying a resume that explains your interest in a job is a **cover letter** or a __________ letter.",
        "options": {
            "A": "presentation",
            "B": "covering",
            "C": "introduction",
            "D": "application"
        },
        "correct": "B"
    },
    {
        "id": 24,
        "topic": "Work Environment Adjective",
        "question": "A dynamic office where tasks change quickly and decisions must be made rapidly is described as:",
        "options": {
            "A": "fast-paced",
            "B": "customer-facing",
            "C": "hands-on",
            "D": "managerial"
        },
        "correct": "A"
    },
    {
        "id": 25,
        "topic": "Direct Experience Collocation",
        "question": "Practical, real-world experience gained through direct action rather than theory is called __________ experience.",
        "options": {
            "A": "customer-facing",
            "B": "hands-on",
            "C": "fast-paced",
            "D": "competitive"
        },
        "correct": "B"
    },
    {
        "id": 26,
        "topic": "Organizational Hierarchy",
        "question": "\"In my new position, I am directly __________ the Regional Director.\"",
        "options": {
            "A": "reporting to",
            "B": "standing out",
            "C": "tracking to",
            "D": "qualifying for"
        },
        "correct": "A"
    },
    {
        "id": 27,
        "topic": "Spanglish False Friend Trap",
        "question": "\"This company offers excellent salary growth and strong career __________.\"",
        "options": {
            "A": "expectatives",
            "B": "prospects",
            "C": "expectations",
            "D": "visions"
        },
        "correct": "B"
    },
    {
        "id": 28,
        "topic": "Employee Benefits Vocabulary",
        "question": "When an employer pays part of the cost of something (like public transport or meals), that benefit is:",
        "options": {
            "A": "subsidised",
            "B": "competitive",
            "C": "managerial",
            "D": "qualified"
        },
        "correct": "A"
    },
    {
        "id": 29,
        "topic": "Idiomatic Verb",
        "question": "To be distinct and visibly better than all other job applicants means to:",
        "options": {
            "A": "stand out",
            "B": "report to",
            "C": "track record",
            "D": "fast-pace"
        },
        "correct": "A"
    },
    {
        "id": 30,
        "topic": "Resume Vocabulary",
        "question": "A candidate's past history of professional achievements and work performance is their:",
        "options": {
            "A": "referee list",
            "B": "track record",
            "C": "cover letter",
            "D": "benefits package"
        },
        "correct": "B"
    },
    {
        "id": 31,
        "topic": "Collocation Match",
        "question": "Positions that involve direct, daily interaction with clients or consumers are described as:",
        "options": {
            "A": "customer-facing",
            "B": "team-playing",
            "C": "hands-on",
            "D": "managerial"
        },
        "correct": "A"
    },
    {
        "id": 32,
        "topic": "Professional Reference Trap",
        "question": "A former supervisor who writes a letter recommending you for a job is a:",
        "options": {
            "A": "referee",
            "B": "colleague",
            "C": "candidate",
            "D": "line manager"
        },
        "correct": "A"
    },
    {
        "id": 33,
        "topic": "Interview Selection Process",
        "question": "When an employer selects the top 5 applicants from 100 submissions, those 5 applicants have been:",
        "options": {
            "A": "shortlisted",
            "B": "trialed",
            "C": "boosted",
            "D": "outlined"
        },
        "correct": "A"
    },
    {
        "id": 34,
        "topic": "Practice Run Terminology",
        "question": "A practice presentation carried out before the actual high-stakes client meeting is a:",
        "options": {
            "A": "trial run",
            "B": "panel run",
            "C": "notice period",
            "D": "reporting structure"
        },
        "correct": "A"
    },
    {
        "id": 35,
        "topic": "Group Interview Vocabulary",
        "question": "An interview conducted by a group of executives questioning a single candidate is a __________ interview.",
        "options": {
            "A": "panel",
            "B": "structure",
            "C": "trainee",
            "D": "line"
        },
        "correct": "A"
    },
    {
        "id": 36,
        "topic": "Supervisor Collocation Trap",
        "question": "The corporate term for your immediate, direct supervisor in an office is your:",
        "options": {
            "A": "line manager",
            "B": "panel leader",
            "C": "opposite number",
            "D": "senior peer"
        },
        "correct": "A"
    },
    {
        "id": 37,
        "topic": "Phrasal Verb Preposition Trap",
        "question": "\"Could you please **talk us** __________ your relevant experience at your previous firm?\"",
        "options": {
            "A": "through",
            "B": "over",
            "C": "about",
            "D": "along"
        },
        "correct": "A"
    },
    {
        "id": 38,
        "topic": "Non-Verbal Communication",
        "question": "Posture, eye contact, and hand gestures during an interview are known as:",
        "options": {
            "A": "body language",
            "B": "reporting structure",
            "C": "professional development",
            "D": "criteria"
        },
        "correct": "A"
    },
    {
        "id": 39,
        "topic": "In-House Training Definition",
        "question": "Training provided directly inside the employer's company rather than by an external firm is:",
        "options": {
            "A": "in-house",
            "B": "shortlisted",
            "C": "outsourced",
            "D": "trial"
        },
        "correct": "A"
    },
    {
        "id": 40,
        "topic": "Resignation Contract Trap",
        "question": "The mandatory time an employee must continue working after submitting their resignation is their:",
        "options": {
            "A": "notice period",
            "B": "paid leave",
            "C": "reporting structure",
            "D": "trial run"
        },
        "correct": "A"
    },
    {
        "id": 41,
        "topic": "Phrasal Verb Meaning",
        "question": "To agree to accept new responsibilities or hire additional staff at work is to __________ them.",
        "options": {
            "A": "take on",
            "B": "speak up",
            "C": "boost up",
            "D": "fill up"
        },
        "correct": "A"
    },
    {
        "id": 42,
        "topic": "Verb Meaning Trap",
        "question": "\"The CEO began the meeting by __________ the key financial goals for the quarter.\"",
        "options": {
            "A": "outlining",
            "B": "shortlisting",
            "C": "recruiting",
            "D": "paneling"
        },
        "correct": "A"
    },
    {
        "id": 43,
        "topic": "Role Equivalent Vocabulary",
        "question": "Your counterpart who holds the exact same position as you in a different branch or company is your:",
        "options": {
            "A": "opposite number",
            "B": "workmate",
            "C": "line manager",
            "D": "teleworker"
        },
        "correct": "A"
    },
    {
        "id": 44,
        "topic": "False Friend Collocation Trap",
        "question": "A positive professional connection between co-workers built on trust and communication is a good:",
        "options": {
            "A": "working relationship",
            "B": "laboral relationship",
            "C": "job relationship",
            "D": "workmate relationship"
        },
        "correct": "A"
    },
    {
        "id": 45,
        "topic": "Informal Workplace Terminology",
        "question": "Discussing work topics during a social event or outside office hours is referred to as:",
        "options": {
            "A": "talking shop",
            "B": "hot-desking",
            "C": "knocking off",
            "D": "job-sharing"
        },
        "correct": "A"
    },
    {
        "id": 46,
        "topic": "Organizational Power Structure",
        "question": "An informal social rank within an organization that dictates who has the most authority is the:",
        "options": {
            "A": "pecking order",
            "B": "flexitime system",
            "C": "reporting structure",
            "D": "shift system"
        },
        "correct": "A"
    },
    {
        "id": 47,
        "topic": "Working Arrangement Definition",
        "question": "An arrangement where two employees split the responsibilities and hours of one full-time job is a:",
        "options": {
            "A": "job-share",
            "B": "flexitime",
            "C": "hot-desk",
            "D": "partnership"
        },
        "correct": "A"
    },
    {
        "id": 48,
        "topic": "Time Tracking Idiom",
        "question": "Using an electronic badge or card to log your official arrival and departure times at work is:",
        "options": {
            "A": "clocking in / clocking out",
            "B": "knocking off",
            "C": "hot-desking",
            "D": "taking initiative"
        },
        "correct": "A"
    },
    {
        "id": 49,
        "topic": "Routine Idiom Trap",
        "question": "Feeling trapped in a boring job routine with no prospect of change or novelty is being:",
        "options": {
            "A": "stuck in a rut",
            "B": "stuck behind a desk",
            "C": "knocked off",
            "D": "dead-ended"
        },
        "correct": "A"
    },
    {
        "id": 50,
        "topic": "Workload Adjective",
        "question": "Work that is so dull, repetitive, and uninteresting that it makes you feel mentally exhausted is:",
        "options": {
            "A": "mind-numbing",
            "B": "stimulating",
            "C": "proactive",
            "D": "freelance"
        },
        "correct": "A"
    },
    {
        "id": 51,
        "topic": "Shift Schedule Adjective",
        "question": "Work hours that take place late at night or on weekends, disrupting family life, are described as:",
        "options": {
            "A": "antisocial",
            "B": "hierarchical",
            "C": "mechanical",
            "D": "monotonous"
        },
        "correct": "A"
    },
    {
        "id": 52,
        "topic": "Office Layout Terminology",
        "question": "A flexible office arrangement where workers do not have fixed desks and sit at any free station is:",
        "options": {
            "A": "hot-desking",
            "B": "job-sharing",
            "C": "teleworking",
            "D": "freelancing"
        },
        "correct": "A"
    },
    {
        "id": 53,
        "topic": "Operational Efficiency Verb",
        "question": "To simplify a complex business process to eliminate waste and speed up production is to:",
        "options": {
            "A": "streamline",
            "B": "prioritize",
            "C": "outsource",
            "D": "mandate"
        },
        "correct": "A"
    },
    {
        "id": 54,
        "topic": "Process Delay Vocabulary",
        "question": "A delay at one specific point in an operational system that slows down the entire workflow is a:",
        "options": {
            "A": "bottleneck",
            "B": "task force",
            "C": "supply chain",
            "D": "throughput"
        },
        "correct": "A"
    },
    {
        "id": 55,
        "topic": "Temporary Group Terminology",
        "question": "A specialized group assembled temporarily to solve a specific corporate crisis or task is a:",
        "options": {
            "A": "task force",
            "B": "supply chain",
            "C": "quality control",
            "D": "core business"
        },
        "correct": "A"
    },
    {
        "id": 56,
        "topic": "Management Responsibility",
        "question": "The failure to supervise a project properly due to a lack of attention is a failure of:",
        "options": {
            "A": "oversight",
            "B": "procurement",
            "C": "allocation",
            "D": "mandate"
        },
        "correct": "A"
    },
    {
        "id": 57,
        "topic": "Business Operations Definition",
        "question": "Contracting an external supplier to handle operational tasks instead of doing them in-house is:",
        "options": {
            "A": "outsourcing",
            "B": "procuring",
            "C": "streamlining",
            "D": "executing"
        },
        "correct": "A"
    },
    {
        "id": 58,
        "topic": "Supply Management Terminology",
        "question": "The entire network of entities, individuals, and activities involved in creating and delivering a product is the:",
        "options": {
            "A": "supply chain",
            "B": "action plan",
            "C": "task force",
            "D": "inventory"
        },
        "correct": "A"
    },
    {
        "id": 59,
        "topic": "Corporate Procurement",
        "question": "The formal corporate process of purchasing goods, raw materials, or services for an organization is:",
        "options": {
            "A": "procurement",
            "B": "throughput",
            "C": "oversight",
            "D": "allocation"
        },
        "correct": "A"
    },
    {
        "id": 60,
        "topic": "Operational Rate Metric",
        "question": "The total amount of work or material that a system processes over a specific period is its:",
        "options": {
            "A": "throughput",
            "B": "inventory",
            "C": "workflow",
            "D": "bottleneck"
        },
        "correct": "A"
    }
];