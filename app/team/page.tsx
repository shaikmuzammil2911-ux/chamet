"use client";

import React from "react";
import { TeamSection } from "@/components/sections/TeamSection";
import { useModals } from "@/components/providers/ModalContext";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Users,
  ShieldCheck,
  HeartHandshake,
  Compass,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function TeamPage() {
  const { openInquiry, openCareer } = useModals();

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-4 backdrop-blur-md">
          <Users className="w-3.5 h-3.5 text-brand-gold" />
          <span>Our People & Leadership</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          The Leadership Driving <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
            ManaVerse Innovation
          </span>
        </h1>

        <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-3">
          Behind Chamet and ManaVerse Technologies Pvt. Ltd. is a dedicated international group of media streaming engineers, operations executives, and community safety advocates.
        </p>
      </section>

      {/* Main Interactive Team Grid with Department Filters */}
      <TeamSection isFullPage={true} onOpenInquiry={openInquiry} />

      {/* Department Culture Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Our Departmental Operating Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard glowColor="purple" className="p-6 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-brand-purple mb-4">
              <Compass className="w-5 h-5 text-brand-gold" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Technology & Streaming RTC
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Maintains sub-second video and voice latency worldwide through global edge servers and advanced video compression.
            </p>
          </GlassCard>

          <GlassCard glowColor="pink" className="p-6 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-pink-600/30 flex items-center justify-center text-brand-pink mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Creator Operations & Host Care
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Hands-on onboarding and multilingual support for women hosts and creators, ensuring predictable, reliable financial growth.
            </p>
          </GlassCard>

          <GlassCard glowColor="gold" className="p-6 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 flex items-center justify-center text-brand-gold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Trust, Safety & Compliance
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
              Enforcing international anti-harassment safeguards, profile authentication, and regulatory adherence across the UK and India.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Careers Banner */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-[#1D0838] to-indigo-950 border border-purple-500/40 shadow-2xl space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Want to Build the Future of Entertainment?
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mx-auto">
            We are always looking for ambitious frontend engineers, media architects, creator managers, and safety specialists.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="gold"
              size="md"
              onClick={() => openCareer("General Engineering / Operations")}
              withArrow
            >
              Apply to Join Team
            </Button>
            <Button
              variant="outline"
              size="md"
              href="/careers"
            >
              Explore Careers
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
