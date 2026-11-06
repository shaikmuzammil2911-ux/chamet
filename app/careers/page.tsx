"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useModals } from "@/components/providers/ModalContext";
import {
  Briefcase,
  Sparkles,
  Heart,
  Globe2,
  TrendingUp,
  Cpu,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function CareersPage() {
  const { openCareer } = useModals();

  const benefits = [
    {
      title: "Global Hybrid Flexibility",
      desc: "Work with colleagues across London and Bengaluru with modern hybrid arrangements and collaborative workflows.",
      icon: Globe2,
    },
    {
      title: "Cutting-Edge Real-Time Media",
      desc: "Architect low-latency WebRTC pipelines, 3D gift animation engines, and AI-powered community moderation systems.",
      icon: Cpu,
    },
    {
      title: "Impact on Real Lives",
      desc: "Directly support a social mission that provides life-changing economic support to thousands of women creators.",
      icon: Heart,
    },
    {
      title: "Competitive Compensation & Growth",
      desc: "Merit-focused annual reviews, performance bonuses, and continuous learning allowances.",
      icon: TrendingUp,
    },
  ];

  const functionalAreas = [
    {
      area: "Real-Time Streaming & Cloud Infrastructure",
      desc: "WebRTC engineers, Go/Node backends, distributed Redis caches, video encoding specialists.",
      badge: "Engineering",
    },
    {
      area: "Frontend & Mobile Experience",
      desc: "React, Next.js, React Native, and WebGL developers building micro-interactions and gift physics.",
      badge: "Product",
    },
    {
      area: "Creator Relations & Host Management",
      desc: "Multilingual host managers, talent acquisition coordinators, and streamer coaches.",
      badge: "Operations",
    },
    {
      area: "Community Integrity & Safety Operations",
      desc: "AI policy specialists, trust & safety auditors, and platform compliance managers.",
      badge: "Trust & Safety",
    },
  ];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-4 backdrop-blur-md">
          <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
          <span>Careers at ManaVerse</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Build the Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
            Global Digital Entertainment
          </span>
        </h1>

        <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-3">
          Join a passionate international team building high-performance media technology that connects millions and creates genuine livelihood opportunities.
        </p>

        <div className="pt-6">
          <Button
            variant="gold"
            size="lg"
            onClick={() => openCareer("General Expression of Interest")}
            withArrow
          >
            Submit Expression of Interest
          </Button>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Work With ManaVerse
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1.5">
            A high-energy, respectful environment centered on innovation and human dignity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <GlassCard key={i} glowColor="purple" className="p-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white mb-4 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {b.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Functional Talent Areas */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
            Talent Expression Areas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Where You Can Make An Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {functionalAreas.map((area, idx) => (
            <GlassCard
              key={idx}
              glowColor="pink"
              className="p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-brand-pink border border-white/10">
                    {area.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{area.area}</h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {area.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-purple-300">Open Roster Review</span>
                <button
                  type="button"
                  onClick={() => openCareer(area.area)}
                  className="text-xs font-bold text-brand-gold hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Apply for this Area</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Application Bottom CTA */}
      <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#210940] via-brand-deep to-[#14062B] border border-purple-500/40 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Take Your Career to the Next Level?
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mx-auto">
            Attach your resume and tell us where your talents shine best. Our talent team evaluates candidates across all departments.
          </p>
          <div className="pt-2">
            <Button
              variant="gold"
              size="lg"
              onClick={() => openCareer("Open Application")}
              withArrow
            >
              Submit Application
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
