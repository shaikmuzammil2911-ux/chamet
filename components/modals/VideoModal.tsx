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
  Film,
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Stop and reset playback whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      setHasError(false);
      setIsLoading(true);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Space to play/pause, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setHasError(true));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      videoRef.current.muted = vol === 0;
      setIsMuted(vol === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="Discover ManaVerse & Chamet"
      badge="Official Media Showcase"
      maxWidth="3xl"
    >
      <div className="space-y-4">
        {/* Real HTML5 Video Player Container */}
        <div
          ref={containerRef}
          className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-500/40 flex items-center justify-center group shadow-2xl"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src="/videos/chamet-showcase.mp4"
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Big Play Overlay (when paused) */}
          {!isPlaying && !hasError && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity z-10"
            >
              <button
                type="button"
                aria-label="Play Video"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFC83D] to-[#FFA751] flex items-center justify-center text-[#26005F] shadow-2xl shadow-amber-500/60 transform hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
              </button>
              <span className="text-white text-xs sm:text-sm font-bold mt-3 drop-shadow-md">
                Click to Watch Platform Showcase
              </span>
            </div>
          )}

          {/* Error fallback state */}
          {hasError && (
            <div className="absolute inset-0 bg-[#0F0624] flex flex-col items-center justify-center p-6 text-center z-10">
              <Film className="w-10 h-10 text-brand-pink mb-2" />
              <p className="text-sm font-bold text-white">Chamet Video Media Ready</p>
              <p className="text-xs text-purple-200/70 mt-1 max-w-sm">
                Place any company video in <code className="text-brand-gold">public/videos/chamet-showcase.mp4</code>.
              </p>
              <Button
                variant="purple"
                size="sm"
                className="mt-3"
                onClick={() => {
                  setHasError(false);
                  videoRef.current?.load();
                }}
              >
                Retry Playback
              </Button>
            </div>
          )}

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2 z-20">
            {/* Progress Scrubber */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Video seek bar"
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-brand-gold"
            />

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="hover:text-brand-gold transition-colors p-1"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}
                  aria-label="Replay"
                  className="hover:text-brand-gold transition-colors p-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="hover:text-brand-gold transition-colors p-1"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="w-14 sm:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                  />
                </div>

                {/* Time Display */}
                <span className="text-[11px] font-mono text-purple-200">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-purple-200">
                  <Radio className="w-3 h-3 text-rose-400 animate-pulse" />
                  HD 1080p
                </span>
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  className="hover:text-brand-gold transition-colors p-1"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
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
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
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
    </ModalBackdrop>
  );
};
