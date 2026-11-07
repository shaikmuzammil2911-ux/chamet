export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  accentGradient: string;
  glowColor: string;
  stats: { label: string; value: string }[];
  features: {
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  ctaText: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "e-commerce",
    slug: "e-commerce",
    title: "E-Commerce",
    shortDesc: "A platform that provides interactive shopping and entertainment experiences.",
    tagline: "Shoppertainment Reimagined",
    fullDesc:
      "Our interactive E-Commerce platform fuses live entertainment with dynamic product discovery. Hosts and creators showcase trending products directly to live audiences, creating interactive shopping experiences with real-time Q&A, flash offers, and instant secure checkout.",
    iconName: "ShoppingBag",
    badge: "Interactive Commerce",
    accentGradient: "from-blue-600 via-indigo-600 to-purple-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
    stats: [
      { label: "Integrated Brands", value: "500+" },
      { label: "Order Delivery Success", value: "99.4%" },
      { label: "Interactive Catalogs", value: "24/7" },
    ],
    features: [
      {
        title: "Live Product Showcases",
        description: "Engage prospective buyers with real-time video demonstrations, instant sizing answers, and interactive try-on experiences.",
      },
      {
        title: "In-Stream Checkout",
        description: "Zero-friction purchasing directly inside live streams and audio party rooms without leaving the entertainment flow.",
      },
      {
        title: "Creator Commission System",
        description: "Transparent, real-time attribution and earnings for hosts recommending trusted merchant inventory.",
      },
      {
        title: "Verified Merchant Guarantee",
        description: "Strict quality checks and buyer protection policies ensuring genuine products and dependable logistics.",
      },
    ],
    benefits: [
      {
        title: "Diversified Host Income",
        description: "Expand your earnings beyond gifts into merchandise commissions and brand sponsorships.",
      },
      {
        title: "Engaging Consumer Experience",
        description: "Shopping becomes social, enjoyable, and informed through authentic creator demonstrations.",
      },
      {
        title: "Scalable Merchant Reach",
        description: "Merchants reach targeted, highly engaged global audiences with high conversion rates.",
      },
    ],
    ctaText: "Explore E-Commerce Solutions",
  },
  {
    id: "live-streaming",
    slug: "live-streaming",
    title: "Live Streaming",
    shortDesc: "Users and hosts can connect, entertain, and explore earning opportunities through live streaming.",
    tagline: "Global Broadcasts & High-Yield Hosting",
    fullDesc:
      "Our flagship live streaming engine delivers ultra-low latency, crystal-clear video and high-fidelity audio worldwide. Hosts broadcast their talents, build loyal fan communities, and generate meaningful daily income through virtual gifts, interactive PK battles, and viewer celebrations.",
    iconName: "Radio",
    badge: "Most Popular",
    accentGradient: "from-purple-600 via-pink-600 to-rose-500",
    glowColor: "rgba(133, 0, 255, 0.45)",
    stats: [
      { label: "Broadcast Latency", value: "<150ms" },
      { label: "Active Host Streamers", value: "100k+" },
      { label: "Countries Connected", value: "150+" },
    ],
    features: [
      {
        title: "Ultra-Low Latency HD Video",
        description: "Global content delivery network optimized for sub-second lag, ensuring seamless real-time conversation.",
      },
      {
        title: "Animated Virtual Gifts",
        description: "Stunning 3D rendered gift animations that reward performers and illuminate the screen with vibrant energy.",
      },
      {
        title: "Host PK Battles & Tournaments",
        description: "Exciting head-to-head competitions where host communities cheer and compete to send their favorite creator to victory.",
      },
      {
        title: "Multi-Guest Video Rooms",
        description: "Invite fans or co-hosts directly onto the screen for collaborative performances, interviews, and celebrations.",
      },
    ],
    benefits: [
      {
        title: "Empowering Financial Freedom",
        description: "Reliable payout mechanisms designed to give women and individuals independent earning power from home.",
      },
      {
        title: "Worldwide Stage",
        description: "Break geographical limitations and broadcast your singing, dancing, conversation, and charisma across continents.",
      },
      {
        title: "24/7 Creator Care & Safety",
        description: "Dedicated account managers and intelligent moderation filters protecting our hosts at all times.",
      },
    ],
    ctaText: "Start Live Streaming",
  },
  {
    id: "playrooms-games",
    slug: "playrooms-games",
    title: "Playrooms & Games",
    shortDesc: "Interactive audio party rooms, fun games, and group activities where people can enjoy their time together.",
    tagline: "Social Voice Rooms & Casual Gaming",
    fullDesc:
      "Step into multi-seat interactive voice lounges and casual gaming arenas. Users gather with friends or meet new companions, play classic and trending party games, listen to music together, and celebrate victories with thrilling audio-visual effects.",
    iconName: "Gamepad2",
    badge: "Interactive Gaming",
    accentGradient: "from-amber-500 via-orange-600 to-purple-700",
    glowColor: "rgba(255, 200, 61, 0.4)",
    stats: [
      { label: "Seats Per Room", value: "Up to 12" },
      { label: "Interactive Mini-Games", value: "25+" },
      { label: "Audio Quality", value: "Hi-Fi Stereo" },
    ],
    features: [
      {
        title: "Multi-Seat Voice Stages",
        description: "Fluid multi-microphone audio stages featuring echo cancellation, spatial sound, and voice modification filters.",
      },
      {
        title: "Synchronous Casual Games",
        description: "Integrated games such as Ludo, Carrom, Trivia, and Card challenges that you can play without switching apps.",
      },
      {
        title: "Themed Virtual Rooms",
        description: "Customizable room wallpaper, ambient background music, and entry animations tailored to party themes.",
      },
      {
        title: "Community Tournaments & Guilds",
        description: "Form alliances, participate in guild leaderboards, and win commemorative badges and reward pools.",
      },
    ],
    benefits: [
      {
        title: "Casual & Non-Intimidating",
        description: "No camera required — shine through your voice, conversational charm, and gaming skill.",
      },
      {
        title: "Room Host Rewards",
        description: "Receive gifts and appreciation tokens for hosting engaging, lively, and welcoming audio gatherings.",
      },
      {
        title: "Community Belonging",
        description: "Find your tribe with shared hobbies, late-night conversations, and friendly gaming matches.",
      },
    ],
    ctaText: "Discover Playrooms",
  },
  {
    id: "social-connections",
    slug: "social-connections",
    title: "Dating App & Social Connections",
    shortDesc: "A platform where real people can connect, communicate, build friendships, and develop meaningful relationships.",
    tagline: "Authentic Human Connections",
    fullDesc:
      "ManaVerse connects hearts and minds with a focus on authenticity, safety, and respect. Verified real profiles, intelligent affinity matching, and private 1-on-1 video calls give people a welcoming space to find companionship, romance, and lifelong bonds.",
    iconName: "Heart",
    badge: "Verified Profiles",
    accentGradient: "from-pink-500 via-rose-600 to-purple-600",
    glowColor: "rgba(255, 41, 214, 0.4)",
    stats: [
      { label: "Real User Verification", value: "100%" },
      { label: "Connections Made", value: "10M+" },
      { label: "Safety Score", value: "A+" },
    ],
    features: [
      {
        title: "Verified Human Profiles",
        description: "Rigorous anti-bot screening and optional photo verification ensure you are talking to genuine people.",
      },
      {
        title: "Private HD 1-on-1 Calls",
        description: "End-to-end protected high-resolution audio and video calls with beauty filters and privacy blur shields.",
      },
      {
        title: "Smart Affinity Matchmaking",
        description: "Discover individuals nearby or globally based on shared interests, languages, values, and relationship goals.",
      },
      {
        title: "Instant Real-Time Chat & Translation",
        description: "Cross linguistic barriers seamlessly with built-in instant translation for international conversations.",
      },
    ],
    benefits: [
      {
        title: "Safe & Respectful Environment",
        description: "Strict community guidelines, instant block/report features, and zero tolerance for harassment.",
      },
      {
        title: "Authentic Friendships",
        description: "Meet people who truly resonate with your personality, stories, and aspirations.",
      },
      {
        title: "Privacy First",
        description: "Full control over your profile visibility, location precision, and contact preferences.",
      },
    ],
    ctaText: "Connect with Real People",
  },
];

