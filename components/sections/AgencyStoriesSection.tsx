"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AGENCY_STORIES, AgencyStory } from "@/data/stories";
import {
  Play,
  Heart,
  Eye,
  Sparkles,
  Radio,
  Calendar,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface AgencyStoriesSectionProps {
  onOpenStory: (storyId: string) => void;
}

export const AgencyStoriesSection: React.FC<AgencyStoriesSectionProps> = ({
  onOpenStory,
}) => {
  const [filter, setFilter] = useState<string>("all");

  const filteredStories = AGENCY_STORIES.filter((story) => {
    if (filter === "all") return true;
    return story.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section className="relative py-16 sm:py-24 bg-[#080214] overflow-hidden border-t border-purple-500/15">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-brand-pink/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-brand-purple/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-950/60 to-purple-950/60 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>Community Spotlights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Agency Stories &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-purple-300 to-brand-gold">
              Success Journeys
            </span>
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg leading-relaxed">
            Real stories, inspiring creators, and extraordinary achievements from the Chamet community.
          </p>

          {/* Filter categories */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Stories" },
              { id: "empowerment", label: "Host Empowerment" },
              { id: "pk battle", label: "Audio & PK Battles" },
              { id: "community", label: "Safety & Support" },
              { id: "live event", label: "Grand Tournaments" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat.id
                    ? "bg-gradient-to-r from-brand-pink to-brand-purple text-white shadow-md shadow-pink-950/40"
                    : "bg-white/5 text-purple-300 hover:text-white border border-purple-500/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Story Cards Grid (Vertical 9:16 Instagram-Inspired Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={() => onOpenStory(story.id)}
              className="relative h-[440px] sm:h-[480px] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl shadow-purple-950/40 border border-purple-500/25 hover:border-brand-pink/60 transition-all flex flex-col justify-between"
            >
              {/* Vertical Cover Image */}
              <div className="absolute inset-0 bg-purple-950">
                <Image
                  src={story.coverImage}
                  alt={story.storyTitle}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Cinema Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/30 transition-all" />
              </div>

              {/* Top Bar: Agency Avatar & Name */}
              <div className="relative z-10 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-tr ${story.creatorAvatarBg} p-0.5 ring-2 ring-brand-pink shadow-md flex items-center justify-center text-xs font-bold`}
                  >
                    <span>{story.creatorInitials}</span>
                  </div>
                  <div>
                    <div className="text-xs font-black text-white leading-tight">
                      {story.creatorName}
                    </div>
                    <div className="text-[10px] text-purple-200">
                      {story.agencyName}
                    </div>
                  </div>
                </div>

                {/* Media Indicator Badge */}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20 text-brand-gold">
                  {story.category}
                </span>
              </div>

              {/* Floating Center Play Button */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-pink/90 text-white shadow-2xl shadow-pink-900/60 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Card Content: Title, Description, Stats */}
              <div className="relative z-10 p-5 space-y-2.5 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-center justify-between text-[11px] text-purple-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    {story.date}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brand-gold">
                    <Eye className="w-3 h-3" />
                    {story.views}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white leading-snug group-hover:text-pink-300 transition-colors line-clamp-2">
                  {story.storyTitle}
                </h3>

                <p className="text-xs text-purple-200/80 line-clamp-2 leading-relaxed">
                  {story.description}
                </p>

                {/* View Story Action Link */}
                <div className="pt-1 flex items-center justify-between text-xs font-bold text-brand-pink group-hover:text-white transition-colors">
                  <span>Watch Full Story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

