"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TOP_AGENCIES } from "@/data/agencies";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Radio,
  Star,
  Users,
  Sparkles,
  Heart,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface FeaturedAgencyCreatorsProps {
  onOpenInquiry?: (subject?: string) => void;
  onOpenGetStarted?: () => void;
}

export const FeaturedAgencyCreators: React.FC<FeaturedAgencyCreatorsProps> = ({
  onOpenInquiry,
  onOpenGetStarted,
}) => {
  const allAgencyCreators = TOP_AGENCIES.flatMap((agency) =>
    agency.featuredCreators.map((c) => ({
      ...c,
      agencyName: agency.name,
      agencyBadge: agency.badge,
    }))
  );

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#0A021B] to-[#100628] overflow-hidden border-t border-purple-500/15">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-brand-gold" />
              <span>Agency Talent Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Agency{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-pink-400 to-purple-400">
                Creators & Streamers
              </span>
            </h2>
            <p className="text-purple-200/80 text-sm sm:text-base mt-2 max-w-2xl">
              Meet top certified talent represented by our premier partner networks, broadcasting live daily to millions of fans globally.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-purple-400/40 text-purple-200 hover:text-white"
              onClick={() => onOpenInquiry?.("Creator Representation Inquiry")}
            >
              Audition With An Agency
            </Button>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allAgencyCreators.map((creator) => (
            <div
              key={creator.id}
              className="p-5 rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-purple-500/20 hover:border-purple-400/50 transition-all flex items-center justify-between gap-4 group shadow-lg shadow-purple-950/30"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-tr ${creator.avatarBg} flex items-center justify-center text-white font-extrabold text-base shadow-md ring-2 ring-purple-400/30 shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <span>{creator.initials}</span>
                  {creator.isLive && (
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-[9px] font-black uppercase text-black border border-white/40 tracking-wider">
                      LIVE
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate group-hover:text-pink-300 transition-colors">
                      {creator.name}
                    </h3>
                  </div>
                  <div className="text-xs text-purple-300 truncate">
                    {creator.role}
                  </div>
                  <div className="text-[11px] font-semibold text-brand-gold mt-0.5">
                    {creator.agencyName}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-black text-white">
                  {creator.followers}
                </div>
                <div className="text-[10px] text-purple-300 font-medium">Followers</div>
                <button
                  type="button"
                  onClick={() => onOpenGetStarted?.()}
                  className="mt-1 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 hover:bg-brand-pink text-white transition-colors"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
