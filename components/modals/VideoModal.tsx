"use client";

import React, { useState, useRef, useEffect } from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Radio,
  Users,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreServices?: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  onExploreServices,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [currentTime, setCurrentTime] = useState("0:18");
  const totalDuration = "2:15";
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop playback when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Simulate progress when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          const seconds = Math.floor((next / 100) * 135);
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          setCurrentTime(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
          return next;
        });
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="Discover ManaVerse & Chamet"
      badge="Official Platform Showcase"
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {/* Cinematic Video Player Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0A0216] border border-purple-500/30 flex items-center justify-center group shadow-2xl">
          {/* Animated Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8500FF]/50 via-[#176BFF]/30 to-[#FF29D6]/40 animate-pulse-slow" />

          {/* Central Play/Pause Button and Brand Preview */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFC83D] to-[#FFA751] flex items-center justify-center text-[#26005F] shadow-2xl shadow-amber-500/50 transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
              ) : (
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
              )}
            </button>

            <h4 className="text-lg sm:text-xl font-extrabold text-white mt-4 drop-shadow-md">
              {isPlaying ? "Playing: Chamet Global Media Showcase" : "11 Years of Digital Entertainment"}
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-1 max-w-sm">
              Discover how ManaVerse connects millions with live streaming, 3D interactive party rooms, and verified host earnings.
            </p>
          </div>

          {/* Bottom Interactive Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2 z-20">
            {/* Progress Scrubber */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
              <div
                className="bg-gradient-to-r from-brand-gold to-brand-pink h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between text-xs text-purple-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setCurrentTime("0:00");
                  }}
                  className="hover:text-white transition-colors"
                  title="Replay"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-purple-300">
                  {currentTime} / {totalDuration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 font-semibold text-xs">
                  <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  Official Chamet HD Media
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-gold shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Interactive 3D Gifts</div>
              <div className="text-[11px] text-purple-300/80">Real-time reward effects</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-pink shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Global Community</div>
              <div className="text-[11px] text-purple-300/80">150+ countries connected</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Reliable Host Earnings</div>
              <div className="text-[11px] text-purple-300/80">Safe & dependable payouts</div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-[11px] text-purple-300/70">
            Note: Place your company MP4 in <code className="text-purple-200">public/videos/</code> anytime to link custom media.
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            {onExploreServices && (
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  onClose();
                  onExploreServices();
                }}
                withArrow
              >
                Explore Services
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};
