"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AgencyStory } from "@/data/stories";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Sparkles,
  Award,
  Radio,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryViewerModalProps {
  stories: AgencyStory[];
  initialStoryId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectAgency?: (agencyId: string) => void;
}

const STORY_DURATION = 8000; // 8 seconds per story

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStoryId,
  isOpen,
  onClose,
  onSelectAgency,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync initial story
  useEffect(() => {
    if (initialStoryId) {
      const idx = stories.findIndex((s) => s.id === initialStoryId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
    setProgress(0);
  }, [initialStoryId, stories, isOpen]);

  const currentStory = stories[currentIndex] || stories[0];

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset video playback on close
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Progress timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = 50; // update every 50ms
    const step = (interval / STORY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, handleNext]);

  // Pause / play video when paused state changes
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
  }, [isPaused, currentIndex]);

  if (!isOpen || !currentStory) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-xl">
        {/* Click outside to close (desktop) */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md h-[100dvh] sm:h-[86vh] max-h-[880px] bg-[#0E0620] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/60 border border-purple-500/20 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Progress Bars */}
          <div className="absolute top-0 inset-x-0 z-30 p-3 pt-3 flex gap-1.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            {stories.map((story, idx) => (
              <div
                key={story.id}
                className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden cursor-pointer"
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-brand-pink via-purple-400 to-brand-gold transition-all duration-75"
                  style={{
                    width:
                      idx < currentIndex
                        ? "100%"
                        : idx === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Info */}
          <div className="absolute top-6 inset-x-0 z-30 px-4 py-2 flex items-center justify-between text-white bg-gradient-to-b from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onSelectAgency) onSelectAgency(currentStory.agencyId);
                  onClose();
                }}
                className="flex items-center gap-2 text-left group"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-tr ${currentStory.creatorAvatarBg} p-0.5 shadow-md flex items-center justify-center font-bold text-xs ring-2 ring-brand-pink`}
                >
                  <span className="text-white font-extrabold">
                    {currentStory.creatorInitials}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm tracking-wide text-white group-hover:text-brand-pink transition-colors">
                      {currentStory.creatorName}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-purple/60 border border-purple-400/40 text-purple-200">
                      {currentStory.agencyName}
                    </span>
                  </div>
                  <div className="text-[11px] text-purple-200/80 flex items-center gap-2">
                    <span>{currentStory.timestamp}</span>
                    <span>•</span>
                    <span className="text-brand-gold font-semibold">
                      {currentStory.category}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>

              {currentStory.mediaType === "video" && (
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Media Showcase (Video or Image) */}
          <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
            {currentStory.mediaType === "video" ? (
              <video
                ref={videoRef}
                src={currentStory.mediaUrl}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={currentStory.coverImage}
                  alt={currentStory.storyTitle}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            )}

            {/* Gradient Overlay for bottom text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

            {/* Left / Right Click Areas for quick story skipping */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-20 bottom-32 w-1/4 z-20 cursor-pointer opacity-0 hover:opacity-100 flex items-center justify-start pl-3 text-white/70 transition-opacity disabled:cursor-default"
              aria-label="Previous Story"
            >
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 top-20 bottom-32 w-1/4 z-20 cursor-pointer opacity-0 hover:opacity-100 flex items-center justify-end pr-3 text-white/70 transition-opacity"
              aria-label="Next Story"
            >
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>
          </div>

          {/* Bottom Story Caption & Actions */}
          <div className="relative z-30 p-5 bg-[#0C051B] border-t border-purple-500/20 text-white space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                {currentStory.keyMetric}
              </span>
              <div className="flex items-center gap-3 text-xs text-purple-300">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  {currentStory.views}
                </span>
                <button
                  type="button"
                  onClick={() => setHasLiked((l) => !l)}
                  className={`flex items-center gap-1 transition-colors ${
                    hasLiked ? "text-pink-500 font-bold" : "text-purple-300 hover:text-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-current" : ""}`} />
                  {hasLiked ? "Liked!" : currentStory.likes}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                {currentStory.storyTitle}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-purple-200/90 leading-relaxed line-clamp-3">
                {currentStory.fullNarrative}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (onSelectAgency) onSelectAgency(currentStory.agencyId);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-900/40 hover:opacity-95 transition-opacity text-center"
              >
                View {currentStory.agencyName} Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
