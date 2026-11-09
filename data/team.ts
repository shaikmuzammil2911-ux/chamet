export interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: "Executive Leadership" | "Sales & Business Development" | "India Operations" | "Global Markets";
  image: string;
  market: string;
  location: string;
  phone?: string;
  phoneDisplay?: string;
  phoneTel?: string;
  whatsappLink?: string;
  email?: string;
  bio: string;
  skills: string[];
  achievements: string[];
  isVerified: boolean;
  avatarColor: string;
  badge: string;
  rankOrder: number;
}

export const TEAM_DEPARTMENTS = [
  "All Leadership",
  "Executive Leadership",
  "Sales & Business Development",
  "India Operations",
  "Global Markets",
] as const;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "james-au",
    name: "James Au",
    role: "CEO Chamet & Chillchat",
    designation: "Chief Executive Officer",
    department: "Executive Leadership",
    image: "/images/team/james-au.png",
    market: "UK, America & Middle East Market",
    location: "London, UK (Global Headquarters)",
    email: "james.au@manaverse.com",
    bio: "Visionary technology executive steering Chamet and Chillchat across Western Europe, the Americas, and Middle Eastern digital entertainment corridors. Spearheads global product strategy, high-concurrency RTC streaming infrastructure, international creator monetization, and worldwide platform safety standards.",
    skills: [
      "Global Enterprise Strategy",
      "Interactive Social Platforms",
      "High-Concurrency RTC Media",
      "Cross-Continental Monetization",
      "Brand Ecosystems",
    ],
    achievements: [
      "Pioneered global expansion of Chamet across 150+ countries",
      "Executive architect behind Chillchat and Chamet ecosystem integration",
      "Built multi-million-dollar live streaming creator networks",
      "Spearheaded international safety compliance and creator welfare standards",
    ],
    isVerified: true,
    avatarColor: "from-purple-600 via-indigo-600 to-pink-500",
    badge: "Chief Executive Officer",
    rankOrder: 1,
  },
  {
    id: "koteswarao-gaddam",
    name: "Koteswarao Gaddam",
    role: "Co-Founder (India Market)",
    designation: "Co-Founder & Director of India Operations",
    department: "Executive Leadership",
    image: "/images/team/koteswarao-gaddam.png",
    market: "India Market & South Asia Corridor",
    location: "Bengaluru, Karnataka, India",
    phone: "8555896346",
    phoneDisplay: "+91 8555896346",
    phoneTel: "tel:+918555896346",
    whatsappLink: "https://wa.me/918555896346?text=Hello%20Koteswarao%20Sir%2C%20I%20am%20contacting%20regarding%20ManaVerse%20%2F%20Chamet%20India.",
    email: "koteswarao.gaddam@manaverse.com",
    bio: "Founding visionary driving ManaVerse Technologies and the Chamet platform across the Indian subcontinent. Deeply passionate about creator empowerment, financial inclusion for women broadcasters, agency network scaling, and ethical live streaming ecosystems that support thousands of families.",
    skills: [
      "India Market Leadership",
      "Host & Creator Empowerment",
      "Talent Agency Guild Governance",
      "Sustainable Payout Infrastructures",
      "Strategic Business Partnerships",
    ],
    achievements: [
      "Co-founded and scaled ManaVerse Technologies Pvt. Ltd.",
      "Empowered thousands of women broadcasters with verified independent earnings",
      "Built extensive talent agency partnerships across Tier 1, 2 & 3 Indian cities",
      "Pioneered zero-delay direct financial settlement mechanisms for creators",
    ],
    isVerified: true,
    avatarColor: "from-amber-500 via-rose-600 to-purple-600",
    badge: "Co-Founder • India Market",
    rankOrder: 2,
  },
  {
    id: "kota-kousalya",
    name: "Kota Kousalya",
    role: "Head of Sales (India)",
    designation: "Director of Sales & Business Growth",
    department: "Sales & Business Development",
    image: "/images/team/kota-kousalya.png",
    market: "India Market",
    location: "Bengaluru, Karnataka, India",
    phone: "80964 41494",
    phoneDisplay: "+91 80964 41494",
    phoneTel: "tel:+918096441494",
    whatsappLink: "https://wa.me/918096441494?text=Hello%20Kota%20Kousalya%20Ma'am%2C%20I%20am%20contacting%20regarding%20Chamet%20Sales%20%26%20Partnerships.",
    email: "kousalya.kota@manaverse.com",
    bio: "Senior commercial strategist leading nationwide revenue growth, talent agency acquisition, brand alliances, and enterprise host recruitment programs across India. Champion for high-retention creator relationships and transparent agency monetization models.",
    skills: [
      "Enterprise Sales Leadership",
      "Agency Network Acquisition",
      "Revenue Optimization",
      "Creator Relationship Management",
      "Commercial Expansion Strategy",
    ],
    achievements: [
      "Drove record-breaking quarter-on-quarter agency onboarding growth",
      "Established strategic alliances with over 150+ regional talent networks",
      "Spearheaded VIP host retention programs yielding 96% broadcast consistency",
      "Recognized for excellence in creator empowerment and commercial excellence",
    ],
    isVerified: true,
    avatarColor: "from-pink-500 via-rose-500 to-purple-600",
    badge: "Head of Sales • India",
    rankOrder: 3,
  },
  {
    id: "jesus",
    name: "Jesus",
    role: "Sales Manager",
    designation: "Senior Manager – Sales & Creator Partnerships",
    department: "Sales & Business Development",
    image: "/images/team/jesus.png",
    market: "India Market & Regional Guilds",
    location: "Bengaluru, Karnataka, India",
    phone: "9392786785",
    phoneDisplay: "+91 9392786785",
    phoneTel: "tel:+919392786785",
    whatsappLink: "https://wa.me/919392786785?text=Hello%20Jesus%2C%20I%20am%20reaching%20out%20regarding%20Chamet%20Creator%20%26%20Agency%20Partnerships.",
    email: "jesus@manaverse.com",
    bio: "Key commercial driver orchestrating regional agency onboarding, streamer negotiations, revenue tracking, and broadcaster support. Dedicated to ensuring every creator and agency achieves rapid growth and maximum monetization on Chamet.",
    skills: [
      "Sales Pipeline Management",
      "Host Talent Acquisition",
      "Agency Performance Coaching",
      "Client Engagement & Retention",
      "Regional Market Penetration",
    ],
    achievements: [
      "Successfully launched 50+ new high-performing host agencies",
      "Delivered top-tier broadcaster recruitment metrics across Southern India",
      "Provides dedicated day-to-day operational support to top agency managers",
      "Consistently achieved outstanding customer satisfaction ratings",
    ],
    isVerified: true,
    avatarColor: "from-purple-600 via-violet-600 to-blue-600",
    badge: "Sales Manager",
    rankOrder: 4,
  },
  {
    id: "keerthi-reddy",
    name: "Keerthi Reddy",
    role: "Sales Manager",
    designation: "Senior Manager – Business Development & Streamer Success",
    department: "Sales & Business Development",
    image: "/images/team/keerthi-reddy.png",
    market: "India Market & Southern Corridors",
    location: "Bengaluru, Karnataka, India",
    phone: "7981640590",
    phoneDisplay: "+91 7981640590",
    phoneTel: "tel:+917981640590",
    whatsappLink: "https://wa.me/917981640590?text=Hello%20Keerthi%20Reddy%2C%20I%20am%20reaching%20out%20regarding%20Chamet%20Creator%20%26%20Agency%20Partnerships.",
    email: "keerthi.reddy@manaverse.com",
    bio: "Dynamic sales leader focused on creator success journeys, agency relationship cultivation, event sponsorships, and host career mentorship. Champions host financial security and ensures streamlined settlement processes for signed creators.",
    skills: [
      "Business Development",
      "Streamer Success & Mentorship",
      "Agency Growth Strategies",
      "Contract Negotiations",
      "Creator Career Pathways",
    ],
    achievements: [
      "Facilitated career pathways for hundreds of independent female broadcasters",
      "Expanded agency relationships throughout Telangana, Andhra Pradesh, and Karnataka",
      "Organized regional streamer workshops on professional broadcasting techniques",
      "Achieved stellar retention rates among managed agency partners",
    ],
    isVerified: true,
    avatarColor: "from-emerald-500 via-teal-600 to-purple-600",
    badge: "Sales Manager",
    rankOrder: 5,
  },
];
