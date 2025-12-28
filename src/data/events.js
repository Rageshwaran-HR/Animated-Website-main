const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const EVENTS = [
  {
    name: "Vibe Coding",
    slug: "vibe-coding",
    track: "Technical",
    short: "Open → Topic → Twist Finale",
    videoSrc: "/videos/feature-1n.mp4",
    details: {
      overview:
        "A fast-paced coding challenge where the problem evolves as you go. You start with an open prompt, then get a topic constraint, and finish with a twist round that changes the target.",
      prize: "2000",
      timings: ["08:00 AM – 10:00 AM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0101" }],
      format: [
        "Round 1: Open build — create a working baseline.",
        "Round 2: Topic lock — align with the revealed theme.",
        "Finale: Twist — adapt quickly to a new constraint or feature request.",
      ],
      rules: [
        "Bring your own laptop (and chargers).",
        "Internet usage depends on organizer announcement at the venue.",
        "Plagiarism or copying pre-built solutions may lead to disqualification.",
        "Judges’ decision is final.",
      ],
      judging: [
        "Correctness and completeness",
        "Creativity / vibe factor",
        "Code clarity and approach",
        "How well you handle the twist",
      ],
      registration:
        "Click Register to continue to the registration section and secure your slot.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Tech Marathon",
    slug: "tech-marathon",
    track: "Technical",
    short: "Coding From Hell → Glitch Verse",
    videoSrc: "/videos/feature-2n.mp4",
    details: {
      overview:
        "An endurance-style challenge with escalating difficulty. Expect unpredictable constraints and a final ‘glitch’ phase that tests debugging and resilience.",
      prize: "2000",
      timings: ["09:00 AM – 11:00 AM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0102" }],
      format: [
        "Stage 1: Warm-up problems",
        "Stage 2: Constraint mode (time/memory/limits)",
        "Final: Glitch verse (debug + optimize under pressure)",
      ],
      rules: [
        "Solve within allotted time windows for each stage.",
        "Use the allowed language set announced by organizers.",
        "Keep your solutions original during the event window.",
      ],
      judging: [
        "Problem score / test pass rate",
        "Speed (tie-breakers)",
        "Stability under constraints",
      ],
      registration:
        "Click Register to join the marathon and receive updates on the rule-set.",
      registerTo: "/#contact",
    },
  },
  {
    name: "It Takes Two",
    slug: "it-takes-two",
    track: "Technical",
    short: "2 Members · Alternate Levels",
    videoSrc: "/videos/feature-3.mp4",
    details: {
      overview:
        "A duo event where teamwork is the real mechanic. Members alternate responsibilities across mini-levels so both participants contribute meaningfully.",
      prize: "1000",
      timings: ["10:30 AM – 12:00 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0103" }],
      format: [
        "Teams of 2.",
        "Alternating levels: one member codes while the other plans/tests, then swap.",
      ],
      rules: [
        "Exactly 2 members per team.",
        "Both members must participate in alternating rounds.",
        "External collaboration outside the team isn’t allowed.",
      ],
      judging: [
        "Overall completion",
        "Team coordination",
        "Testing approach",
        "Edge-case handling",
      ],
      registration: "Click Register and mention your teammate at sign-up.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Hot Seat",
    slug: "hot-seat",
    track: "Technical",
    short: "Rapid MCQ Ladder",
    videoSrc: "/videos/feature-12n.mp4",
    details: {
      overview:
        "A rapid-fire MCQ ladder round that rewards clarity and composure. Questions span fundamentals, CS concepts, and practical dev knowledge.",
      prize: "1000",
      timings: ["11:00 AM – 12:00 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0104" }],
      format: [
        "Timed ladder — each correct answer advances you.",
        "Difficulty increases as you climb.",
      ],
      rules: [
        "No devices unless explicitly permitted.",
        "Answer within the time limit to score.",
      ],
      judging: [
        "Correct answers",
        "Speed (tie-breaker)",
      ],
      registration: "Click Register to reserve a seat for the ladder round.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Paper Presentation",
    slug: "paper-presentation",
    track: "Technical",
    short: "Research & Innovation",
    videoSrc: "/videos/feature-2.mp4",
    details: {
      overview:
        "Present your research or innovative project idea to a panel. Focus on problem clarity, novelty, and real-world impact.",
      prize: "2000",
      timings: ["12:00 PM – 01:30 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0105" }],
      format: [
        "Talk + Q&A session.",
        "Slides recommended.",
      ],
      rules: [
        "Submit topic/title as per organizer instructions.",
        "Avoid copyrighted material you don’t own rights to.",
      ],
      judging: [
        "Novelty",
        "Technical depth",
        "Clarity of communication",
        "Q&A handling",
      ],
      registration:
        "Click Register to submit your title/topic and confirm your slot.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Build in 60",
    slug: "build-in-60",
    track: "Technical",
    short: "UI/UX + Website Sprint",
    videoSrc: "/videos/feature-10n.mp4",
    details: {
      overview:
        "A 60-minute sprint to design and ship a clean UI. Balance visuals and usability — build something that feels like a product.",
      prize: "2000",
      timings: ["60 minutes (Sprint)", "Theme/brief announced at start"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0106" }],
      format: [
        "Time-boxed sprint (60 minutes).",
        "Theme/brief announced at start.",
      ],
      rules: [
        "Ship a runnable deliverable within the time limit.",
        "Use frameworks/tools as allowed by organizers.",
      ],
      judging: [
        "Design clarity",
        "Responsiveness",
        "Usability",
        "Completeness",
      ],
      registration: "Click Register to join the sprint and get the brief.",
      registerTo: "/#contact",
    },
  },

  {
    name: "Bid War",
    slug: "bid-war",
    track: "Non-Tech",
    short: "IPL Style Auction",
    videoSrc: "/videos/feature-7n.mp4",
    details: {
      overview:
        "A strategy and quick-thinking auction event with an IPL-style twist. Build the best squad/stack within your budget.",
      prize: "1000",
      timings: ["08:30 AM – 10:00 AM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0107" }],
      format: [
        "Budget-based bidding rounds.",
        "Point system based on your final picks.",
      ],
      rules: [
        "Stick to the allocated budget.",
        "No collusion between teams.",
      ],
      judging: [
        "Final score",
        "Budget efficiency",
      ],
      registration: "Click Register to join the auction lobby.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Connect Tone",
    slug: "connect-tone",
    track: "Non-Tech",
    short: "Connection → Sonic Sense",
    videoSrc: "/videos/feature-13n.mp4",
    details: {
      overview:
        "A fun, gamified connection challenge where patterns and ‘tone’ are everything. Connect clues and react to audio/visual prompts.",
      prize: "2000",
      timings: ["10:00 AM – 11:30 AM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0108" }],
      format: [
        "Connection round (link the clues).",
        "Sonic sense round (identify/react quickly).",
      ],
      rules: [
        "Follow the facilitator’s instructions for each mini-round.",
        "No external help/devices unless allowed.",
      ],
      judging: [
        "Accuracy",
        "Speed",
      ],
      registration: "Click Register to enter the connect-tone arena.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Meme Creation",
    slug: "meme-creation",
    track: "Non-Tech",
    short: "Creativity Challenge",
    videoSrc: "/videos/feature-11n.mp4",
    details: {
      overview:
        "Create memes based on prompts — the goal is humor + relevance + originality. Keep it clean, clever, and on-theme.",
      prize: "1000",
      timings: ["12:30 PM – 01:30 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0109" }],
      format: [
        "Prompt reveal.",
        "Creation window.",
        "Showcase + scoring.",
      ],
      rules: [
        "Original creations only.",
        "No hateful, explicit, or harassing content.",
      ],
      judging: [
        "Originality",
        "Prompt relevance",
        "Presentation",
      ],
      registration: "Click Register to get the meme prompt pack.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Switch Saga",
    slug: "switch-saga",
    track: "Non-Tech",
    short: "Positive ↔ Negative Switch",
    videoSrc: "/videos/feature-14n.mp4",
    details: {
      overview:
        "A playful challenge where the rules flip mid-game. Adapt your responses when the polarity switches — positive becomes negative and vice versa.",
      prize: "1000",
      timings: ["01:00 PM – 02:00 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0110" }],
      format: [
        "Standard round.",
        "Switch round (rule flip).",
      ],
      rules: [
        "Listen carefully — the switch is part of the game.",
        "Follow facilitator instructions.",
      ],
      judging: [
        "Correctness under the switch",
        "Consistency",
      ],
      registration: "Click Register to join the switch saga.",
      registerTo: "/#contact",
    },
  },
  {
    name: "Game Tournament",
    slug: "game-tournament",
    track: "Non-Tech",
    short: "Competitive Gaming",
    videoSrc: "/videos/feature-9n.mp4",
    details: {
      overview:
        "A competitive gaming bracket. Show up ready, respect the rules, and aim for the top of the leaderboard.",
      prize: "2000",
      timings: ["01:30 PM – 02:45 PM"],
      contacts: [{ role: "Coordinator", name: "Event Desk", phone: "555-0111" }],
      format: [
        "Bracket or points league (based on participation).",
        "Knockouts / finals.",
      ],
      rules: [
        "No cheating, exploits, or unfair advantages.",
        "Follow the match schedule.",
      ],
      judging: [
        "Match wins",
        "Tie-breakers per organizer rules",
      ],
      registration: "Click Register to enter the tournament bracket.",
      registerTo: "/#contact",
    },
  },
].map((event) => ({ ...event, slug: event.slug || slugify(event.name) }));

export const getEventBySlug = (slug) =>
  EVENTS.find((event) => event.slug === slug);
