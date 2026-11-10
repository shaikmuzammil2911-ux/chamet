"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Handshake,
  Crown,
  Users,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ModalBackdrop } from "@/components/modals/ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { useModals } from "@/components/providers/ModalContext";

const HIGHLIGHTS = [
  {
    title: "Safe & Secure",
    icon: ShieldCheck,
    color: "from-blue-400 to-indigo-500",
    desc: "Enterprise-grade encryption, verified human identity onboarding, and 24/7 AI + human moderation keep every interaction respectful and protected.",
  },
  {
    title: "Trust & Transparency",
    icon: Handshake,
    color: "from-amber-400 to-orange-500",
    desc: "Clear operational guidelines, real-time analytics dashboards, and transparent creator compensation structures with zero hidden deductions.",
  },
  {
    title: "Reliable Income Opportunities",
    icon: Crown,
    color: "from-yellow-300 to-amber-500",
    desc: "Earn consistently through interactive livestreaming, multi-seat audio party rooms, creator contests, and punctual weekly disbursements.",
  },
  {
    title: "Equal Opportunities for Everyone",
    icon: Users,
    color: "from-pink-400 to-purple-500",
    desc: "Designed to welcome creators and broadcasters globally across all skill levels with dedicated onboarding mentorship.",
  },
  {
    title: "Supporting Families and Communities",
    icon: Heart,
    color: "from-rose-400 to-pink-600",
    desc: "Empowering women hosts and everyday households with sustainable flexible livelihoods from the safety of home.",
  },
];

export const HighlightsBar: React.FC = () => {
  const [selectedHighlight, setSelectedHighlight] = useState<(typeof HIGHLIGHTS)[number] | null>(null);
  const { openGetStarted } = useModals();

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up" delay={0.05}>
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#1A0738]/80 to-purple-950/60 backdrop-blur-xl border border-purple-500/30 p-3 sm:p-5 shadow-2xl shadow-purple-950/80">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {HIGHLIGHTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedHighlight(item)}
                  className={`flex flex-col items-center text-center p-3 sm:p-2 group transition-transform duration-300 hover:-translate-y-1 cursor-pointer ${
                    index === 4 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 mb-2.5 shadow-md shadow-purple-950/50 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full rounded-[14px] bg-[#120426] flex items-center justify-center text-white">
                      <Icon className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Highlight Pillar Detail Popup */}
      <ModalBackdrop
        isOpen={!!selectedHighlight}
        onClose={() => setSelectedHighlight(null)}
        title={selectedHighlight?.title}
        badge="ManaVerse Commitment"
        maxWidth="md"
      >
        {selectedHighlight && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-purple-100 leading-relaxed">
                {selectedHighlight.desc}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedHighlight(null)}>
                Close
              </Button>
              <Button
                variant="gold"
                size="sm"
                withArrow
                onClick={() => {
                  setSelectedHighlight(null);
                  openGetStarted();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </ModalBackdrop>
    </section>
  );
};
