"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TOP_AGENCIES, Agency } from "@/data/agencies";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Star,
  Users,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TopAgenciesSectionProps {
  onSelectAgency: (agency: Agency) => void;
  onExploreStories: (agencyId: string) => void;
}

export const TopAgenciesSection: React.FC<TopAgenciesSectionProps> = ({
  onSelectAgency,
  onExploreStories,
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "broadcasting" | "voice" | "women">("all");

  const filteredAgencies = TOP_AGENCIES.filter((agency) => {
    if (activeTab === "broadcasting") return agency.id === "aurora-star-network";
    if (activeTab === "voice") return agency.id === "celestial-voice-collective";
    if (activeTab === "women") return agency.id === "phoenix-talent-alliance";
    return true;
  });

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#0B031E] via-[#12072B] to-[#0A021B] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-[140px] pointer-events-none" />

      <ScrollReveal direction="up" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Official Talent Guilds</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Top Agencies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-gold">
              Talent Networks
            </span>
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg leading-relaxed">
            Discover the leading agencies empowering creators, building communities, and bringing extraordinary live entertainment experiences to Chamet.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Agencies" },
              { id: "broadcasting", label: "Broadcaster Guilds" },
              { id: "voice", label: "Voice & Audio Lounges" },
              { id: "women", label: "Women Creator Collective" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-950/50"
                    : "bg-white/5 text-purple-300 hover:bg-white/10 hover:text-white border border-purple-500/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Agency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAgencies.map((agency) => (
            <motion.div
              key={agency.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full rounded-3xl bg-gradient-to-b from-[#180A36]/90 via-[#13072E]/90 to-[#0F0424]/95 border border-purple-500/25 shadow-xl shadow-purple-950/40 hover:border-purple-400/50 transition-all overflow-hidden group"
            >
              {/* Cover Image & Header */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-purple-950">
                <Image
                  src={agency.coverImage}
                  alt={agency.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180A36] via-[#180A36]/40 to-transparent" />

                {/* Floating Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-brand-gold text-purple-950 shadow-md">
                    {agency.badge}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{agency.activeLiveCount}</span>
                  </div>
                </div>

                {/* Agency Logo Floating Badge */}
                <div className="absolute bottom-3 left-4 z-10 flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${agency.accentColor} p-0.5 shadow-xl flex items-center justify-center text-2xl font-bold ring-2 ring-purple-400/40`}
                  >
                    <span>{agency.logo}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-lg font-black text-white drop-shadow-sm group-hover:text-purple-200 transition-colors">
                        {agency.name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
                    </div>
                    <span className="text-xs font-semibold text-purple-300 drop-shadow-sm">
                      {agency.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                {/* Tagline & Short Intro */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-brand-gold uppercase tracking-wide">
                    {agency.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed line-clamp-3">
                    {agency.description}
                  </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/5 border border-purple-500/15 text-center">
                  <div>
                    <div className="text-sm font-black text-white">
                      {agency.creatorsCount}
                    </div>
                    <div className="text-[10px] text-purple-300 font-medium">Creators</div>
                  </div>
                  <div className="border-x border-purple-500/20">
                    <div className="text-sm font-black text-brand-pink">
                      {agency.totalFollowers}
                    </div>
                    <div className="text-[10px] text-purple-300 font-medium">Followers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-sm font-black text-brand-gold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{agency.rating.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-purple-300 font-medium">Rating</div>
                  </div>
                </div>

                {/* Featured Creators Micro-Thumbnails */}
                <div className="flex items-center justify-between text-xs text-purple-300 pt-1">
                  <span className="font-semibold text-purple-200">Featured Stars:</span>
                  <div className="flex items-center -space-x-2">
                    {agency.featuredCreators.map((creator) => (
                      <div
                        key={creator.id}
                        title={`${creator.name} (${creator.role})`}
                        className={`w-7 h-7 rounded-full bg-gradient-to-tr ${creator.avatarBg} border-2 border-[#13072E] flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                      >
                        {creator.initials}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <Button
                    variant="purple"
                    size="sm"
                    className="w-full text-xs font-bold py-2.5"
                    onClick={() => onSelectAgency(agency)}
                  >
                    View Agency
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold py-2.5 border-purple-400/40 hover:bg-purple-900/40 text-purple-200 hover:text-white"
                    onClick={() => onExploreStories(agency.id)}
                  >
                    Explore Stories
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

