"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { TypewriterNumber } from "@/components/ui/TypewriterNumber";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Star,
  Radio,
  Flame,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cmsService } from "@/lib/cms";

interface HeroSliderProps {
  onOpenVideo?: () => void;
  onOpenServicesModal?: () => void;
}

const SLIDES = [
  {
    id: 1,
    image: "/images/hero/hero-slide-1.png",
    alt: "ManaVerse Chamet Live Host and Interactive Entertainment",
    slideBadge: "Live Interactive Broadcasting",
    badgeIcon: Star,
    headingHighlight: "Technologies Pvt. Ltd.",
    subTitleTag: "Play • Connect • Earn • Grow",
    description:
      "Your ultimate platform for entertainment, social connections, and earning opportunities. Join millions celebrating talents and building financial independence.",
    featurePill: "Top Ranked Creator Platform",
  },
  {
    id: 2,
    image: "/images/hero/hero-slide-2.png",
    alt: "ManaVerse Chamet Audio Party Rooms and Gaming Streamers",
    slideBadge: "Voice Party Rooms & Gaming",
    badgeIcon: Flame,
    headingHighlight: "Global Digital Community",
    subTitleTag: "Voice • Stream • Collaborate • Win",
    description:
      "Host multi-seat voice lounges, stream high-fidelity gaming moments, and exchange breathtaking 3D virtual gifts with audiences spanning over 150 countries.",
    featurePill: "Ultra-Low Latency Video Streaming",
  },
  {
    id: 3,
    image: "/images/hero/hero-slide-3.png",
    alt: "ManaVerse Chamet Social Connections and Reels Experience",
    slideBadge: "Authentic Social Connections",
    badgeIcon: Award,
    headingHighlight: "Empowering Lives Daily",
    subTitleTag: "Connect • Share • Celebrate • Belong",
    description:
      "Explore dynamic short video reels, meet genuine verified individuals, and build sustainable livelihood opportunities with reliable, timely host payouts.",
    featurePill: "Safe & Verified Human Profiles",
  },
];

const SLIDE_DURATION = 3200; // Fast and dynamic auto-sliding (3.2 seconds)

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenVideo,
  onOpenServicesModal,
}) => {
  const [slides, setSlides] = useState(SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Sync slides with Supabase CMS
  useEffect(() => {
    cmsService.getHeroSlides().then((liveSlides) => {
      if (liveSlides && liveSlides.length > 0) {
        setSlides(liveSlides as any);
      }
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Automatic slide interval (3.2 seconds for faster, dynamic transitions)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diffX > minSwipeDistance) {
      nextSlide();
    } else if (diffX < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="ManaVerse Hero Showcase"
    >
      {/* Background Images with Fast Crossfade & Ken-Burns Zoom Effect */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div
              className={`relative w-full h-full transform transition-transform duration-[4000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-[75%_center] sm:object-[70%_center] lg:object-right-center"
                sizes="100vw"
                quality={90}
              />
            </div>

            {/* Gradient Overlays for contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0624] via-[#0F0624]/85 to-transparent lg:w-3/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0624] via-[#0F0624]/60 to-transparent lg:hidden pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F0624] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0F0624]/90 to-transparent pointer-events-none" />
          </div>
        );
      })}

      {/* Floating Decorative Glow Ribbons */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-purple/20 blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-pink/20 blur-[100px] pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Badge: 11 Years of Excellence with Typing Number */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-amber-500/10 border border-amber-400/40 backdrop-blur-md shadow-lg shadow-amber-950/20">
                <div className="flex items-center text-brand-gold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current -ml-1 scale-75" />
                </div>
                <span className="text-xs sm:text-sm font-bold tracking-wide text-brand-gold">
                  <TypewriterNumber value="11" suffix=" Years of Excellence" duration={1200} />
                </span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-amber-400/60" />
                <span className="hidden sm:inline-block text-xs font-semibold text-purple-200/90">
                  {currentSlide.slideBadge}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
                ManaVerse <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC83D] via-[#FFE259] to-[#FF29D6]">
                  {currentSlide.headingHighlight}
                </span>
              </h1>

              {/* Tagline */}
              <div className="flex items-center gap-2 text-base sm:text-xl lg:text-2xl font-bold tracking-wide text-purple-200">
                <span>{currentSlide.subTitleTag}</span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-purple-100/90 leading-relaxed max-w-xl font-normal">
                {currentSlide.description}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  variant="gold"
                  size="lg"
                  href="/services"
                  withArrow
                  className="shadow-xl shadow-amber-500/20"
                >
                  Explore Our Services
                </Button>

                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-md shadow-purple-900/40 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-2 flex items-center gap-2 text-xs text-purple-300/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Empowering thousands of verified hosts and community members worldwide</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Left / Right Manual Slider Navigation Arrows */}
      <div className="hidden md:flex absolute inset-y-0 inset-x-4 lg:inset-x-8 items-center justify-between pointer-events-none z-30">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Hero Slide"
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-purple shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Hero Slide"
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-purple shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Pagination Indicators with Animated Progress Line */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex items-center justify-center gap-2.5 z-30">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`group relative h-2.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none ${
                isActive
                  ? "w-12 bg-white/20 shadow-md shadow-brand-pink/50"
                  : "w-3 bg-white/30 hover:bg-white/60"
              }`}
            >
              {isActive && (
                <div
                  className="h-full bg-gradient-to-r from-brand-gold to-brand-pink rounded-full transition-all"
                  style={{
                    animation: isPaused ? "none" : `slideProgress ${SLIDE_DURATION}ms linear`,
                  }}
                />
              )}
              <span className="sr-only">Slide {idx + 1}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes slideProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
