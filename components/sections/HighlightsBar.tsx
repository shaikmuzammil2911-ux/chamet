"use client";

import React from "react";
import {
  ShieldCheck,
  Handshake,
  Crown,
  Users,
  Heart,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const HIGHLIGHTS = [
  {
    title: "Safe & Secure",
    icon: ShieldCheck,
    color: "from-blue-400 to-indigo-500",
  },
  {
    title: "Trust & Transparency",
    icon: Handshake,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Reliable Income Opportunities",
    icon: Crown,
    color: "from-yellow-300 to-amber-500",
  },
  {
    title: "Equal Opportunities for Everyone",
    icon: Users,
    color: "from-pink-400 to-purple-500",
  },
  {
    title: "Supporting Families and Communities",
    icon: Heart,
    color: "from-rose-400 to-pink-600",
  },
];

export const HighlightsBar: React.FC = () => {
  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#1A0738]/80 to-purple-950/60 backdrop-blur-xl border border-purple-500/30 p-3 sm:p-5 shadow-2xl shadow-purple-950/80">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center p-3 sm:p-2 group transition-transform duration-300 hover:-translate-y-0.5 ${
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
    </section>
  );
};

