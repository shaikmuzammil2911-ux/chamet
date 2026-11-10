"use client";

import React from "react";
import { Trophy, Users, Globe, ShieldCheck } from "lucide-react";
import { TypewriterNumber } from "@/components/ui/TypewriterNumber";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      numeric: "11+",
      label: "Years of Excellence",
      icon: Trophy,
      color: "text-brand-gold",
      bgGradient: "from-amber-500/20 to-purple-950/40",
    },
    {
      numeric: "Millions",
      label: "Happy Users",
      icon: Users,
      color: "text-brand-pink",
      bgGradient: "from-pink-500/20 to-purple-950/40",
    },
    {
      numeric: "150+",
      label: "Countries Connected",
      icon: Globe,
      color: "text-brand-blue",
      bgGradient: "from-blue-500/20 to-purple-950/40",
    },
    {
      numeric: "100%",
      label: "Platform Trust",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bgGradient: "from-emerald-500/20 to-purple-950/40",
    },
  ];

  return (
    <section className="relative z-20 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up">
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#180633]/90 to-blue-950/70 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left 4 Stats with Typing Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 flex-1 w-full divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center pt-4 sm:pt-0 sm:px-4 group"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.bgGradient} border border-white/10 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    <TypewriterNumber value={stat.numeric} duration={1500} />
                  </span>
                  <span className="text-xs text-purple-200/80 font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Signature Motto */}
          <div className="lg:pl-8 lg:border-l border-white/10 text-center lg:text-right shrink-0">
            <div className="text-2xl sm:text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
              Together for a <br className="hidden sm:inline" />
              Better Tomorrow
            </div>
            <span className="text-[11px] uppercase tracking-widest text-purple-300/70 font-semibold mt-1 block">
              ManaVerse Technologies Pvt. Ltd.
            </span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
