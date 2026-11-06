"use client";

import React from "react";
import { COMPANY } from "@/data/company";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useModals } from "@/components/providers/ModalContext";
import {
  Eye,
  Target,
  ShieldCheck,
  Handshake,
  Coins,
  Users,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function VisionMissionPage() {
  const { openGetStarted, openInquiry } = useModals();

  const coreValues = [
    {
      title: "Safety and Security",
      desc: "Protecting host privacy, biometric safety, encrypted data transmission, and a zero-tolerance moderation policy against inappropriate behavior.",
      icon: ShieldCheck,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Trust and Transparency",
      desc: "Clear host accounting, fair conversion rates for virtual gifts, and open communication channels between community hosts and management.",
      icon: Handshake,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Reliable Income Opportunities",
      desc: "Punctual weekly/monthly payout cycles enabling women hosts and creators to plan household finances with confidence and stability.",
      icon: Coins,
      color: "from-yellow-400 to-amber-500",
    },
    {
      title: "Equal Opportunities for Everyone",
      desc: "An inclusive platform where merit, charisma, and talent are celebrated without prejudice toward geography or background.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Supporting Families & Communities",
      desc: "Transforming online entertainment into real-world social upliftment, providing vital financial relief for households and families.",
      icon: HeartHandshake,
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Header */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Our Vision, Mission & Values</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Purpose-Driven <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
            Digital Entertainment
          </span>
        </h1>

        <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-3">
          At ManaVerse Technologies Pvt. Ltd., we believe digital entertainment reaches its highest potential when it empowers real people with dignity and economic independence.
        </p>
      </section>

      {/* Vision & Mission Two Grand Cards */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <GlassCard
            glowColor="purple"
            className="p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center text-white mb-6 shadow-xl shadow-purple-900/50">
                <Eye className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-gold block mb-1">
                Strategic Horizon
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Our Vision
              </h2>
              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
                {COMPANY.vision}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-purple-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>Innovating Entertainment Ecosystems</span>
            </div>
          </GlassCard>

          {/* Mission */}
          <GlassCard
            glowColor="pink"
            className="p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-pink to-rose-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-900/50">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-pink block mb-1">
                Core Responsibility
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed">
                {COMPANY.mission}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-purple-300 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
              <span>Empowering Women & Families Worldwide</span>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Principles We Stand By
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Our 5 Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <GlassCard
                key={idx}
                glowColor={idx % 2 === 0 ? "purple" : "gold"}
                className={`p-6 sm:p-7 flex flex-col justify-between ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.color} p-0.5 shadow-md mb-4`}
                  >
                    <div className="w-full h-full rounded-[14px] bg-[#140628] flex items-center justify-center text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-brand-deep to-indigo-950 border border-purple-500/40 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience the ManaVerse Difference
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mx-auto">
            Connect with millions of users and hosts across our global ecosystem.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button variant="gold" size="md" onClick={openGetStarted} withArrow>
              Join ManaVerse Now
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => openInquiry("Vision & Institutional Partnership")}
            >
              Contact Leadership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
