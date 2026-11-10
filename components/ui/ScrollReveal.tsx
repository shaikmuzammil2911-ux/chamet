"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useModals } from "@/components/providers/ModalContext";
import { ArrowUp, Play, Sparkles, MessageCircle } from "lucide-react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Reusable GPU-accelerated Framer Motion scroll reveal wrapper.
 * Automatically animates sections and cards smoothly into view as the user scrolls.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.55,
  className = "",
  once = true,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 36, x: 0, scale: 1 };
      case "down":
        return { opacity: 0, y: -36, x: 0, scale: 1 };
      case "left":
        return { opacity: 0, x: 40, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: -40, y: 0, scale: 1 };
      case "scale":
        return { opacity: 0, scale: 0.92, y: 16, x: 0 };
      case "none":
        return { opacity: 0, y: 0, x: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Sleek fixed top gradient scroll progress bar + floating quick-action popup dock
 */
export const SiteScrollEffects: React.FC = () => {
  const pathname = usePathname();
  const { openGetStarted, openVideo, openInquiry } = useModals();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFloating(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8500FF] via-[#FF29D6] to-[#FFC83D] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(255,41,214,0.75)]"
      />

      {/* Floating Bottom-Right Quick Popup Dock & Back-to-Top */}
      <AnimatePresence>
        {showFloating && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5"
          >
            {/* Quick Popups Pill Stack */}
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#15062C]/90 border border-purple-500/40 backdrop-blur-xl shadow-2xl shadow-purple-950/80">
              <button
                type="button"
                onClick={openVideo}
                title="Watch Chamet Video"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-purple-900/60 hover:bg-brand-purple text-white text-xs font-bold transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 text-brand-gold fill-current" />
                <span className="hidden sm:inline">Watch</span>
              </button>

              <button
                type="button"
                onClick={() => openInquiry("Quick Floating Inquiry")}
                title="Quick Contact Popup"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-brand-pink/30 text-white text-xs font-bold transition-all hover:scale-105"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-pink" />
                <span className="hidden sm:inline">Inquire</span>
              </button>

              <button
                type="button"
                onClick={openGetStarted}
                title="Join Chamet Now"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#FFC83D] to-[#FF9D00] text-[#26005F] text-xs font-black shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Now</span>
              </button>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
                title="Back to top"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all hover:scale-110"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
