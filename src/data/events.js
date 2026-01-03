const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const withCloudinaryAuto = (src) => {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/")) return src;
  if (src.includes("/video/upload/q_auto,f_auto/")) return src;
  return src.replace("/video/upload/", "/video/upload/q_auto,f_auto/");
};

export const EVENTS = [
  {
    name: "Vibe Coding",
    slug: "vibe-coding",
    track: "Technical",
    short: "Creativity-first rapid coding showdown",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445104/feature-1n_boxizj.mp4",
    details: {
      date: "21-02-2026",
      time: "9:30 AM – 4:00 PM",
      teamSize: "2–3",
      overview:
        "High-energy coding event focused on creativity, execution, and adaptability. Any tech stack allowed, AI-friendly, judged via live demos.",
      rounds: [
        {
          name: "Open Round",
          duration: "60–90 mins + 2 min demo",
          objective: "Build anything impressive",
          judging: [
            "Creativity (35)",
            "Innovation (25)",
            "Technical Execution (30)",
            "Demo Clarity (10)",
          ],
        },
        {
          name: "Topic Round",
          duration: "60–90 mins + demo + Q&A",
          objective: "Build under topic constraints",
          judging: [
            "Topic Fit (25)",
            "Functional MVP (30)",
            "Technical Execution (25)",
            "UX & Presentation (20)",
          ],
        },
        {
          name: "Twist Finale",
          duration: "30–45 mins + demo",
          objective: "Adapt & upgrade with surprise twist",
          judging: [
            "Twist Completion (40)",
            "Demo Stability (25)",
            "Quality of Improvement (20)",
            "Explanation (15)",
          ],
        },
      ],
      rules: [
        "No pre-done projects",
        "Live demo mandatory",
        "Mention real vs mocked features",
        "No plagiarism",
      ],
      contacts: [
        { role: "Coordinator", name: "Yokeskumar N", phone: "8056264811" },
        { role: "Coordinator", name: "Jagan S", phone: "9344561541" },
        { role: "Coordinator", name: "Lakshmikanthan C", phone: "9344647710" },
        { role: "Coordinator", name: "Vaaheesan S", phone: "9499941994" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Tech Marathon",
    slug: "tech-marathon",
    track: "Technical",
    short: "Coding From Hell → Glitch Verse",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445115/feature-2n_whzlao.mp4",
    details: {
      overview:
        "An endurance-style challenge with escalating difficulty. Expect unpredictable constraints and a final ‘glitch’ phase that tests debugging and resilience.",
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
    short: "Two-player code relay challenge",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445093/feature-3_jrqk1k.mp4",
    details: {
      date: "21-02-2026",
      time: "10:00 AM – 12:00 PM",
      teamSize: "2",
      overview:
        "A teamwork-based coding relay where coordination and speed decide the winner.",
      rounds: [
        {
          name: "Relay Challenge",
          objective: "Solve coding tasks collaboratively",
          judging: [
            "Accuracy",
            "Execution efficiency",
            "Team coordination",
            "Time taken",
          ],
        },
      ],
      rules: [
        "No pre-written code",
        "Internet limited to documentation",
        "Event structure revealed one day prior",
      ],
      contacts: [
        {
          role: "Coordinator",
          name: "Canosa R Krucy",
          email: "canosarkrucycse@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Gladis Keziah",
          email: "gladiskeziah@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Hot Seat",
    slug: "hot-seat",
    track: "Non-Tech",
    short: "High-pressure quiz showdown",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445107/feature-12n_wg4xyu.mp4",
    details: {
      date: "21-02-2026",
      time: "10:00 AM – 11:00 AM",
      teamSize: "1–2",
      overview:
        "Multi-round quiz event inspired by Who Wants to Be a Millionaire.",
      rounds: [
        { name: "Elite 5", duration: "20 mins" },
        { name: "Fastest Finger First", duration: "20 mins" },
        { name: "Hot Seat Finale", duration: "20 mins" },
      ],
      judging: [
        "Accuracy",
        "Speed",
        "Strategy",
        "Lifeline usage",
      ],
      contacts: [
        { role: "Coordinator", name: "Akaash Srinivasan", phone: "73054887743" },
        { role: "Coordinator", name: "Abinand P", phone: "9445920529" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Project Expo",
    slug: "project-expo",
    track: "Technical",
    short: "Innovation & real-world impact",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445104/feature-2_tbxum9.mp4",
    details: {
      date: "21-02-2026",
      teamSize: "1–4",
      overview:
        "Showcase innovative software or hardware projects with PPT and live demo.",
      rounds: [
        {
          name: "Presentation + Demo",
          duration: "8–10 mins + Q&A",
        },
      ],
      judging: [
        "Innovation",
        "Technical depth",
        "Practical impact",
        "Presentation skills",
      ],
      rules: [
        "PPT mandatory",
        "Original projects only",
        "Strict time limits",
      ],
      contacts: [
        {
          role: "Coordinator",
          name: "Merlyne Margarte Christinal D",
          email: "merlynemargartechristinalcse@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Chandn S",
          email: "chandnveccseb@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Build in 60",
    slug: "build-in-60",
    track: "Technical",
    short: "UI/UX + Website Sprint",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445097/feature-10n_indhwt.mp4",
    details: {
      overview:
        "A 60-minute sprint to design and ship a clean UI. Balance visuals and usability — build something that feels like a product.",
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
    videoSrc: "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445577/feature-7n_ee8jru.mp4",
    details: {
      overview:
        "A strategy and quick-thinking auction event with an IPL-style twist. Build the best squad/stack within your budget.",
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
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445101/feature-13n_fyshgw.mp4",
    details: {
      overview:
        "A fun, gamified connection challenge where patterns and ‘tone’ are everything. Connect clues and react to audio/visual prompts.",
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
    name: "Meme Relay",
    slug: "meme-relay",
    track: "Non-Tech",
    short: "Humor meets creativity",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445096/feature-11n_jjjgrl.mp4",
    details: {
      date: "21-02-2026",
      time: "Approx 2 Hours",
      teamSize: "1–2",
      overview:
        "Fast-paced meme creation event testing humor, relevance, and explanation skills.",
      rounds: [
        { name: "Meme Sense Check", duration: "20 mins" },
        { name: "Situation Meme", duration: "30 mins" },
        { name: "Meme Battle (Final)", duration: "30 mins" },
      ],
      rules: [
        "No offensive or political content",
        "Memes must be created during event",
        "Internet only for templates",
      ],
      judging: [
        "Relevance",
        "Humor & relatability",
        "Explanation quality",
      ],
      contacts: [
        { role: "Coordinator", name: "Pranesh S", email: "praneshjd2004@gmail.com" },
        { role: "Coordinator", name: "T.S. Nidhelaaa", email: "nidhelaavec@gmail.com" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Switch Saga",
    slug: "switch-saga",
    track: "Non-Tech",
    short: "Positive ↔ Negative Switch",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445107/feature-14n_ehmj6j.mp4",
    details: {
      date: "21-03-2026",
      time: "11:15 AM – 12:00 PM",
      teamSize: "2–4",
      overview:
        "Speaking event where teams instantly switch viewpoints on a topic.",
      rounds: [
        { name: "Basic Switch" },
        { name: "Switch with New Points" },
        { name: "Rapid Switch" },
      ],
      judging: [
        "Communication clarity",
        "Presence of mind",
        "Confidence & relevance",
      ],
      contacts: [
        { role: "Coordinator", name: "Cindrella", email: "cindrella22cse@gmail.com" },
        { role: "Coordinator", name: "Mahalakshmi", email: "mahalakshmi02cse@gmail.com" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "/#register",
    },
  },
  {
    name: "Game Tournament",
    slug: "game-tournament",
    track: "Non-Tech",
    short: "Competitive Gaming",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445097/feature-9n_mt6ajv.mp4",
    details: {
      overview:
        "A competitive gaming bracket. Show up ready, respect the rules, and aim for the top of the leaderboard.",
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
].map((event) => ({
  ...event,
  slug: event.slug || slugify(event.name),
  videoSrc: withCloudinaryAuto(event.videoSrc),
}));

export const getEventBySlug = (slug) =>
  EVENTS.find((event) => event.slug === slug);
