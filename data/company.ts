export interface OfficeLocation {
  type: string;
  name: string;
  address: string;
  city: string;
  country: string;
  landmark?: string;
  pincode?: string;
  isHeadOffice?: boolean;
}

export const COMPANY = {
  name: "ManaVerse Technologies Pvt. Ltd.",
  brand: "Chamet",
  experienceYears: 11,
  tagline: "Play • Connect • Earn • Grow",
  headline: "Innovating Entertainment, Empowering Lives",
  subheadline: "Your ultimate platform for entertainment, social connections, and earning opportunities.",
  
  description:
    "ManaVerse Technologies Pvt. Ltd. is focused on digital entertainment, social connections, interactive platforms, and earning opportunities. Our platform enables people to connect, entertain themselves, participate in interactive activities, and explore opportunities through live streaming, games, e-commerce, and social networking.",
  
  mission:
    "Our mission is to provide safe, secure, and reliable earning opportunities, especially for women hosts and individuals who need financial support to improve their family situations.",
  
  vision:
    "Our vision is to become one of the top leading companies in the industry by providing innovative digital entertainment and earning opportunities.",

  contact: {
    phone: "8555896346",
    phoneDisplay: "+91 8555896346",
    phoneTel: "tel:+918555896346",
    whatsapp: "8555896346",
    whatsappLink: "https://wa.me/918555896346",
    email: "Currently unavailable.",
  },

  offices: [
    {
      type: "Head Office",
      name: "United Kingdom Headquarters",
      address: "Velina Colony Street",
      landmark: "Near Fashion Showroom",
      city: "London",
      country: "UK",
      isHeadOffice: true,
    },
    {
      type: "Branch Office",
      name: "Bengaluru Technology Center",
      address: "HSR Layout",
      landmark: "Karnataka",
      city: "Bengaluru",
      country: "India",
      pincode: "560102",
      isHeadOffice: false,
    },
  ],

  highlights: [
    {
      id: "safe-secure",
      title: "Safe & Secure",
      description: "End-to-end user data protection, verified profiles, and automated community safety systems.",
      icon: "ShieldCheck",
    },
    {
      id: "trust-transparency",
      title: "Trust & Transparency",
      description: "Fair earnings policies, transparent real-time balance calculations, and dedicated host assistance.",
      icon: "Handshake",
    },
    {
      id: "reliable-income",
      title: "Reliable Income Opportunities",
      description: "Predictable, on-time creator payouts supporting hosts in achieving true financial independence.",
      icon: "Coins",
    },
    {
      id: "equal-opportunities",
      title: "Equal Opportunities for Everyone",
      description: "Inclusive digital ecosystem where talent, creativity, and dedication are celebrated equally.",
      icon: "Users",
    },
    {
      id: "supporting-families",
      title: "Supporting Families & Communities",
      description: "Empowering individuals, particularly women hosts, to build brighter futures for their households.",
      icon: "HeartHandshake",
    },
  ],

  stats: [
    { label: "Years of Excellence", value: "11+", icon: "Trophy" },
    { label: "Happy Users", value: "Millions", icon: "Users" },
    { label: "Global Community", value: "Global", icon: "Globe" },
    { label: "Platform Trust", value: "100%", icon: "Shield" },
  ],

  whyChooseUs: [
    {
      title: "Safe & Secure Platform",
      desc: "Robust 24/7 AI moderation and human review to ensure a respectful, safe environment for all hosts and users.",
      icon: "ShieldAlert",
    },
    {
      title: "Multiple Earning Opportunities",
      desc: "Diverse revenue streams including live gifts, voice room hosting, interactive gaming, and e-commerce.",
      icon: "TrendingUp",
    },
    {
      title: "Fun & Engaging Experience",
      desc: "High-definition video streaming, audio party rooms, real-time gaming, and instant social matchmaking.",
      icon: "Sparkles",
    },
    {
      title: "Support for Families",
      desc: "Dedicated programs focused on empowering women and family breadwinners with stable, flexible income.",
      icon: "Heart",
    },
    {
      title: "Equal Opportunities",
      desc: "Open to passionate creators and hosts worldwide regardless of prior broadcasting experience.",
      icon: "Award",
    },
    {
      title: "A Better & Happier Life",
      desc: "Creating joyful social experiences that bridge geographical borders and build meaningful relationships.",
      icon: "Smile",
    },
  ],
};

