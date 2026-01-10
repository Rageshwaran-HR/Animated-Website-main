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
          duration: "30–45 mins + 2 min demo",
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
          duration: "30–45 mins + demo + Q&A",
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
        { role: "Student Coordinator", name: "Yokeshkumar N", phone: "8056264811" },
        { role: "Student Coordinator", name: "Jagan S", phone: "9344561541" },
        { role: "Student Coordinator", name: "Vaaheesan S", phone: "9499941994" },
        { role: "Student Coordinator", name: "Lakshmikanthan", phone: "9344647710" },
        { role: "Student Coordinator", name: "Sujhan S", phone: "" },
        { role: "Student Coordinator", name: "Nikhil S", phone: "" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
        { role: "Student Coordinator", name: "Event Desk", phone: "555-0102" },
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
      contacts: [
        { role: "Student Coordinator", name: "Kamil Haasan", phone: "7448447272" },
        { role: "Student Coordinator", name: "Mohammed Mustaq Mubeen", phone: "9344534434" },
      ],
      registration:
        "Click Register to join the marathon and receive updates on the rule-set.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
        { role: "Student Coordinator", name: "Praveen Ram", phone: "9150290204" },
        { role: "Student Coordinator", name: "Shyam Evin Raj", phone: "6385118647" },
        { role: "Student Coordinator", name: "Gladis Keziah", phone: "8270089542" },
        { role: "Student Coordinator", name: "Canosa R Krucy", phone: "9345705837" },
        { role: "Student Coordinator", name: "Tarakeshwaran", phone: "8870982120" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
        "In this high-energy Hot Seat challenge, teams race through rapid-fire quiz rounds before the sharpest minds make it to the final spotlight. The finale channels the intensity of a Millionaire-style hot seat, where every answer is a heartbeat, every lifeline is a gamble, and every choice can flip the game. It’s fast, it’s fierce, and it pushes players to balance knowledge, speed, and guts under pressure—turning the entire event into a thrilling showdown of brainpower.",
      rounds: [
        { name: "Elite 5",
          objective:"All teams face fifteen timed questions. Accuracy + speed decide the top five teams. No lifelines. Pure adrenaline.",
          duration: "20 mins" },
        { name: "Fastest Finger First", 
          objective: "The qualified teams tackle tougher questions. All five teams advance, but their speed and score determine the order in which they enter the finale. Still no lifelines—just grit and quick thinking.",
          duration: "20 mins" },
        { name: "Hot Seat Finale", 
          objective: "nspired by the iconic Millionaire format, teams take the hotseat one by one. With three lifelines—50:50, Phone-a-Friend, and Pass—they must climb the levels without slipping. One wrong answer knocks them down and out. Smart strategy and calm under pressure decide who claims the crown.",
          duration: "20 mins" },
      ],
      judging: ["Any form of copying, collusion, or unfair collaboration with other teams.", "Using any unauthorized external help or communication", "Exceeding time limits or violating event rules", "Manipulating scoring, submissions, or the judging system"],
      contacts: [
        { role: "Student Coordinator", name: "Naveen Kumar S", phone: "6381574955" },
        { role: "Student Coordinator", name: "Tarunikaa B", phone: "9840918520" },
        { role: "Student Coordinator", name: "Akaash Srinivasan", phone: "7305488743" },
        { role: "Student Coordinator", name: "Abinand P", phone: "9445920529" },
        { role: "Student Coordinator", name: "Sharon Jessica S", phone: "7418777315" },
        { role: "Student Coordinator", name: "Shree Ranjani B", phone: "7305491657" },
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
          duration: "8 mins presentation + 2 mins Q&A",
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
          role: "Student Coordinator",
          name: "Ashwin Nandagopal",
          phone: "6378914082",
        },
        { role: "Student Coordinator", name: "Shyleja S", phone: "9841025250" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/h6qmDc3cQtH8nMmT6",
    },
  },
  {
    name: "Build in 60 Minutes",
    slug: "build-in-60",
    track: "Technical",
    short: "UI/UX + Website Sprint",
    videoSrc:
      "https://res.cloudinary.com/domxvnuqp/video/upload/v1767445097/feature-10n_indhwt.mp4",
    details: {
      overview:
        "A 60-minute sprint to design and ship a clean UI. Balance visuals and usability — build something that feels like a product.",
      timings: ["09:00 AM – 10:00 AM"],
      contacts: [
        { role: "Student Coordinator", name: "Event Desk", phone: "555-0106" },
      ],
      format: [
        "Time-boxed sprint (60 minutes).",
        "Theme/brief announced at start.",
      ],
      rules: [
        " Participants must use their own laptops; college systems are not permitted",
  "Internet access is disabled by default throughout the event",
  "A one-time internet access window of 5 minutes will be provided during the event",
  "Internet usage during this window is strictly limited to syntax and official documentation reference",
  "Accessing tutorials, blogs, GitHub repositories, or solution-related content is prohibited",
  "Any misuse of internet access will result in immediate disqualification",
  "All required tools, including Visual Studio Code (VS Code), must be pre-installed",
  "Judges' decisions are final"
      ],
      judging: [
        "Design clarity",
        "Responsiveness",
        "Usability",
        "Completeness",
      ],
      contacts: [
        { role: "Student Coordinator", name: "Shyam Evin Raj", phone: "6385118647" },
        { role: "Student Coordinator", name: "Canosa Krucy", phone: "9345705837" },
      ],
      registration: "Click Register to join the sprint and get the brief.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
        { role: "Student Coordinator", name: "Suriya RS", phone: "8870256728" },
        { role: "Student Coordinator", name: "Surendran S", phone: "6374402965" },
      ],
      format: [
        "Budget-based bidding rounds.",
        "Point system based on your final picks.",
      ],
      rules: ["Stick to the allocated budget.", "No collusion between teams."],
      judging: ["Final score", "Budget efficiency"],
      registration: "Click Register to join the auction lobby.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
        { role: "Student Coordinator", name: "Event Desk", phone: "555-0108" },
      ],
      format: [
        "Connection round (link the clues).",
        "Sonic sense round (identify/react quickly).",
      ],
      rules: [
        "Follow the facilitator’s instructions for each mini-round.",
        "No external help/devices unless allowed.",
      ],
      contacts: [
        { role: "Student Coordinator", name: "Sanjay", phone: "8925209953" },
        { role: "Student Coordinator", name: "Kamaliga T", phone: "9342857096" },
      ],
      judging: ["Accuracy", "Speed"],
      registration: "Click Register to enter the connect-tone arena.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
          role: "Student Coordinator",
          name: "Pranesh S",
          email: "praneshjd2004@gmail.com",
        },
        {
          role: "Student Coordinator",
          name: "T.S. Nidhelaaa",
          email: "nidhelaavec@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
          role: "Student Coordinator",
          name: "Cindrella",
          email: "cindrella22cse@gmail.com",
        },
        {
          role: "Student Coordinator",
          name: "Mahalakshmi",
          email: "mahalakshmi02cse@gmail.com",
        },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
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
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
    },
  },
  {
    name: "Project Expo",
    slug: "project-expo",
    track: "Featured",
    short: "Showcase your innovative projects",
    videoSrc:
      "https://res.cloudinary.com/dbe1m52oz/video/upload/v1767781724/Make_a_animated_1080p_202601071550_anqson.mp4",
    details: {
      date: "21-02-2026",
      time: "9:30 AM – 3:00 PM",
      teamSize: "1–4",
      overview:
        "Project Expo serves as a platform for students to present their innovative hardware and software projects, developed through academic coursework, self-directed learning, or independent exploration. Participants present their ideas through PPT presentations, live demonstrations, prototypes, or models, focusing on problem-solving ability, technical understanding, and real-world applicability.",
      rounds: [
        {
          name: "Project Showcase",
          duration: "20 mins demo",
          objective: "Display your innovative project",
          judging: [
            "Relevance in real world",
            "Presentation Skills ",
            "Technical Depth & Implementation",
            "Innovation and Creativity",
            "System Design / Architecture",
            "Practical Impact and Feasibility"
          ],
        },
      ],
      rules: [
        "Presentation time: 8-10 minutes",
        "PPT is mandatory",
        "Plagiarism is strictly prohibited",
        "Judges’ decision is final",
        "One project per team",
        "Projects must be original and developed by the participants",
        "Any technology stack, programming language, or hardware platform may be used.",
        "Both completed and partially implemented projects are allowed.",
      ],
      contacts: [
        { role: "Student Coordinator", name: "Merlyne Margarate Christinal D", phone: "9840952078" },
        { role: "Student Coordinator", name: "Chandn S", phone: "9360468653" },
      ],
      registration: "Click Register to showcase your project.",
      registerTo: "https://forms.gle/fyYLNKJ3VRF28Ub19",
    },
  },
  {
    name: "Workshop",
    slug: "workshop",
    track: "Featured",
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
        {
          role: "Instructor",
          name: "Workshop Lead",
          phone: "Contact organizers",
        },
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
