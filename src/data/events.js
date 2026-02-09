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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794095/feature-1n_vau3sz.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
        "Laptop is mandatory",
        "No pre-done projects",
        "Live demo mandatory",
        "Mention real vs mocked features",
        "Any AI is allowed",
        "No copying from other teams",
      ],
      contacts: [
        {
          role: "Student Coordinator",
          name: "Yokeshkumar N",
          phone: "8056264811",
        },
        { role: "Student Coordinator", name: "Jagan S", phone: "9344561541" },
        {
          role: "Student Coordinator",
          name: "Vaaheesan S",
          phone: "9499941994",
        },
        {
          role: "Student Coordinator",
          name: "Lakshmikanthan",
          phone: "9344647710",
        },
        { role: "Student Coordinator", name: "Sujhan S" },
        { role: "Student Coordinator", name: "Nikhil S" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
    },
  },
  {
    name: "Tech Marathon",
    slug: "tech-marathon",
    track: "Technical",
    short: "Glitch Verse → Code From Hell → Deciphering",
    videoSrc:
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769793706/feature-2n_qugb2g.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "Individual",
      overview:
        "A high-intensity individual coding endurance challenge designed to test debugging skills, logical creativity, and algorithmic thinking. Participants face escalating difficulty across multiple stages under strict offline conditions, with a unique twist that rewards both precision and unconventional problem-solving.",
      rounds: [
        {
          name: "Stage 1: Glitch Verse",
          objective:
            "Identify and fix logical, runtime, and semantic bugs in pre-written programs within a limited time.",
          judging: [
            "Bug identification accuracy",
            "Correctness of fixes",
            "Successful execution against test cases",
          ],
        },
        {
          name: "Stage 2: Code From Hell",
          objective:
            "Solve extremely simple programming problems using intentionally inefficient, over-engineered, and non-optimal logic while still producing correct output.",
          judging: [
            "Correctness of output",
            "Creativity in inefficient logic",
            "Degree of intentional over-engineering",
          ],
        },
        {
          name: "Final Stage: Deciphering",
          objective:
            "Decode hidden logic, patterns, or algorithmic intent from problem statements and implement a working solution under pressure.",
          judging: [
            "Logical interpretation",
            "Algorithmic correctness",
            "Handling of edge cases",
            "Speed (tie-breaker)",
          ],
        },
      ],
      rules: [
        "This is an individual event; team participation is not allowed",
        "Internet access and AI-based tools are strictly prohibited",
        "Participants must use only the systems and IDEs provided by the organizers",
        "Programming languages allowed will be announced prior to the event",
        "Any form of malpractice or external assistance will result in disqualification",
      ],
      contacts: [
        {
          role: "Student Coordinator",
          name: "Kamil Hassan S",
          phone: "7448447272",
        },
        {
          role: "Student Coordinator",
          name: "Mohammed Mustaq Mubeen",
          phone: "9344534434",
        },
        { role: "Student Coordinator", name: "Vishvaa K" },
        { role: "Student Coordinator", name: "James Jacob I" },
        { role: "Student Coordinator", name: "Akhil D" },
        { role: "Student Coordinator", name: "Sriram A" },
      ],
      registration:
        "Register to participate in the Tech Marathon and test your endurance in debugging, logic, and creative coding.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
    },
  },
  {
    name: "It Takes Two",
    slug: "it-takes-two",
    track: "Technical",
    short: "Two-player code relay challenge",
    videoSrc:
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794127/feature-3_mkmgf7.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
          role: "Student Coordinator",
          name: "Praveen Ram",
          phone: "9150290204",
        },
        {
          role: "Student Coordinator",
          name: "Shyam Evin Raj",
          phone: "6385118647",
        },
        {
          role: "Student Coordinator",
          name: "Gladis Keziah",
          phone: "8270089542",
        },
        {
          role: "Student Coordinator",
          name: "Canosa R Krucy",
          phone: "9345705837",
        },
        {
          role: "Student Coordinator",
          name: "Tarakeshwaran",
          phone: "8870982120",
        },
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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794181/feature-12n_nmn9to.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "1–2",
      overview:
        "In this high-energy Hot Seat challenge, teams race through rapid-fire quiz rounds before the sharpest minds make it to the final spotlight. The finale channels the intensity of a Millionaire-style hot seat, where every answer is a heartbeat, every lifeline is a gamble, and every choice can flip the game. It’s fast, it’s fierce, and it pushes players to balance knowledge, speed, and guts under pressure—turning the entire event into a thrilling showdown of brainpower.",
      rounds: [
        {
          name: "Elite 5",
          objective:
            "All teams face fifteen timed questions. Accuracy + speed decide the top five teams. No lifelines. Pure adrenaline.",
          duration: "20 mins",
        },
        {
          name: "Fastest Finger First",
          objective:
            "The qualified teams tackle tougher questions. All five teams advance, but their speed and score determine the order in which they enter the finale. Still no lifelines—just grit and quick thinking.",
          duration: "20 mins",
        },
        {
          name: "Hot Seat Finale",
          objective:
            "Inspired by the iconic Millionaire format, teams take the hotseat one by one. With three lifelines—50:50, Phone-a-Friend, and Pass—they must climb the levels without slipping. One wrong answer knocks them down and out. Smart strategy and calm under pressure decide who claims the crown.",
          duration: "20 mins",
        },
      ],
      judging: [
        "Any form of copying, collusion, or unfair collaboration with other teams.",
        "Using any unauthorized external help or communication",
        "Exceeding time limits or violating event rules",
        "Manipulating scoring, submissions, or the judging system",
      ],
      contacts: [
        {
          role: "Student Coordinator",
          name: "Naveen Kumar S",
          phone: "6381574955",
        },
        {
          role: "Student Coordinator",
          name: "Tarunikaa B",
          phone: "9840918520",
        },
        {
          role: "Student Coordinator",
          name: "Akaash Srinivasan",
          phone: "7305488743",
        },
        { role: "Student Coordinator", name: "Abinand P", phone: "9445920529" },
        {
          role: "Student Coordinator",
          name: "Sharon Jessica S",
          phone: "7418777315",
        },
        {
          role: "Student Coordinator",
          name: "Shree Ranjani B",
          phone: "7305491657",
        },
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
    poweredBy: "Unstop",
    videoSrc:
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794112/feature-2_fasq1a.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
        { role: "Student Coordinator", name: "Shyleja S", phone: "9841025250" },
        { role: "Student Coordinator", name: "Ashwin N", phone: "6379814082" },
        { role: "Student Coordinator", name: "Yesudoss S" },
        { role: "Student Coordinator", name: "Anuvarshini V" },
        { role: "Student Coordinator", name: "Maheswari M" },
        { role: "Student Coordinator", name: "Sanjeev Kumar" },
        { role: "Student Coordinator", name: "Balaji S" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo:
        "https://unstop.com/conferences/paper-presentation-velammal-engineering-college-vec-chennai-tamil-nadu-1629156",
    },
  },
  {
    name: "Build in 60 Minutes",
    slug: "build-in-60",
    track: "Technical",
    short: "UI/UX + Website Sprint",
    videoSrc:
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794143/feature-10n_qb8zvp.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "1-3",
      overview:
        "A 60-minute sprint to design and ship a clean UI. Balance visuals and usability — build something that feels like a product.",
      rounds: [
        {
          name: "60-Minute Sprint",
          duration: "60 mins",
          objective: "Design and build a clean UI based on theme/brief",
          judging: [
            "Design clarity (30)",
            "Responsiveness (25)",
            "Usability (25)",
            "Completeness (20)",
          ],
        },
      ],
      rules: [
        "Participants must use their own laptops; college systems are not permitted",
        "Internet access is disabled by default throughout the event",
        "A one-time internet access window of 5 minutes will be provided during the event",
        "Internet usage during this window is strictly limited to syntax and official documentation reference",
        "Accessing tutorials, blogs, GitHub repositories, or solution-related content is prohibited",
        "Any misuse of internet access will result in immediate disqualification",
        "All required tools, including Visual Studio Code (VS Code), must be pre-installed",
        "Judges' decisions are final",
      ],
      contacts: [
        {
          role: "Student Coordinator",
          name: "Udaya Krishna",
          phone: "8531933830",
        },
        { role: "Student Coordinator", name: "Ragul KB", phone: "7448765530" },
        { role: "Student Coordinator", name: "Preetham" },
        { role: "Student Coordinator", name: "Prasath" },
        { role: "Student Coordinator", name: "Divyasree S" },
        { role: "Student Coordinator", name: "Krishanth K" },
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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769793892/feature-7n_xgpjte.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "3-5",
      overview:
        "A strategy and quick-thinking auction event with an IPL-style twist. Build the best squad/stack within your budget.",
      rounds: [
        {
          name: "Auction Round",
          duration: "60 mins",
          objective: "Build the best squad within budget",
          judging: ["Final score (60)", "Budget efficiency (40)"],
        },
      ],
      rules: [
        "Stick to the allocated budget",
        "No collusion between teams",
        "Budget-based bidding rounds",
        "Point system based on your final picks",
      ],
      contacts: [
        { role: "Student Coordinator", name: "Suriya RS", phone: "8870256728" },
        {
          role: "Student Coordinator",
          name: "Surendran S",
          phone: "6374402965",
        },
        { role: "Student Coordinator", name: "Pragadesh Kumar G S" },
        { role: "Student Coordinator", name: "Vinayaganand S" },
        { role: "Student Coordinator", name: "Pramodh Kumar K" },
        { role: "Student Coordinator", name: "Shivanandha P" },
      ],
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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769793592/feature-13n_szp5yq.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "1–3",
      overview:
        "A fun, gamified connection challenge where patterns and 'tone' are everything. Connect clues and react to audio/visual prompts.",
      rounds: [
        {
          name: "Connection Round",
          objective: "Link the clues",
          judging: ["Accuracy (60)", "Speed (40)"],
        },
        {
          name: "Sonic Sense Round",
          objective: "Identify/react quickly to audio/visual prompts",
          judging: ["Accuracy (60)", "Speed (40)"],
        },
      ],
      rules: [
        "Follow the facilitator's instructions for each mini-round",
        "No external help/devices unless allowed",
      ],
      contacts: [
        { role: "Student Coordinator", name: "Kamaliga", phone: "9342857096" },
        {
          role: "Student Coordinator",
          name: "Sanjai Kumar G",
          phone: "8925209953",
        },
        { role: "Student Coordinator", name: "Ashok Kumar V" },
        { role: "Student Coordinator", name: "Deepak S" },
        { role: "Student Coordinator", name: "Yeswant BV" },
        { role: "Student Coordinator", name: "Vinniammal" },
      ],
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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769793343/feature-11n_zwx7xo.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
        { role: "Student Coordinator", name: "Pranesh S", phone: "7094752140" },
        {
          role: "Student Coordinator",
          name: "Nidhelaa TS",
          phone: "8056146898",
        },
        { role: "Student Coordinator", name: "Hinduja KP" },
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
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794188/feature-14n_gsiove.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
        { role: "Student Coordinator", name: "Sanjay RK", phone: "8248934356" },
        {
          role: "Student Coordinator",
          name: "Venkatesh R",
          phone: "6369528501",
        },
        { role: "Student Coordinator", name: "Cindrella" },
        { role: "Student Coordinator", name: "Mahalakshmi M" },
        { role: "Student Coordinator", name: "Manju Priya J" },
        { role: "Student Coordinator", name: "Vishnu K" },
      ],
      registration: "Click Register to continue to the registration section.",
      registerTo: "https://forms.gle/JZgWcGhFr6gM11PD8",
    },
  },
  {
    name: "Funtrix",
    slug: "funtrix",
    track: "Non-Tech",
    short: "Free Fire and Tekken",
    videoSrc:
      "https://res.cloudinary.com/dm0vwe5cw/video/upload/v1769794637/feature-9n_gbgn5j.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "Individual / Duo",
      overview:
        "Funtrix at OZMENTA '26 is a high-octane competitive zone combining sports precision and combat intensity. Step in, compete, and prove your dominance in the digital arena.",
      sections: [
        {
          name: "Free Fire",
          imageSrc: "https://res.cloudinary.com/dbe1m52oz/image/upload/v1770655658/GPH_Free_Fire_Marketing_Banners_-_Jerome_Alcantara_ixqzwu.jpg",
          overview:
            "A fast-paced, online battle royale competition where teams of two players must showcase tactical teamwork, survival skills, and combat precision.",
          rounds: [
            {
              name: "Round 1",
              objective: "Battle royale mode for all the duo participants.",
              description: "Shortlisted participants will progress to next round.",
            },
            {
              name: "Round 2",
              objective: "Clash Squad mode for the shortlisted duo participants.",
              description: "Shortlisted participants will progress to next round.",
            },
            {
              name: "Final Round",
              objective: "Final Clash Squad for the top two teams.",
            },
          ],
          rules: [
            "Each team must consist of 2 players (Duo only).",
            "The total event duration is approximately 2–3 hours, depending on match progress.",
            "Participants must bring their own mobile device, stable internet connection, earphones, and a fully charged phone.",
            "The event will be conducted online using Free Fire.",
            "The event consists of multiple knockout rounds, with top-performing duos advancing to the final match.",
            "Teams are evaluated based on kills, survival time, teamwork, and overall match performance.",
            "Any use of hacks, cheats, abusive behavior, or unfair play will result in immediate disqualification.",
          ],
        },
        {
          name: "Tekken",
          imageSrc: "https://res.cloudinary.com/dbe1m52oz/image/upload/v1770655646/TGA_2022___un_trailer_explosif_pour_le_nouveau_Tekken_ailwbc.jpg",
          overview:
            "An offline, one-on-one fighting game tournament where individual players battle it out using technical skills, strategy, and reflexes.",
          rounds: [
            {
              name: "Solo Format",
              objective: "The event follows a solo format with one-on-one battles.",
              description: "Winners advance through knockout rounds until the finals.",
            },
          ],
          rules: [
            "Each match will be played between two individual participants (Solo competition only).",
            "The total event duration is approximately 2–3 hours, depending on the number of participants and match progression.",
            "The event will be conducted offline using Tekken on standardized settings.",
            "The event consists of multiple knockout rounds, with winners advancing to the next stage until the final match.",
            "Players are evaluated based on match victories, gameplay skills, strategy, and fair play.",
            "Any use of cheats or unsportsmanlike behavior will result in immediate disqualification.",
          ],
        },
      ],
      contacts: [
        {
          role: "Student Coordinator",
          name: "Mugunthan Kennedy K",
          phone: "9047389144",
        },
        {
          role: "Student Coordinator",
          name: "Jefrin Jijo SR",
          phone: "8838919136",
        },
        { role: "Student Coordinator", name: "Sharan D" },
        { role: "Student Coordinator", name: "Rageshwaran HR" },
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
    poweredBy: "Unstop",
    videoSrc:
      "https://res.cloudinary.com/dbe1m52oz/video/upload/v1767781724/Make_a_animated_1080p_202601071550_anqson.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
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
            "Practical Impact and Feasibility",
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
        {
          role: "Student Coordinator",
          name: "Merlyne Margarate Christinal D",
          phone: "9840952078",
        },
        { role: "Student Coordinator", name: "Chandn S", phone: "9360468653" },
      ],
      registration: "Click Register to showcase your project.",
      registerTo:
        "https://unstop.com/conferences/project-expo-velammal-engineering-college-vec-chennai-tamil-nadu-1631453",
    },
  },
  {
    name: "Workshop",
    slug: "workshop",
    track: "Featured",
    short: "Agentic AI for Business: From Products to Real-Time Simulation",
    videoSrc:
      "https://res.cloudinary.com/dbe1m52oz/video/upload/v1767781652/something_baqfhk.mp4",
    details: {
      date: "21-02-2026",
      time: "from 9:00 AM",
      teamSize: "Individual",
      overview:
        "Experience an immersive workshop conducted by Spinabot that transforms how you understand Agentic AI systems in real business scenarios. Unlike traditional AI workshops focused on theory, this product-driven, simulation-based session leverages Spinabot's core platforms—Chatbot Builder, Voice Agent Builder, Workflow Automation, Cognitive Products, and Small Language Models (SLMs). Participants will learn how intelligent agents are designed, orchestrated, and applied in real-world companies through interactive product demonstrations and a hands-on company simulation. Working in scrum teams, you'll take on roles like Product Manager, Chatbot Developer, Voice Agent Developer, and Workflow Automation Developer to design agent-driven business solutions. Perfect for students, startup founders, and developers looking to move beyond basic automation and understand how AI agents operate as intelligent systems inside real businesses.",
      rules: [
        "Bring your own laptop with internet access",
        "Participate actively in team-based simulation exercises",
        "Collaborate with your assigned scrum team (4 members per team)",
        "Complete the interactive quiz and business Q&A sessions",
        "Engage in the real-time AI company simulation challenge",
        "Present your team's agentic workflow solution during demos",
        "Internship opportunities available for the winning team (4 people interviewed and selected)",
      ],
      contacts: [
        {
          role: "Workshop Coordinator",
          name: "Akshayasree S",
          phone: "9445575579",
        },
        {
          role: "Technical Lead",
          name: "Lakshmi Narasimman A",
          phone: "8122880841",
        },
      ],
      registration:
        "Register now to secure your spot in this exciting robotics workshop! Limited seats available.",
      registerTo: "https://forms.gle/CDWw5SmcBbzujtSr7",
    },
  },
].map((event) => ({
  ...event,
  slug: event.slug || slugify(event.name),
  videoSrc: withCloudinaryAuto(event.videoSrc),
}));

export const getEventBySlug = (slug) =>
  EVENTS.find((event) => event.slug === slug);
