"use client";

import React, { useState } from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";
import { Radio, Heart, ShoppingBag, Gamepad2, ArrowRight, MessageCircle, Phone, CheckCircle2 } from "lucide-react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: (subject?: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracks = [
    {
      id: "host",
      title: "Become a Live Host / Streamer",
      desc: "Stream your talent, host voice rooms, and earn through gifts and bonuses.",
      icon: Radio,
      badge: "High Income",
      color: "from-purple-600 to-pink-500",
    },
    {
      id: "social",
      title: "Meet Friends & Connect",
      desc: "Explore party playrooms, video chats, and meet verified friends worldwide.",
      icon: Heart,
      badge: "Social",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "gaming",
      title: "Voice Party & Gaming",
      desc: "Host audio party rooms, play casual games, and hang out with communities.",
      icon: Gamepad2,
      badge: "Interactive",
      color: "from-amber-500 to-purple-600",
    },
    {
      id: "agency",
      title: "Agency / Merchant Partnership",
      desc: "Manage host rosters or list e-commerce products for live streaming sales.",
      icon: ShoppingBag,
      badge: "Business",
      color: "from-blue-600 to-cyan-500",
    },
  ];

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title="Get Started with ManaVerse"
      badge="Welcome to Chamet"
      maxWidth="xl"
    >
      <div className="space-y-5">
        <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
          Select what you would like to explore today on ManaVerse Technologies Pvt. Ltd.:
        </p>

        {/* Tracks List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tracks.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.id;
            return (
              <div
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-purple-900/60 to-purple-950/80 border-brand-gold shadow-lg shadow-amber-500/10"
                    : "bg-white/[0.04] border-white/10 hover:border-purple-400/40 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${track.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-purple-200 border border-white/10">
                    {track.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {track.title}
                </h4>
                <p className="text-xs text-purple-200/70 leading-relaxed">
                  {track.desc}
                </p>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-brand-gold">
                    <CheckCircle2 className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp & Phone Quick Action */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-purple-200 text-center sm:text-left">
            Prefer direct onboarding assistance?
          </div>
          <div className="flex items-center gap-2">
            <a
              href={COMPANY.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-xs font-bold shadow hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Help
            </a>
            <a
              href={COMPANY.contact.phoneTel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600/40 hover:bg-purple-600/60 text-white text-xs font-bold border border-purple-400/40 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Office
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => {
              onClose();
              if (onOpenInquiry) {
                const sub = selectedTrack
                  ? `Onboarding as: ${selectedTrack.toUpperCase()}`
                  : "Onboarding Inquiries";
                onOpenInquiry(sub);
              }
            }}
            withArrow
          >
            Continue
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};

