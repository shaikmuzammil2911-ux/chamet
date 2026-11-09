export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  shortDesc: string;
  fullDesc: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-rtc-eng",
    title: "Senior WebRTC & Media Streaming Engineer",
    department: "Technology",
    location: "Bengaluru, Karnataka (Hybrid)",
    type: "Full-Time",
    experience: "3-6 Years",
    shortDesc: "Architect sub-second video and voice streaming pipelines handling millions of concurrent users globally.",
    fullDesc: "Lead our real-time media architecture delivering low-latency WebRTC broadcasts, dynamic adaptive bitrates, and multi-participant audio lounges across 150+ countries.",
    requirements: [
      "Deep understanding of WebRTC, RTMP, HLS, and RTP streaming protocols",
      "Hands-on experience with Go, C++, or Node.js high-concurrency systems",
      "Experience optimizing video/audio codecs (H.264, VP8/VP9, Opus)",
      "Bachelor's degree in Computer Science or equivalent technical experience",
    ],
    responsibilities: [
      "Maintain sub-50ms streaming latency across global edge points",
      "Optimize clustering and media relay servers for high-throughput live streams",
      "Implement robust fallback protocols for low-bandwidth mobile connections",
    ],
    benefits: [
      "Competitive executive compensation + performance equity",
      "Comprehensive medical, dental, and wellness insurance",
      "Annual high-performance equipment allowance",
    ],
  },
  {
    id: "job-frontend-lead",
    title: "Lead Frontend Engineer (Next.js & React)",
    department: "Technology",
    location: "Bengaluru, Karnataka (Hybrid)",
    type: "Full-Time",
    experience: "4-7 Years",
    shortDesc: "Craft pixel-perfect micro-interactions, 3D gift animation canvases, and responsive live streaming web applications.",
    fullDesc: "Spearhead our public web and creator portal architecture using Next.js 14, Tailwind CSS, TypeScript, and Framer Motion.",
    requirements: [
      "Expert-level knowledge of React 18, Next.js App Router, and TypeScript",
      "Proven track record with complex state management and responsive styling",
      "Experience with Canvas API, WebGL, or SVG gift animation physics is a plus",
    ],
    responsibilities: [
      "Lead web architecture and core component library development",
      "Optimize Lighthouse Core Web Vitals to 95+ across mobile and desktop",
      "Collaborate closely with UI/UX designers and media infrastructure teams",
    ],
    benefits: [
      "Premium compensation package with bi-annual performance bonuses",
      "Flexible hybrid working culture",
      "Continuous technical upskilling and conference budgets",
    ],
  },
  {
    id: "job-creator-manager",
    title: "Creator Talent & Agency Relationship Manager",
    department: "Operations",
    location: "Bengaluru, Karnataka (On-Site)",
    type: "Full-Time",
    experience: "2-5 Years",
    shortDesc: "Partner with top broadcaster guilds, mentor rising women hosts, and oversee smooth weekly creator settlements.",
    fullDesc: "Drive host recruitment, agency onboarding, broadcaster safety monitoring, and community event programming across the Indian subcontinent.",
    requirements: [
      "Proven experience in creator management, live streaming agencies, or talent management",
      "Fluent communication in English, Hindi, and regional languages",
      "Empathetic, problem-solving mindset committed to women host empowerment",
    ],
    responsibilities: [
      "Onboard, train, and certify new talent agencies and independent hosts",
      "Resolve host inquiries and coordinate zero-delay payment settlements",
      "Host monthly community workshops on broadcast lighting and audio quality",
    ],
    benefits: [
      "Attractive base salary + performance commission incentives",
      "Full creator equipment setup provided",
      "Direct exposure to international creator galas and summits",
    ],
  },
  {
    id: "job-safety-lead",
    title: "Trust, Safety & AI Content Moderation Lead",
    department: "Community & Safety",
    location: "London, UK / Bengaluru, India",
    type: "Full-Time",
    experience: "3-5 Years",
    shortDesc: "Ensure safe, respectful, and family-appropriate streaming environments across all public rooms and audio lounges.",
    fullDesc: "Oversee real-time AI computer vision moderation thresholds, human review escalation workflows, and anti-fraud identity verification.",
    requirements: [
      "Background in trust and safety, risk operations, or compliance at scale",
      "Understanding of international online safety regulations (UK Online Safety Bill, GDPR)",
      "Experience managing 24/7 moderation operations teams",
    ],
    responsibilities: [
      "Enforce zero-tolerance anti-harassment safeguards across the platform",
      "Audit facial verification match rates and KYC documentation",
      "Publish quarterly platform community safety and transparency reports",
    ],
    benefits: [
      "Competitive global compensation tier",
      "Health & mental wellness counseling stipends",
      "Collaborative international team culture",
    ],
  },
];

