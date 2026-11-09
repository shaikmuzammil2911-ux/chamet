export interface AgencyStory {
  id: string;
  agencyId: string;
  agencyName: string;
  agencyBadge: string;
  agencyLogo: string;
  creatorName: string;
  creatorRole: string;
  creatorAvatarBg: string;
  creatorInitials: string;
  storyTitle: string;
  category: "Milestone" | "Empowerment" | "PK Battle" | "Community" | "Live Event";
  description: string;
  fullNarrative: string;
  coverImage: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  date: string;
  timestamp: string;
  views: string;
  likes: string;
  keyMetric: string;
  tags: string[];
}

export const AGENCY_STORIES: AgencyStory[] = [
  {
    id: "story-sophia-milestone",
    agencyId: "aurora-star-network",
    agencyName: "Aurora Star Media",
    agencyBadge: "Diamond Partner",
    agencyLogo: "★",
    creatorName: "Sophia Rivera",
    creatorRole: "Top Live Broadcaster",
    creatorAvatarBg: "from-pink-500 via-rose-500 to-purple-600",
    creatorInitials: "SR",
    storyTitle: "From University Student to Top Live Broadcaster & Homeowner",
    category: "Empowerment",
    description:
      "How Sophia built a loyal 1.2M following on Chamet and achieved total financial freedom for her family in under 24 months.",
    fullNarrative:
      "Joining Aurora Star Media in 2023 was the turning point for Sophia. Starting with just a smartphone and high-speed Wi-Fi, her nightly acoustic broadcasts and positive humor attracted listeners from over 40 countries. With Aurora's dedicated mentorship and weekly earnings settlements, Sophia paid off her family's debt and purchased her dream home in Bangalore.",
    coverImage: "/images/hero/hero-slide-1.png",
    mediaType: "video",
    mediaUrl: "/videos/chamet-showcase.mp4",
    date: "2 hours ago",
    timestamp: "Today, 11:30 AM",
    views: "184K views",
    likes: "62.4K likes",
    keyMetric: "1.2M Community • 50M+ Gems",
    tags: ["Financial Freedom", "Host Mentorship", "Aurora Star"],
  },
  {
    id: "story-celestial-audio-battle",
    agencyId: "celestial-voice-collective",
    agencyName: "Celestial Voice & Entertainment",
    agencyBadge: "Platinum Guild",
    agencyLogo: "🎙️",
    creatorName: "Carlos Diaz & Aisha Kapoor",
    creatorRole: "DJ & Audio Master / Party Lounge Host",
    creatorAvatarBg: "from-blue-600 via-purple-600 to-pink-500",
    creatorInitials: "CD",
    storyTitle: "Midnight Symphony: The Record-Breaking 12-Hour Audio Lounge",
    category: "PK Battle",
    description:
      "52,000 concurrent listeners joined our cross-continental live music and voice battle, raising 120M virtual gems.",
    fullNarrative:
      "Celestial's audio technology bridges borders with sub-50ms latency. Carlos hosted live synth beats from Madrid while Aisha welcomed guest vocalists from Delhi and London. The room ran uninterrupted for 12 hours with non-stop virtual gift showers, setting a new platform record for interactive multi-seat voice engagement.",
    coverImage: "/images/hero/hero-slide-2.png",
    mediaType: "video",
    mediaUrl: "/videos/chamet-showcase.mp4",
    date: "Yesterday",
    timestamp: "Nov 6, 9:00 PM",
    views: "245K views",
    likes: "94.1K likes",
    keyMetric: "52K Concurrent Listeners",
    tags: ["Audio Lounge", "Live DJ", "Global Party"],
  },
  {
    id: "story-phoenix-safety-first",
    agencyId: "phoenix-talent-alliance",
    agencyName: "Phoenix Women Creator Collective",
    agencyBadge: "Founding Partner",
    agencyLogo: "✨",
    creatorName: "Elena Rostova & Priya Sharma",
    creatorRole: "PK Champion & Master Host Mentor",
    creatorAvatarBg: "from-amber-500 via-orange-500 to-rose-500",
    creatorInitials: "ER",
    storyTitle: "Host Shield: 100% Secure Environment for 2,200+ Women Creators",
    category: "Community",
    description:
      "Elena and Priya highlight how Phoenix's privacy filters, automated escrow, and 24/7 guardian support give creators absolute peace of mind.",
    fullNarrative:
      "ManaVerse's founding principle is safety and dignity for every creator. Phoenix Collective enforces rigorous real-time AI moderation, instant panic escalation, and private payout custody. Over 2,200 women creators now earn reliable incomes while remaining completely safe from online harassment.",
    coverImage: "/images/hero/hero-slide-3.png",
    mediaType: "image",
    mediaUrl: "/images/hero/hero-slide-3.png",
    date: "3 days ago",
    timestamp: "Nov 4, 3:15 PM",
    views: "310K views",
    likes: "115K likes",
    keyMetric: "2,200+ Creators Protected",
    tags: ["Host Safety", "Empowerment", "Zero Harassment"],
  },
  {
    id: "story-aurora-pk-showdown",
    agencyId: "aurora-star-network",
    agencyName: "Aurora Star Media",
    agencyBadge: "Diamond Partner",
    agencyLogo: "★",
    creatorName: "Maya Song",
    creatorRole: "Rising Star Streamer",
    creatorAvatarBg: "from-emerald-500 to-cyan-500",
    creatorInitials: "MS",
    storyTitle: "Global PK Tournament: Maya Advances to World Grand Finals",
    category: "Live Event",
    description:
      "In a 5-minute lightning showdown, Maya rallied her international fan club to win the Asia-Pacific regional qualifying battle.",
    fullNarrative:
      "With 3D dragon gift animations lighting up the entire screen, Maya defended her leaderboard spot against 8 veteran streamers. Over 40,000 fans contributed virtual tokens, sending Maya to next month's Dubai Champions Gala with an all-expenses-paid VIP invitation.",
    coverImage: "/images/hero/hero-slide-1.png",
    mediaType: "video",
    mediaUrl: "/videos/chamet-showcase.mp4",
    date: "5 days ago",
    timestamp: "Nov 2, 7:45 PM",
    views: "198K views",
    likes: "78.3K likes",
    keyMetric: "Grand Finalist • 40K Contributors",
    tags: ["PK Duel", "Championship", "Dubai Gala"],
  },
];

