export interface TeamMember {
  id: string;
  department: "Leadership" | "Technology" | "Operations" | "Design & UX" | "Community & Safety";
  role: string;
  designation: string;
  placeholderName: string;
  bio: string;
  skills: string[];
  isConfigured: boolean; // false indicates awaiting company verification
  imagePlaceholderText: string;
  contactEmail?: string;
  avatarColor: string;
}

export const TEAM_DEPARTMENTS = [
  "All Departments",
  "Leadership",
  "Technology",
  "Operations",
  "Design & UX",
  "Community & Safety",
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "lead-exec-1",
    department: "Leadership",
    role: "Chief Executive Officer & Visionary Lead",
    designation: "Executive Director",
    placeholderName: "Executive Leadership [Position Reserved]",
    bio: "Guides company strategy, brand growth, international market expansion, and host empowerment initiatives across global entertainment ecosystems.",
    skills: ["Strategic Direction", "International Growth", "Host Ecosystems", "Corporate Governance"],
    isConfigured: false,
    imagePlaceholderText: "CEO / Executive Director",
    avatarColor: "from-purple-600 to-indigo-600",
  },
  {
    id: "tech-head-1",
    department: "Technology",
    role: "Head of Infrastructure & Real-Time Media",
    designation: "Chief Technology Officer",
    placeholderName: "Technology Lead [Position Reserved]",
    bio: "Architects low-latency streaming infrastructure, WebRTC clustering, cloud scaling, and secure data pipelines for millions of concurrent users.",
    skills: ["WebRTC & RTC Media", "Cloud Scalability", "Low Latency", "Distributed Architecture"],
    isConfigured: false,
    imagePlaceholderText: "CTO / Technology Lead",
    avatarColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "ops-head-1",
    department: "Operations",
    role: "Global Operations & Host Partnerships Director",
    designation: "Head of Operations",
    placeholderName: "Operations Director [Position Reserved]",
    bio: "Oversees creator onboarding, reliable payout channels, operational logistics, and multi-country agency relationships.",
    skills: ["Creator Management", "Host Onboarding", "Global Payouts", "Agency Relations"],
    isConfigured: false,
    imagePlaceholderText: "Head of Operations",
    avatarColor: "from-amber-500 to-rose-600",
  },
  {
    id: "safety-head-1",
    department: "Community & Safety",
    role: "Trust, Safety & Compliance Lead",
    designation: "Head of Community Integrity",
    placeholderName: "Safety Director [Position Reserved]",
    bio: "Manages 24/7 AI-assisted moderation, real-human safety response, anti-fraud algorithms, and child/family protection standards.",
    skills: ["Trust & Safety", "AI Content Moderation", "Anti-Fraud Systems", "Compliance"],
    isConfigured: false,
    imagePlaceholderText: "Trust & Safety Lead",
    avatarColor: "from-emerald-500 to-teal-700",
  },
  {
    id: "design-head-1",
    department: "Design & UX",
    role: "Principal Product Designer & Experience Lead",
    designation: "Head of Product Experience",
    placeholderName: "Design Lead [Position Reserved]",
    bio: "Crafts immersive micro-interactions, gamified virtual gift animations, responsive digital interfaces, and emotional brand connections.",
    skills: ["UI/UX Architecture", "Gamification", "3D Gift Animation", "Mobile Interaction"],
    isConfigured: false,
    imagePlaceholderText: "Head of Product Design",
    avatarColor: "from-pink-500 to-purple-600",
  },
  {
    id: "tech-eng-2",
    department: "Technology",
    role: "Senior Full-Stack & Payment Gateway Architect",
    designation: "Principal Engineer",
    placeholderName: "Engineering Architect [Position Reserved]",
    bio: "Designs bulletproof financial ledger systems, automated host payout reconciliation, and high-throughput transactional APIs.",
    skills: ["FinTech Systems", "High-Throughput APIs", "Microservices", "Security Compliance"],
    isConfigured: false,
    imagePlaceholderText: "Principal Software Architect",
    avatarColor: "from-violet-600 to-blue-600",
  },
];
