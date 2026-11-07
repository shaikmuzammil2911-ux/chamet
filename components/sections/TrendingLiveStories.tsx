"use client";

import React from "react";
import { AGENCY_STORIES } from "@/data/stories";
import { Sparkles, TrendingUp, Radio, Award, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TrendingLiveStoriesProps {
  onOpenStory: (storyId: string) => void;
}

export const TrendingLiveStories: React.FC<TrendingLiveStoriesProps> = ({
  onOpenStory,
}) => {
  const highlights = [
    {
      id: "trending-1",
      storyId: "story-sophia-milestone",
      title: "Host Empowerment Summit 2025 Announced",
      badge: "Global Gala",
      metric: "$2.5M Creator Fund",
      desc: "ManaVerse announces its annual creator endowment providing audio equipment grants and zero-interest emergency assistance.",
      gradient: "from-purple-900/40 via-purple-950/60 to-pink-900/30",
    },
    {
      id: "trending-2",
      storyId: "story-celestial-audio-battle",
      title: "Cross-Border DJ Showcase Reaches 50K Listeners",
      badge: "Record Breaker",
      metric: "52K Peak Listeners",
      desc: "Celestial Voice Lounge set a new platform benchmark with seamless ultra-low latency audio connecting artists in London, Madrid, and Mumbai.",
      gradient: "from-blue-900/40 via-indigo-950/60 to-purple-900/30",
    },
    {
      id: "trending-3",
      storyId: "story-phoenix-safety-first",
      title: "2,200+ Women Broadcasters Certified in Financial Literacy",
      badge: "Host Safety",
      metric: "100% On-Time Payouts",
      desc: "Phoenix Collective completes its quarterly host empowerment workshop, ensuring independent women achieve complete financial autonomy.",
      gradient: "from-rose-900/40 via-purple-950/60 to-amber-900/30",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 bg-[#0E0524] overflow-hidden border-t border-purple-500/15">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Community Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Trending Live Stories & Platform News
          </h2>
          <p className="text-purple-200/80 text-sm sm:text-base">
            Stay updated with creator milestones, upcoming voice festivals, and empowerment initiatives across Chamet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenStory(item.storyId)}
              className={`p-6 rounded-3xl bg-gradient-to-br ${item.gradient} border border-purple-500/25 hover:border-brand-pink/50 cursor-pointer transition-all shadow-xl shadow-purple-950/40 flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-brand-gold border border-white/10">
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-pink-400">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-pink-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-bold text-brand-pink group-hover:text-white transition-colors border-t border-white/10 mt-4">
                <span>Read Full Coverage</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
