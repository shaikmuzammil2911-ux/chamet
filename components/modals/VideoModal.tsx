"use client";

import React from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { Play, Sparkles, Radio, Users, ShieldCheck } from "lucide-react";

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
  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="Discover ManaVerse Experience"
      badge="Platform Showcase"
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {/* Cinematic Video Player Container */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0B0314] border border-purple-500/30 flex items-center justify-center group shadow-2xl">
          {/* Animated Ambient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8500FF]/40 via-[#176BFF]/30 to-[#FF29D6]/30 animate-pulse-slow" />

          {/* Interactive Player Mockup */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FFC83D] to-[#FFA751] flex items-center justify-center text-[#26005F] shadow-xl shadow-amber-500/40 transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white mt-4">
              11 Years of Digital Entertainment
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-1">
              Explore how ManaVerse & Chamet empower hosts globally with live streaming, interactive party rooms, and safe earnings.
            </p>
          </div>

          {/* Bottom Video Progress bar & Controls simulation */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-xs text-purple-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Chamet Global Media Tour
            </span>
            <span className="text-[11px] text-purple-300">ManaVerse Pvt. Ltd.</span>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-brand-gold shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Interactive Gifts</div>
              <div className="text-[11px] text-purple-300/80">3D visual spectacles</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-pink shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Global Community</div>
              <div className="text-[11px] text-purple-300/80">Millions connected</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Reliable Payouts</div>
              <div className="text-[11px] text-purple-300/80">Safe & secure earnings</div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
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
