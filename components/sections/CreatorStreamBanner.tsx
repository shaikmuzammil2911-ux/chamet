"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Radio, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cmsService } from "@/lib/cms";

interface CreatorStreamBannerProps {
  onOpenInquiry?: (subject?: string) => void;
  onOpenGetStarted?: () => void;
}

interface CreatorItem {
  id: string;
  name: string;
  role: string;
  category: string;
  followers: string;
  rating: string;
  avatarBg: string;
  initials: string;
  isLive: boolean;
  tag: string;
  image?: string;
}

const DEFAULT_CREATORS: CreatorItem[] = [
  {
    id: "creator-1",
    name: "Sophia Rivera",
    role: "Top Live Broadcaster",
    category: "Music & Vocals",
    followers: "1.2M",
    rating: "4.9",
    avatarBg: "from-pink-500 via-rose-500 to-purple-600",
    initials: "SR",
    isLive: true,
    tag: "Trending #1",
    image: "/images/journey/journey-angel.png",
  },
  {
    id: "creator-2",
    name: "Aisha Kapoor",
    role: "Party Lounge Host",
    category: "Voice Playrooms",
    followers: "950K",
    rating: "4.9",
    avatarBg: "from-purple-600 via-indigo-600 to-blue-500",
    initials: "AK",
    isLive: true,
    tag: "Voice Star",
    image: "/images/journey/journey-alone.png",
  },
  {
    id: "creator-3",
    name: "Elena Rostova",
    role: "Interactive Host",
    category: "Gaming & Battles",
    followers: "780K",
    rating: "4.8",
    avatarBg: "from-amber-500 via-orange-500 to-rose-500",
    initials: "ER",
    isLive: false,
    tag: "PK Duel Pro",
    image: "/images/journey/journey-swetha.png",
  },
  {
    id: "creator-4",
    name: "Priya Sharma",
    role: "Master Creator Mentor",
    category: "Host Empowerment",
    followers: "1.1M",
    rating: "5.0",
    avatarBg: "from-emerald-500 via-teal-600 to-purple-600",
    initials: "PS",
    isLive: true,
    tag: "Top Mentor",
    image: "/images/journey/journey-sanvi.png",
  },
  {
    id: "creator-5",
    name: "Carlos Diaz",
    role: "DJ & Audio Master",
    category: "Late Night Beats",
    followers: "640K",
    rating: "4.8",
    avatarBg: "from-blue-600 via-cyan-500 to-purple-600",
    initials: "CD",
    isLive: true,
    tag: "Audio DJ",
    image: "/images/team/jesus.png",
  },
  {
    id: "creator-6",
    name: "Maya Song",
    role: "Rising Star Streamer",
    category: "Dance & Lifestyle",
    followers: "520K",
    rating: "4.9",
    avatarBg: "from-fuchsia-500 via-pink-600 to-amber-500",
    initials: "MS",
    isLive: true,
    tag: "Rising Star",
    image: "/images/journey/journey-maha.png",
  },
];

export const CreatorStreamBanner: React.FC<CreatorStreamBannerProps> = ({
  onOpenInquiry,
  onOpenGetStarted,
}) => {
  const [creators, setCreators] = useState<CreatorItem[]>(DEFAULT_CREATORS);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Sync with Supabase CMS
  useEffect(() => {
    cmsService.getFeaturedHosts().then((liveHosts) => {
      if (liveHosts && liveHosts.length > 0) {
        setCreators(liveHosts as any);
      }
    });
  }, []);

  // Smooth continuous auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollSpeed = 0.8; // px per tick

    const step = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;
        // Infinite seamless loop reset
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scrollManual = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-2 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
              <span>Real-Time Broadcast Network</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Top Hosts & Broadcasters
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
              Discover the people bringing entertainment and connections to life across Chamet.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => scrollManual("left")}
              aria-label="Scroll left"
              className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-purple-400/40 transition-colors shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollManual("right")}
              aria-label="Scroll right"
              className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-purple-400/40 transition-colors shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-sliding Horizontal Marquee Container */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none px-4 sm:px-6 lg:px-8 py-2.5 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Double array for infinite continuous loop */}
        {[...creators, ...creators].map((creator, index) => (
          <div
            key={`${creator.id}-${index}`}
            onClick={() => {
              if (onOpenGetStarted) onOpenGetStarted();
              else if (onOpenInquiry) onOpenInquiry(`Connecting with host ${creator.name}`);
            }}
            className="flex-shrink-0 w-64 sm:w-72 p-4 rounded-2xl bg-gradient-to-b from-[#180830]/90 to-[#0F0422]/90 border border-purple-500/20 hover:border-brand-purple/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_-5px_rgba(133,0,255,0.45)] cursor-pointer group"
          >
            <div className="flex items-start gap-3.5">
              {/* Creator Avatar with Photo & Status Ring */}
              <div className="relative flex-shrink-0">
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${creator.avatarBg} p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden`}
                >
                  <div className="relative w-full h-full rounded-[14px] bg-[#140628] overflow-hidden flex items-center justify-center">
                    {creator.image ? (
                      <Image
                        src={creator.image}
                        alt={creator.name}
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-extrabold text-base">
                        {creator.initials}
                      </div>
                    )}
                  </div>
                </div>

                {/* Live or Status Dot */}
                {creator.isLive ? (
                  <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-[9px] font-black uppercase text-white tracking-wider flex items-center gap-1 shadow-lg ring-2 ring-[#0F0422]">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE
                  </span>
                ) : (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#140628] shadow" />
                )}
              </div>

              {/* Creator Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-white truncate group-hover:text-brand-gold transition-colors">
                    {creator.name}
                  </h4>
                  <span className="text-[10px] font-extrabold text-brand-gold flex items-center gap-0.5 shrink-0">
                    <Star className="w-3 h-3 fill-current text-brand-gold" />
                    {creator.rating}
                  </span>
                </div>

                <div className="text-xs font-semibold text-brand-pink truncate mt-0.5">
                  {creator.role}
                </div>

                <div className="flex items-center justify-between text-[11px] text-purple-200/70 mt-2 pt-2 border-t border-white/5">
                  <span className="truncate">{creator.category}</span>
                  <span className="font-bold text-white shrink-0">
                    {creator.followers} Fans
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
