"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cmsService } from "@/lib/cms";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ModalBackdrop } from "@/components/modals/ModalBackdrop";
import { Button } from "@/components/ui/Button";

interface ChametShowcaseSliderProps {
  onOpenGetStarted?: () => void;
}

const DEFAULT_JOURNEY_SLIDES = [
  {
    id: 1,
    title: "My Chamet Journey - Sarika",
    image: "/images/journey/journey-sarika.png",
    tag: "Sarika's Story",
  },
  {
    id: 2,
    title: "My Chamet Journey - Angel",
    image: "/images/journey/journey-angel.png",
    tag: "Angel's Story",
  },
  {
    id: 3,
    title: "My Chamet Journey - Alone",
    image: "/images/journey/journey-alone.png",
    tag: "Alone's Story",
  },
  {
    id: 4,
    title: "My Chamet Journey - Maha",
    image: "/images/journey/journey-maha.png",
    tag: "Maha's Story",
  },
  {
    id: 5,
    title: "My Chamet Journey - Sanvi",
    image: "/images/journey/journey-sanvi.png",
    tag: "Sanvi's Story",
  },
  {
    id: 6,
    title: "My Chamet Journey - Swetha",
    image: "/images/journey/journey-swetha.png",
    tag: "Swetha's Story",
  },
];

const AUTOPLAY_INTERVAL = 3500; // 3.5 seconds dynamic transition

export const ChametShowcaseSlider: React.FC<ChametShowcaseSliderProps> = ({
  onOpenGetStarted,
}) => {
  const [slides, setSlides] = useState(DEFAULT_JOURNEY_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Sync with Supabase CMS
  useEffect(() => {
    cmsService.getShowcaseSlides().then((liveSlides) => {
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

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Continuous auto-sliding
  useEffect(() => {
    if (isPaused || lightboxOpen || slides.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, lightboxOpen, nextSlide, slides.length]);

  // Touch swipe support for mobile devices
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

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      className="py-10 sm:py-16 relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Chamet Live Journey Showcase"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] bg-gradient-to-tr from-brand-purple/20 via-brand-pink/15 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/40 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-3 backdrop-blur-md shadow-lg shadow-purple-950/50">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
              <span>Chamet Creator Success Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
                Chamet Journey
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl mt-2.5">
              Real stories, inspiring hosts, and life-changing moments from the Chamet community.
            </p>
          </div>
        </ScrollReveal>

        {/* Grand Showcase Container - PURE GRAPHIC POSTERS WITHOUT TEXT OVERLAY */}
        <ScrollReveal direction="scale" delay={0.1}>
          <div className="relative mx-auto max-w-2xl sm:max-w-3xl lg:max-w-4xl rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-[#1E0B3C]/80 via-[#130528]/90 to-[#0A0218] border-2 border-purple-500/30 shadow-[0_0_50px_rgba(133,0,255,0.25)] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 backdrop-blur-xl group">
            {/* Ambient dynamic back-glow matching current slide */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/10 via-brand-pink/10 to-transparent pointer-events-none" />

            {/* Active Banner Image Frame */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[16/10] max-h-[560px] sm:max-h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black/40 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id || currentIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Blurred ambient background mirror for widescreen elegance */}
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title || "Chamet Journey"}
                    fill
                    className="object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
                    sizes="100vw"
                  />

                  {/* Main Crystal-Clear Graphic Poster */}
                  <div className="relative w-full h-full flex items-center justify-center z-10">
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.title || "Chamet Journey"}
                      fill
                      priority={currentIndex === 0}
                      className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] cursor-pointer"
                      sizes="(max-width: 768px) 100vw, 900px"
                      onClick={() => setLightboxOpen(true)}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Subtle Top-Right Expand Popup Trigger Icon */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Open full view popup"
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-brand-gold border border-white/20 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Left & Right Sleek Glass Navigation Arrows */}
              <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 flex items-center justify-between pointer-events-none z-30">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl shadow-purple-950/60 hover:border-brand-gold/60"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/25 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl shadow-purple-950/60 hover:border-brand-gold/60"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Bottom Numbered Pagination Indicators (1..N) with Live Progress */}
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-2.5 z-20 flex-wrap">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id || idx}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`group relative flex items-center justify-center transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-gradient-to-r from-brand-gold via-amber-300 to-brand-pink text-[#26005F] text-xs sm:text-sm font-black shadow-lg shadow-brand-pink/50 scale-105"
                        : "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/25 text-white/80 text-xs font-semibold border border-white/15 hover:border-purple-400/40"
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Interactive Journey Poster Popup Modal */}
      <ModalBackdrop
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={currentSlide.title || "My Chamet Journey"}
        badge={currentSlide.tag || "Chamet Host Story"}
        maxWidth="3xl"
      >
        <div className="space-y-5">
          <div className="relative w-full aspect-square max-h-[65vh] rounded-2xl overflow-hidden bg-black/50 border border-purple-500/30">
            <Image
              src={currentSlide.image}
              alt={currentSlide.title || "Chamet Journey"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 760px"
            />

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Story"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Story"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-purple-200">
              Slide {currentIndex + 1} of {slides.length} • Start your own empowering journey with Chamet
            </span>
            <Button
              variant="gold"
              size="md"
              withArrow
              onClick={() => {
                setLightboxOpen(false);
                if (onOpenGetStarted) onOpenGetStarted();
              }}
            >
              Join Chamet Today
            </Button>
          </div>
        </div>
      </ModalBackdrop>
    </section>
  );
};
