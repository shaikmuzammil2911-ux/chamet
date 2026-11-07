"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  ShieldAlert,
  TrendingUp,
  Sparkles,
  Heart,
  Award,
  Smile,
  CheckCircle,
} from "lucide-react";

const FEATURES = [
  {
    title: "Safe & Secure Platform",
    desc: "Robust 24/7 AI moderation, strict privacy controls, and human safety specialists ensure a respectful and secure community for every participant.",
    icon: ShieldAlert,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Multiple Earning Opportunities",
    desc: "Diverse revenue streams including interactive live gifts, audio party host rewards, casual game leaderboards, and e-commerce creator commissions.",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Fun & Engaging Experience",
    desc: "Lag-free HD video broadcasting, 3D animated virtual gifts, collaborative multi-seat party rooms, and synchronous casual games keep audiences entertained.",
    icon: Sparkles,
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Support for Families",
    desc: "A core social mission focused on equipping hosts and household breadwinners with flexible, reliable earning avenues from the comfort and safety of home.",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Equal Opportunities",
    desc: "Open to motivated individuals worldwide. Whether you are an experienced live broadcaster or just starting out, our tools provide fair exposure.",
    icon: Award,
    color: "from-violet-500 to-purple-700",
  },
  {
    title: "A Better & Happier Life",
    desc: "Transcending borders to connect real people, foster supportive friendships, share uplifting moments, and nurture inspiring life journeys.",
    icon: Smile,
    color: "from-emerald-400 to-teal-600",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#14052E]/50 to-transparent">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold mb-3 backdrop-blur-md">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Why Choose ManaVerse</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            More Than Just Entertainment
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed">
            Our platform makes entertainment simple and enjoyable for everyone. Hosts can explore opportunities to earn and support their families financially.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={index}
                glowColor={
                  index % 3 === 0
                    ? "purple"
                    : index % 3 === 1
                    ? "pink"
                    : "gold"
                }
                className="p-6 sm:p-7 flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full rounded-[14px] bg-[#140628] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-purple-300/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                  <span>ManaVerse Standard</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

