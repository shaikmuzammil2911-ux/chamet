export interface NavItem {
  title: string;
  href: string;
  dropdown?: {
    title: string;
    href: string;
    description: string;
    badge?: string;
  }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
    dropdown: [
      {
        title: "All Services Overview",
        href: "/services",
        description: "Explore our full suite of interactive entertainment solutions.",
      },
      {
        title: "E-Commerce",
        href: "/services/e-commerce",
        description: "Interactive video shopping and commerce platforms.",
        badge: "New",
      },
      {
        title: "Live Streaming",
        href: "/services/live-streaming",
        description: "Real-time broadcasting, host gifts & global reach.",
        badge: "Popular",
      },
      {
        title: "Playrooms & Games",
        href: "/services/playrooms-games",
        description: "Multi-seat audio party rooms & interactive gaming.",
      },
      {
        title: "Dating & Social",
        href: "/services/social-connections",
        description: "Genuine connections, verified profiles & meaningful chats.",
      },
    ],
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Our Vision",
    href: "/vision",
  },
  {
    title: "Our Team",
    href: "/team",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
