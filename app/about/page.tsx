"use client";

import React from "react";
import Image from "next/image";
import { COMPANY } from "@/data/company";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { StatsBanner } from "@/components/sections/StatsBanner";
import { useModals } from "@/components/providers/ModalContext";
import {
  Sparkles,
  Trophy,
  HeartHandshake,
  ShieldCheck,
  Building2,
  Compass,
  CheckCircle2,
  Users,
  Target,
} from "lucide-react";

export default function AboutPage() {
  const { openGetStarted, openInquiry } = useModals();

  const milestones = [
    {
      year: "11 Years Ago",
      title: "Foundations in Digital Entertainment",
      description:
        "ManaVerse was established with the vision of crafting interactive digital spaces where people from across the globe could meet, celebrate culture, and entertain safely.",
    },
    {
      year: "Platform Evolution",
      title: "Launch of Real-Time Video & Voice Lounges",
      description:
        "Engineered proprietary low-latency WebRTC streaming infrastructure to support thousands of concurrent multi-seat voice rooms and video broadcasts.",
    },
    {
      year: "Host Empowerment Focus",
      title: "Pioneering Sustainable Host Earning Channels",
      description:
        "Introduced structured host reward programs with reliable, transparent payouts — opening life-changing earning avenues for women and individuals from home.",
    },
    {
      year: "Global Expansion",
      title: "Dual Presence: UK Headquarters & Bengaluru Center",
      description:
        "Established dedicated technology development in Bengaluru, Karnataka while directing international operations from London, UK.",
    },
  ];

  const philosophies = [
    {
      title: "Creator-Centric Prosperity",
      desc: "We believe an entertainment platform is only as strong as its community of hosts. Our compensation systems prioritize fairness, timeliness, and transparency.",
      icon: HeartHandshake,
    },
    {
      title: "Safety as an Absolute Priority",
      desc: "Entertainment must be safe and respectful. We continuously upgrade human-moderation workflows and AI safety shields to safeguard all participants.",
      icon: ShieldCheck,
    },
    {
      title: "Uncompromising Media Quality",
      desc: "Crystal-clear audio, zero perceptible video lag, and immersive 3D visual rewards turn digital conversations into unforgettable social events.",
      icon: Compass,
    },
  ];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Top Hero Section for About Page */}
      <section className="relative py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5 text-brand-gold" />
            <span>11 Years of Corporate Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Connecting Cultures, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
              Empowering Global Hosts
            </span>
          </h1>

          <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            ManaVerse Technologies Pvt. Ltd. is a digital entertainment and interactive technology leader dedicated to creating joyful social connections and genuine financial opportunities.
          </p>
        </div>
      </section>

      {/* Core Company Overview */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Our Journey & Purpose
            </h2>
            <p className="text-purple-200/90 text-sm sm:text-base leading-relaxed">
              With 11 years of deep experience in digital media, live streaming systems, and social networking dynamics, ManaVerse Technologies Pvt. Ltd. has shaped platforms where human warmth meets digital entertainment.
            </p>
            <p className="text-purple-200/90 text-sm sm:text-base leading-relaxed">
              Our flagship brand, <strong className="text-brand-pink">Chamet</strong>, serves as an inclusive global stage. Whether an individual is broadcasting their musical talents, hosting a 12-seat late-night audio party, playing games with friends, or meeting verified companions, ManaVerse delivers high-fidelity social engagement.
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-brand-royal/40 border border-purple-500/30">
              <h4 className="text-sm font-bold text-brand-gold mb-1 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Special Focus on Women Host Empowerment
              </h4>
              <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
                {COMPANY.mission}
              </p>
            </div>
          </div>

          {/* Quick Pillars Right Card */}
          <div className="lg:col-span-5 space-y-3">
            <GlassCard glowColor="purple" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                What Sets ManaVerse Apart
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-purple-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>11 Years Proven Stability:</strong> Long-standing operational excellence and trusted creator relationships.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-purple-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Safe & Respectful Moderation:</strong> Zero-tolerance policies for harassment, protected by round-the-clock moderation.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-purple-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>On-Time Host Disbursements:</strong> Dependable payout rails ensuring creators receive their full verified earnings.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-xs sm:text-sm text-purple-100/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>International Standards:</strong> Compliance across UK European regulations and Indian corporate laws.
                  </span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Verified Stats */}
      <StatsBanner />

      {/* Milestones / Our Journey Timeline */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Evolutionary Milestones
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-2">
            A decade-plus track record of continuous innovation in interactive entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <GlassCard
              key={idx}
              glowColor="gold"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-brand-gold px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 inline-block mb-3">
                  {m.year}
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Our Guiding Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((phi, i) => {
            const Icon = phi.icon;
            return (
              <GlassCard key={i} glowColor="pink" className="p-6 sm:p-7">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white mb-4 shadow-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{phi.title}</h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {phi.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-brand-deep to-indigo-950 border border-purple-500/40 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Join the ManaVerse Community Today
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mx-auto">
            Whether you want to become a verified live host, partner your agency, or experience world-class party rooms, we welcome you.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button variant="gold" size="md" onClick={openGetStarted} withArrow>
              Get Started Now
            </Button>
            <Button variant="outline" size="md" onClick={() => openInquiry("Partnership Inquiry")}>
              Contact Our Directors
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
