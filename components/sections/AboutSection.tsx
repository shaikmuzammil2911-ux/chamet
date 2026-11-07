"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { COMPANY } from "@/data/company";
import { TypewriterNumber } from "@/components/ui/TypewriterNumber";
import {
  Sparkles,
  Eye,
  Target,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Glow ribbons */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-pink/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & Mission Narrative */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/50 text-purple-200 text-xs sm:text-sm font-bold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <span>About ManaVerse</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Innovating Entertainment, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
                Empowering Lives
              </span>
            </h2>

            {/* Description */}
            <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg leading-relaxed">
              ManaVerse Technologies Pvt. Ltd. has{" "}
              <strong className="text-brand-gold font-bold">
                <TypewriterNumber value="11" suffix=" Years" duration={1200} />
              </strong>{" "}
              of experience in delivering innovative digital entertainment and earning opportunities. Our mission is to create a safe, secure, and reliable platform, especially for women hosts and individuals who need financial support.
            </p>

            {/* Core Mission Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/40 border border-purple-500/30 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-pink to-brand-purple flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Dedicated to Sustainable Host Livelihoods
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                    {COMPANY.mission}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <TypewriterNumber value="11" suffix="+" duration={1000} /> Years of Entertainment Excellence
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Predictable, Safe & Timely Payouts</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Global High-Definition Streaming Network</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>UK & Bengaluru Corporate Presence</span>
              </div>
            </div>

            {/* CTA Link to About Page */}
            <div className="pt-2">
              <Button variant="gold" size="md" href="/about" withArrow>
                Learn More About Our Journey
              </Button>
            </div>
          </div>

          {/* Right Column: Vision & Mission Interactive Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Vision Card */}
            <GlassCard
              glowColor="purple"
              className="p-6 relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-blue flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-brand-gold">
                    Future Outlook
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5 mb-2">
                    Our Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100/85 leading-relaxed">
                    {COMPANY.vision}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Mission Card */}
            <GlassCard
              glowColor="pink"
              className="p-6 relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-pink to-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-900/50 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-brand-pink">
                    Guiding Purpose
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100/85 leading-relaxed">
                    {COMPANY.mission}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Experience Badge Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#26005F] to-[#140B79] border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-white">
                  <TypewriterNumber value="11" suffix="+ Years" duration={1200} />
                </div>
                <div className="text-xs text-purple-200/80">Of Innovation & Community Trust</div>
              </div>
              <Link
                href="/vision"
                className="text-xs font-bold text-brand-gold hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Read Full Vision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
