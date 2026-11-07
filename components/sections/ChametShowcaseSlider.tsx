"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft,
  ChevronRight,
  Radio,
  Globe2,
  Users,
  Gamepad2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChametShowcaseSliderProps {
  onOpenGetStarted?: () => void;
}

const SHOWCASE_SLIDES = [
  {
    id: 1,
    title: "Chamet Live Experience",
    badge: "Ultra-Low Latency Media",
    badgeIcon: Radio,
    tagline: "High-Definition Broadcasts & Real-Time Celebrations",
    description:
      "Broadcast your talents to millions worldwide with crystal-clear audio, sub-second latency, and stunning 3D virtual gift animations that reward performers.",
    image: "/images/showcase/showcase-1.png",
    accent: "from-purple-600 to-pink-500",
    glowColor: "rgba(133, 0, 255, 0.4)",
    highlight: "100k+ Active Hosts Daily",
    cta: "Explore Live Rooms",
  },
  {
    id: 2,
    title: "Connect With The World",
    badge: "Global Matchmaking",
    badgeIcon: Globe2,
    tagline: "Authentic Friendships Across 150+ Countries",
    description:
      "Break cultural and linguistic barriers with instant multi-language translation and 1-on-1 verified video calls designed for meaningful human bonds.",
    image: "/images/showcase/showcase-2.png",
    accent: "from-blue-600 to-cyan-500",
    glowColor: "rgba(23, 107, 255, 0.4)",
    highlight: "150+ Nations Connected",
    cta: "Discover Connections",
  },
  {
    id: 3,
    title: "Live Hosts & Creators",
    badge: "Women Host Empowerment",
    badgeIcon: Users,
    tagline: "Safe & Supportive Community for Independent Creators",
    description:
      "Empowering women hosts and creators with safe, moderated broadcasting environments, dedicated mentor coaches, and dependable payout structures.",
    image: "/images/showcase/showcase-3.png",
    accent: "from-pink-500 to-rose-600",
    glowColor: "rgba(255, 41, 214, 0.4)",
    highlight: "Dedicated Host Care 24/7",
    cta: "Join as a Host",
  },
  {
    id: 4,
    title: "Entertainment & Games",
    badge: "Interactive Voice Party",
    badgeIcon: Gamepad2,
    tagline: "Multi-Seat Audio Lounges & Casual Party Challenges",
    description:
      "Step into 12-seat audio party rooms, play Ludo, Carrom, and trivia with companions, and compete in guild tournaments for exclusive platform rewards.",
    image: "/images/showcase/showcase-4.png",
    accent: "from-amber-500 to-purple-600",
    glowColor: "rgba(255, 200, 61, 0.4)",
    highlight: "25+ Integrated Games",
    cta: "Enter Playrooms",
  },
  {
    id: 5,
    title: "Creator Opportunities",
    badge: "Sustainable Earning",
    badgeIcon: TrendingUp,
    tagline: "Multiple Revenue Channels Built for Household Growth",
    description:
      "Turn creative charisma into predictable income through live gifts, voice room party hosting, talent contests, and host-driven e-commerce sales.",
    image: "/images/showcase/showcase-5.png",
    accent: "from-emerald-500 to-teal-700",
    glowColor: "rgba(16, 185, 129, 0.4)",
    highlight: "Punctual Weekly Payouts",
    cta: "Start Your Journey",
  },
];

const AUTOPLAY_INTERVAL = 3500; // 3.5 seconds automatic transition

export const ChametShowcaseSlider: React.FC<ChametShowcaseSliderProps> = ({
  onOpenGetStarted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length
    );
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe support (respects vertical scrolling)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = SHOWCASE_SLIDES[currentIndex];
  const BadgeIcon = currentSlide.badgeIcon;

  return (
    <section
      className="py-10 sm:py-16 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Chamet Feature Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/40 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-3 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span>Discover The Chamet Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Where Entertainment Meets Opportunity
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mt-2">
            Explore the premier features that make Chamet the destination for live interactive entertainment and creator financial empowerment.
          </p>
        </div>

        {/* Main Sliding Card Showcase Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C0A38] to-[#120426] border border-purple-500/30 shadow-2xl shadow-purple-950/80 min-h-[460px] sm:min-h-[500px] flex items-center">
          {/* Background Images with Smooth Crossfade */}
          {SHOWCASE_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-[75%_center] sm:object-center transform scale-105 transition-transform duration-[4000ms]"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
                {/* Dark Gradient Overlays for optimal text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F0624]/95 via-[#0F0624]/80 to-[#0F0624]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0624] via-transparent to-[#0F0624]/40" />
              </div>
            );
          })}

          {/* Slide Text Content */}
          <div className="relative z-20 w-full p-6 sm:p-10 md:p-14 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Slide Number & Badge */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    0{currentSlide.id} / 05
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/40 text-brand-gold border border-brand-purple/60 text-xs font-bold backdrop-blur-md">
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{currentSlide.badge}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {currentSlide.highlight}
                  </span>
                </div>

                {/* Heading */}
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                {/* Tagline */}
                <div className="text-sm sm:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
                  {currentSlide.tagline}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-purple-100/90 leading-relaxed max-w-lg">
                  {currentSlide.description}
                </p>

                {/* Action CTA */}
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    variant="gold"
                    size="md"
                    onClick={onOpenGetStarted}
                    withArrow
                    className="shadow-xl shadow-amber-500/20"
                  >
                    {currentSlide.cta}
                  </Button>
                  <span className="text-xs text-purple-300 hidden sm:inline-block">
                    Swipe or use arrows to explore
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Previous / Next Arrows */}
          <div className="absolute inset-y-0 inset-x-3 sm:inset-x-5 flex items-center justify-between pointer-events-none z-30">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Pagination Indicators (1, 2, 3, 4, 5) */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-0 flex items-center justify-center gap-2 z-30">
            {SHOWCASE_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "px-3 py-1 rounded-full bg-gradient-to-r from-brand-gold to-brand-pink text-[#26005F] text-xs font-black shadow-md shadow-brand-pink/50 scale-105"
                      : "w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white/80 text-[11px] font-semibold border border-white/10"
                  }`}
                >
                  <span>{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
