const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const withCloudinaryAuto = (src) => {
  if (!src || typeof src !== "string") return src;
  if (!src.includes("res.cloudinary.com") || !src.includes("/video/upload/"))
    return src;
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
      time: "10:30 AM – 12:00 PM",
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
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      timings: ["09:00 AM – 10:30 AM"],
      contacts: [
        { role: "Coordinator", name: "Event Desk", phone: "555-0102" },
      ],
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
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      time: "10:30 AM – 12:00 PM",
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
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
    },
  },
  {
    name: "Hot Seat",
    slug: "hot-seat",
    track: "Technical",
    short: "High-pressure quiz showdown",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445107/feature-12n_wg4xyu.mp4",
    details: {
      date: "21-02-2026",
      time: "10:30 AM – 12:00 PM",
      teamSize: "1–2",
      overview:
        "Multi-round quiz event inspired by Who Wants to Be a Millionaire.",
      rounds: [
        { name: "Elite 5", duration: "20 mins" },
        { name: "Fastest Finger First", duration: "20 mins" },
        { name: "Hot Seat Finale", duration: "20 mins" },
      ],
      judging: ["Accuracy", "Speed", "Strategy", "Lifeline usage"],
      contacts: [
        {
          role: "Coordinator",
          name: "Akaash Srinivasan",
          phone: "73054887743",
        },
        { role: "Coordinator", name: "Abinand P", phone: "9445920529" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
    },
  },
  {
    name: "Paper Presentation",
    slug: "paper-presentation",
    track: "Technical",
    short: "Innovation & originality in research ideas",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445104/feature-2_tbxum9.mp4",
    details: {
      date: "21-02-2026",
      teamSize: "1–3",
      overview:
        "A platform to showcase your ideas, innovation, and technical thinking. Present your paper, defend your concept, and impress the judges with clarity, creativity, and confidence.",
      rounds: [
        {
          name: "Presentation + Q&A",
          duration: "8–10 mins presentation + 2 mins Q&A",
        },
      ],
      judging: [
        "Innovation & originality",
        "Technical knowledge",
        "Presentation skills",
        "Clarity & confidence",
      ],
      rules: [
        "PPT format is mandatory",
        "Plagiarism is strictly prohibited",
        "Judges’ decision is final",
        "One paper per team",
      ],
      contacts: [
        {
          role: "Coordinator",
          name: "Shyleja S",
          email: "shyleja.s@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Ashwin Nandagopal",
          email: "ashwinnandacool@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Yesudoss S",
          email: "dossyesu54@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Anuvarshini V",
          email: "anuvarshiniv139@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Maheswari M",
          email: "maheswarimathi2004@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      timings: ["09:00 AM – 10:30 AM"],
      contacts: [
        { role: "Coordinator", name: "Event Desk", phone: "555-0106" },
      ],
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
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
    },
  },

  {
    name: "Bid War",
    slug: "bid-war",
    track: "Non-Tech",
    short: "IPL Style Auction",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445577/feature-7n_ee8jru.mp4",
    details: {
      overview:
        "A strategy and quick-thinking auction event with an IPL-style twist. Build the best squad/stack within your budget.",
      timings: ["01:00 PM – 02:00 PM"],
      contacts: [
        { role: "Coordinator", name: "Event Desk", phone: "555-0107" },
      ],
      format: [
        "Budget-based bidding rounds.",
        "Point system based on your final picks.",
      ],
      rules: ["Stick to the allocated budget.", "No collusion between teams."],
      judging: ["Final score", "Budget efficiency"],
      registration: "Click Register to join the auction lobby.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      timings: ["01:00 PM – 02:00 PM"],
      contacts: [
        { role: "Coordinator", name: "Event Desk", phone: "555-0108" },
      ],
      format: [
        "Connection round (link the clues).",
        "Sonic sense round (identify/react quickly).",
      ],
      rules: [
        "Follow the facilitator’s instructions for each mini-round.",
        "No external help/devices unless allowed.",
      ],
      judging: ["Accuracy", "Speed"],
      registration: "Click Register to enter the connect-tone arena.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      time: "2:00 PM – 3:00 PM",
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
      judging: ["Relevance", "Humor & relatability", "Explanation quality"],
      contacts: [
        {
          role: "Coordinator",
          name: "Pranesh S",
          email: "praneshjd2004@gmail.com",
        },
        {
          role: "Coordinator",
          name: "T.S. Nidhelaaa",
          email: "nidhelaavec@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
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
      time: "02:00 PM – 03:00 PM",
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
        {
          role: "Coordinator",
          name: "Cindrella",
          email: "cindrella22cse@gmail.com",
        },
        {
          role: "Coordinator",
          name: "Mahalakshmi",
          email: "mahalakshmi02cse@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
    },
  },
  {
    name: "Funtrix",
    slug: "funtrix",
    track: "Non-Tech",
    short: "Sports precision × combat intensity",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445097/feature-9n_mt6ajv.mp4",
    details: {
      date: "21-02-2026",
      time: "02:00 PM – 03:00 PM",
      teamSize: "Individual / Duo",
      overview:
        "Funtrix at OZMENTA ’26 is a high-octane competitive zone combining sports precision and combat intensity. Step in, compete, and prove your dominance in the digital arena.",
      rounds: [
        {
          name: "Open Qualifiers",
          duration: "Varies per match",
          objective: "Shortlist top contenders through knockout matches",
          judging: [
            "Match performance",
            "Basic strategy",
            "Rule adherence",
            "Fair play",
          ],
        },
        {
          name: "Semi-Finals",
          duration: "Varies per match",
          objective: "Test advanced gameplay under higher competitive pressure",
          judging: [
            "Advanced strategy",
            "Technical skill",
            "Consistency",
            "Discipline",
          ],
        },
        {
          name: "Championship Showdown",
          duration: "Final match",
          objective: "Compete for the Funtrix Ultimate Arena Champion title",
          judging: [
            "Overall dominance",
            "Decision making",
            "Composure under pressure",
            "Rule compliance",
          ],
        },
      ],
      rules: [
        "Matches will follow standardized game settings decided by the organizers",
        "Strictly no cheating, hacking, or unfair gameplay",
        "Participants must be present at the venue before match call-out",
        "Organizer’s decision is final and binding",
      ],
      contacts: [
        { role: "Support", name: "Event Desk", phone: "Will be announced" },
      ],
      registration:
        "Registration details will be shared through the official announcement link.",
      registerTo:
        "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
    },
  },
  {
    name: "Project Expo",
    slug: "project-expo",
    track: "Non-Tech",
    short: "Showcase your innovative projects",
    videoSrc:
      "https://res.cloudinary.com/dbe1m52oz/video/upload/v1767781724/Make_a_animated_1080p_202601071550_anqson.mp4",
    details: {
      date: "21-02-2026",
      time: "10:30 AM – 12:00 PM",
      teamSize: "2–3",
      overview:
        "Showcase your innovative projects in a creative exhibition. Present your work, demonstrate functionality, and inspire others with your innovative solutions.",
      rounds: [
        {
          name: "Project Showcase",
          duration: "60–90 mins + 2 min demo",
          objective: "Display your innovative project",
          judging: [
            "Innovation (35)",
            "Presentation (25)",
            "Functionality (30)",
            "Impact Clarity (10)",
          ],
        },
      ],
      rules: [
        "Projects must be original",
        "Live demo or interactive display required",
        "Clear documentation preferred",
        "No plagiarism",
      ],
      contacts: [
        { role: "Coordinator", name: "Project Team", phone: "Contact organizers" },
      ],
      registration: "Click Register to showcase your project.",
      registerTo: "/#register",
    },
  },
  {
    name: "Workshop",
    slug: "workshop",
    track: "Non-Tech",
    short: "Hands-on learning sessions",
    videoSrc:
      "https://res.cloudinary.com/dbe1m52oz/video/upload/v1767781652/something_baqfhk.mp4",
    details: {
      date: "21-02-2026",
      time: "09:00 AM – 10:30 AM",
      teamSize: "Individual",
      overview:
        "Interactive hands-on workshop designed for practical learning. Build skills through guided sessions and real-world applications.",
      rounds: [
        {
          name: "Hands-On Session",
          duration: "90 mins",
          objective: "Learn practical skills through interactive guidance",
          judging: [
            "Participation (30)",
            "Learning Outcome (30)",
            "Practical Application (25)",
            "Engagement (15)",
          ],
        },
      ],
      rules: [
        "Active participation required",
        "Follow facilitator guidance",
        "Bring required materials",
      ],
      contacts: [
        { role: "Instructor", name: "Workshop Lead", phone: "Contact organizers" },
      ],
      registration: "Click Register to join the workshop.",
      registerTo: "/#register",
    },
  },
].map((event) => ({
  ...event,
  slug: event.slug || slugify(event.name),
  videoSrc: withCloudinaryAuto(event.videoSrc),
}));

export const getEventBySlug = (slug) =>
  EVENTS.find((event) => event.slug === slug);
