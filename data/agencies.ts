export interface AgencyCreator {
  id: string;
  name: string;
  role: string;
  followers: string;
  isLive: boolean;
  avatarBg: string;
  initials: string;
}

export interface Agency {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  accentColor: string;
  creatorsCount: string;
  totalFollowers: string;
  rating: number;
  activeLiveCount: string;
  established: string;
  headquarters: string;
  achievements: string[];
  featuredCreators: AgencyCreator[];
  commissionRate: string;
  payoutFrequency: string;
  badge: string;
}

export const TOP_AGENCIES: Agency[] = [
  {
    id: "aurora-star-network",
    name: "Aurora Star Media",
    category: "Global Broadcaster Guild",
    tagline: "Empowering Next-Generation Digital Stars Across 65+ Countries",
    description:
      "Aurora Star Media is Chamet's premier talent agency, representing top-tier broadcast hosts, vocal performers, and variety entertainers. With dedicated 1-on-1 streamer mentorship and zero-delay financial settlements.",
    logo: "★",
    coverImage: "/images/hero/hero-slide-1.png",
    accentColor: "from-purple-600 via-pink-600 to-amber-500",
    creatorsCount: "1,850+",
    totalFollowers: "24.6M",
    rating: 4.98,
    activeLiveCount: "420+ LIVE",
    established: "2019",
    headquarters: "London & Bengaluru",
    badge: "Diamond Partner",
    commissionRate: "Top Host Tier (Up to 80% Retention)",
    payoutFrequency: "Bi-Weekly Instant Direct Wire",
    achievements: [
      "Chamet Global Agency of the Year 2024 & 2025",
      "Over $12M USD Disbursed to Women Broadcasters",
      "Official Host Training Academy with 98% Certification Rate",
      "Round-the-Clock Multilingual Dedicated Streamer Support",
    ],
    featuredCreators: [
      {
        id: "c-aurora-1",
        name: "Sophia Rivera",
        role: "Top Live Broadcaster",
        followers: "1.2M",
        isLive: true,
        avatarBg: "from-pink-500 via-rose-500 to-purple-600",
        initials: "SR",
      },
      {
        id: "c-aurora-2",
        name: "Priya Sharma",
        role: "Master Creator Mentor",
        followers: "1.1M",
        isLive: true,
        avatarBg: "from-emerald-500 via-teal-600 to-purple-600",
        initials: "PS",
      },
      {
        id: "c-aurora-3",
        name: "Aria Montgomery",
        role: "Acoustic Vocals Specialist",
        followers: "680K",
        isLive: false,
        avatarBg: "from-blue-500 to-purple-600",
        initials: "AM",
      },
    ],
  },
  {
    id: "celestial-voice-collective",
    name: "Celestial Voice & Entertainment",
    category: "Audio Lounges & Interactive Party Rooms",
    tagline: "Curating the World's Most Engaging Live Audio Communities",
    description:
      "Specializing in multi-seat interactive voice lounges, late-night DJ sets, and collaborative storytelling rooms. Celestial fosters warm, safe, and engaging conversational atmospheres with high listener retention.",
    logo: "🎙️",
    coverImage: "/images/hero/hero-slide-2.png",
    accentColor: "from-blue-600 via-indigo-600 to-purple-600",
    creatorsCount: "1,420+",
    totalFollowers: "19.2M",
    rating: 4.94,
    activeLiveCount: "310+ LIVE",
    established: "2021",
    headquarters: "Dubai & Singapore",
    badge: "Platinum Guild",
    commissionRate: "Premium Audio Tier",
    payoutFrequency: "Weekly Automated Payouts",
    achievements: [
      "Over 40,000 Concurrent Voice Room Listeners Daily",
      "Host Wellness Program & Mental Health Alliance",
      "Highest Community Gift Engagement per Room",
      "Pioneer in Regional Dialect Audio Podcasting",
    ],
    featuredCreators: [
      {
        id: "c-celestial-1",
        name: "Aisha Kapoor",
        role: "Party Lounge Host",
        followers: "950K",
        isLive: true,
        avatarBg: "from-purple-600 via-indigo-600 to-blue-500",
        initials: "AK",
      },
      {
        id: "c-celestial-2",
        name: "Carlos Diaz",
        role: "DJ & Audio Master",
        followers: "640K",
        isLive: true,
        avatarBg: "from-blue-600 via-cyan-500 to-purple-600",
        initials: "CD",
      },
      {
        id: "c-celestial-3",
        name: "Devon Chen",
        role: "Late Night Conversationalist",
        followers: "520K",
        isLive: false,
        avatarBg: "from-amber-600 to-rose-600",
        initials: "DC",
      },
    ],
  },
  {
    id: "phoenix-talent-alliance",
    name: "Phoenix Women Creator Collective",
    category: "Financial Independence & Host Empowerment",
    tagline: "Building Financial Freedom & Secure Livelihoods for Creators Globally",
    description:
      "A trailblazing agency founded on the core values of ManaVerse: providing safe, verified, and high-earning opportunities for women hosts. Featuring safety escorts, identity protection tools, and dedicated financial literacy training.",
    logo: "✨",
    coverImage: "/images/hero/hero-slide-3.png",
    accentColor: "from-rose-500 via-pink-600 to-purple-700",
    creatorsCount: "2,200+",
    totalFollowers: "31.8M",
    rating: 4.99,
    activeLiveCount: "580+ LIVE",
    established: "2018",
    headquarters: "Bengaluru, India",
    badge: "Founding Partner",
    commissionRate: "Protected Host Guaranteed Rate",
    payoutFrequency: "Same-Day Host Settlement",
    achievements: [
      "Over 5,000 Families Supported Financially Through Creator Incomes",
      "100% Zero-Tolerance Host Safety Policy",
      "Annual Top Host Luxury Retreat and Recognition Gala",
      "Full Equipment Grants (Microphones, Studio Lighting, Ring Lights)",
    ],
    featuredCreators: [
      {
        id: "c-phoenix-1",
        name: "Elena Rostova",
        role: "Interactive Host",
        followers: "780K",
        isLive: false,
        avatarBg: "from-amber-500 via-orange-500 to-rose-500",
        initials: "ER",
      },
      {
        id: "c-phoenix-2",
        name: "Maya Song",
        role: "Rising Star Streamer",
        followers: "520K",
        isLive: true,
        avatarBg: "from-emerald-500 to-cyan-500",
        initials: "MS",
      },
      {
        id: "c-phoenix-3",
        name: "Zoya Al-Mansoor",
        role: "Lifestyle & Culture Host",
        followers: "890K",
        isLive: true,
        avatarBg: "from-pink-600 via-purple-600 to-blue-600",
        initials: "ZA",
      },
    ],
  },
];
