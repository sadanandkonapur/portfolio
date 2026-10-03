/**
 * Single source of truth for the portfolio.
 * Edit this file to update copy, links, and structured data.
 *
 * TODO (supply when ready — do not invent on the page):
 * - Optionally replace public/resume.pdf with a designed CV export
 * - Add githubUrl / liveUrl for each project when available
 * - Add a personal photo path under site.avatar if desired
 * - Add any verified metrics/awards only when documented
 */

export const site = {
  name: "Sadanand Konapur",
  shortName: "Sadanand",
  url: "https://sadanand.tech",
  email: "koonapursadanand@gmail.com",
  phone: "+918374292341",
  phoneDisplay: "+91 8374292341",
  location: "Hyderabad, India",
  role: "Generative AI / AI-ML Engineer",
  // TODO: add avatar image path when available, e.g. "/avatar.jpg"
  avatar: "" as string,
  resumePath: "/resume.pdf",
  socials: {
    github: "https://github.com/sadanandkonapur",
    linkedin: "https://linkedin.com/in/sadanandkonapur",
    email: "mailto:koonapursadanand@gmail.com",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  name: site.name,
  roles: [
    "Generative AI Engineer",
    "AI & ML Developer",
    "Python & Next.js Builder",
  ] as const,
  pitch:
    "I build LLM-powered products, automation and data dashboards that turn messy data into decisions.",
  status: "Open to internships & entry-level roles | India + US remote",
  ctas: {
    primary: { label: "View Projects", href: "/projects" },
    secondary: { label: "Open Resume", href: site.resumePath },
  },
  metaLeft: ["GENAI / LLM APPS / AUTOMATION", "OPEN TO INTERNSHIPS & ENTRY-LEVEL"],
  metaRight: ["BASED IN HYDERABAD", "INDIA + US REMOTE"],
} as const;

export const about = {
  headline: "About",
  body: [
    "I'm a final-year Computer Science student focused on Generative AI and practical LLM applications — the kind that ship, not just demo.",
    "At BBetter I work on ads attribution, automation workflows and Next.js products that connect messy API data to clear decisions.",
    "I care about clean interfaces, reliable data pipelines and AI tools that feel useful on day one.",
  ],
  facts: [
    {
      title: "Education",
      detail:
        "Final-year B.Tech, Computer Science (AI & ML), MLRITM, Hyderabad — graduating Apr 2027",
    },
    {
      title: "Currently",
      detail: "Digital Operations & AI Intern at BBetter",
    },
    {
      title: "Focus",
      detail: "GenAI, LLM apps, LangChain, automation with n8n",
    },
  ],
} as const;

export type ExperienceItem = {
  org: string;
  role: string;
  location: string;
  period: string;
  bullets?: string[];
};

export const experience: ExperienceItem[] = [
  {
    org: "BBetter",
    role: "Digital Operations & AI Intern",
    location: "Hyderabad (On-site)",
    period: "Aug 2026 – Present",
    bullets: [
      "Built a Next.js dashboard on the Meta Ads API (CPC, CPM, frequency, ROAS) with week-over-week aggregation to flag under- and over-performing campaigns.",
      "Designed an attribution dashboard joining Meta Ads and Shopify Admin APIs via UTM matching to reconcile reported performance against confirmed revenue weekly; extended it to ingest Google Ads data.",
      "Built n8n workflows that pull data from the Meta Ads API into Google Sheets, with the sheets connected to the dashboard as its live data source.",
      "Built a headless Next.js site consuming the WordPress REST API with Custom Post Types, decoupling content management from the codebase.",
      "Automated call-center analytics with Google Apps Script (clasp), computing agent-wise conversion rates and revenue in Google Sheets; resolved theme/integration issues across Shopify storefronts via Shopify CLI.",
    ],
  },
  {
    org: "AWS Cloud Club, MLRITM",
    role: "Core Member",
    location: "Hyderabad",
    period: "Nov 2025 – Present",
    bullets: [
      "Help plan and run AWS fundamentals workshops and hands-on sessions.",
    ],
  },
  {
    org: "GeeksforGeeks Campus Chapter, MLRITM",
    role: "Logistics Team Member",
    location: "Hyderabad",
    period: "2024 – Present",
    bullets: [
      "Coordinate technical events, coding contests and DSA practice sessions.",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AI Voice Assistant",
    description:
      "Conversational agent combining LLMs with speech-to-text and text-to-speech for real-time voice interaction; LangChain for reasoning, context management and multi-turn dialogue.",
    tags: ["Python", "LangChain", "LLMs", "Speech Recognition"],
    featured: true,
    // TODO: githubUrl / liveUrl
  },
  {
    title: "Auto-Apply Job Bot",
    description:
      "n8n workflow that pulls listings from the JSearch API, filters by role and location, sends personalized HR outreach via Gmail and logs every application in Google Sheets.",
    tags: ["n8n", "JSearch API", "Gmail", "Google Sheets"],
    // TODO: githubUrl / liveUrl
  },
  {
    title: "Attribution & Ads Dashboards",
    description:
      "Meta Ads + Shopify + Google Ads reporting built for BBetter on Next.js — weekly attribution, ROAS and campaign health in one place.",
    tags: ["Next.js", "Meta Ads API", "Shopify Admin API"],
    // TODO: githubUrl / liveUrl
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    group: "Web",
    items: ["Next.js", "React", "WordPress REST API", "Headless CMS"],
  },
  {
    group: "APIs & Integrations",
    items: [
      "Meta Ads API",
      "Shopify Admin API",
      "Google Ads",
      "REST",
      "UTM Attribution",
    ],
  },
  {
    group: "AI/ML",
    items: ["LangChain", "LLMs", "Prompt Engineering", "AI Agents", "Claude API"],
  },
  {
    group: "Tools & Cloud",
    items: [
      "Git",
      "GitHub",
      "Google Apps Script",
      "Shopify CLI",
      "n8n",
      "VS Code",
      "AWS (Cloud Fundamentals)",
    ],
  },
  {
    group: "Databases",
    items: ["SQL", "MongoDB"],
  },
] as const;

export const education = [
  {
    degree: "B.Tech, Computer Science Engineering (AI & ML)",
    school:
      "Marri Laxman Reddy Institute of Technology and Management, Hyderabad",
    period: "2023 – Apr 2027",
  },
  {
    degree: "Diploma in Engineering",
    school: "Sri Sangameshwara Government Polytechnic, Hyderabad",
    period: "2021 – 2024",
  },
] as const;

export const contact = {
  headline: "Let's build something.",
  subcopy:
    "Open to internships, entry-level roles and interesting GenAI collaborations.",
  email: site.email,
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  linkedin: site.socials.linkedin,
  github: site.socials.github,
} as const;

export const chat = {
  suggested: [
    "What has he built?",
    "Is he open to roles?",
    "Tech stack?",
  ] as const,
  welcome:
    "Ask me anything about Sadanand's experience, projects or stack. I only answer from his portfolio data.",
  systemContext: `You are a helpful assistant for Sadanand Konapur's portfolio (sadanand.tech).
Answer briefly, warmly and professionally using ONLY the facts below. If asked something not covered, say you don't have that info and suggest emailing koonapursadanand@gmail.com. Never invent employers, metrics, awards or links.

Name: Sadanand Konapur
Role: Generative AI / AI-ML Engineer
Pitch: Builds LLM-powered products, automation and data dashboards that turn messy data into decisions.
Status: Open to internships & entry-level roles | India + US remote
Location: Hyderabad, India
Email: koonapursadanand@gmail.com
Phone: +91 8374292341
GitHub: github.com/sadanandkonapur
LinkedIn: linkedin.com/in/sadanandkonapur

Education:
- Final-year B.Tech CSE (AI & ML), MLRITM, Hyderabad, graduating Apr 2027 (2023–Apr 2027)
- Diploma in Engineering, Sri Sangameshwara Government Polytechnic, Hyderabad, 2021–2024

Experience:
- BBetter — Digital Operations & AI Intern, Hyderabad (On-site), Aug 2026–Present
  • Next.js Meta Ads dashboard (CPC, CPM, frequency, ROAS) with WoW aggregation
  • Attribution dashboard joining Meta Ads + Shopify Admin APIs via UTM matching; also Google Ads
  • n8n workflows: Meta Ads API → Google Sheets → live dashboard source
  • Headless Next.js + WordPress REST API / Custom Post Types
  • Call-center analytics via Google Apps Script; Shopify CLI theme/integration work
- AWS Cloud Club, MLRITM — Core Member, Nov 2025–Present (workshops & hands-on sessions)
- GeeksforGeeks Campus Chapter, MLRITM — Logistics Team Member, 2024–Present

Projects:
1. AI Voice Assistant — LLMs + STT/TTS, LangChain (Python, LangChain, LLMs, Speech Recognition)
2. Auto-Apply Job Bot — n8n + JSearch API + Gmail + Google Sheets
3. Attribution & Ads Dashboards (BBetter) — Next.js, Meta/Shopify/Google Ads

Skills: Python, JavaScript, SQL, HTML, CSS, Next.js, React, WordPress REST API, Headless CMS, Meta Ads API, Shopify Admin API, Google Ads, REST, UTM Attribution, LangChain, LLMs, Prompt Engineering, AI Agents, Claude API, Git, GitHub, Google Apps Script, Shopify CLI, n8n, VS Code, AWS Cloud Fundamentals, MongoDB

Focus: GenAI, LLM apps, LangChain, automation with n8n.`,
} as const;

export const footer = {
  year: new Date().getFullYear(),
} as const;
