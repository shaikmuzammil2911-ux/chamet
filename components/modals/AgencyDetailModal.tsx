"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Agency } from "@/data/agencies";
import { AGENCY_STORIES } from "@/data/stories";
import {
  X,
  Star,
  Users,
  Radio,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
  Send,
  MessageCircle,
  Phone,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";

interface AgencyDetailModalProps {
  agency: Agency | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenStory?: (storyId: string) => void;
}

export const AgencyDetailModal: React.FC<AgencyDetailModalProps> = ({
  agency,
  isOpen,
  onClose,
  onOpenStory,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantTalent, setApplicantTalent] = useState("Live Broadcaster / Host");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !agency) return null;

  const agencyStories = AGENCY_STORIES.filter((s) => s.agencyId === agency.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#100727] border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-950/80 text-white scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all"
            aria-label="Close Agency Profile"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Header with Cover Image */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-purple-950">
            <Image
              src={agency.coverImage}
              alt={agency.name}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100727] via-[#100727]/60 to-black/30" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-purple-950 shadow-md">
                {agency.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-200 border border-purple-400/30 backdrop-blur-md">
                Est. {agency.established}
              </span>
            </div>

            {/* Agency Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${agency.accentColor} p-1 shadow-2xl flex items-center justify-center text-3xl font-extrabold ring-4 ring-[#100727]`}
                >
                  <span className="drop-shadow-md">{agency.logo}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {agency.name}
                    </h2>
                    <ShieldCheck className="w-5 h-5 text-brand-gold fill-brand-gold/20" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-purple-300">
                    {agency.category} • {agency.headquarters}
                  </p>
                </div>
              </div>

              {/* Active Live Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{agency.activeLiveCount}</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
                <div className="flex items-center justify-center gap-1 text-brand-gold text-lg font-black">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{agency.rating.toFixed(2)}</span>
                </div>
                <div className="text-[11px] font-medium text-purple-300 mt-0.5">
                  Host Satisfaction Rating
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
                <div className="text-lg font-black text-white">
                  {agency.creatorsCount}
                </div>
                <div className="text-[11px] font-medium text-purple-300 mt-0.5">
                  Signed Creators & Hosts
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
                <div className="text-lg font-black text-brand-pink">
                  {agency.totalFollowers}
                </div>
                <div className="text-[11px] font-medium text-purple-300 mt-0.5">
                  Total Platform Fans
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 text-center">
                <div className="text-lg font-black text-emerald-400">
                  {agency.payoutFrequency.split(" ")[0]}
                </div>
                <div className="text-[11px] font-medium text-purple-300 mt-0.5">
                  Instant Guaranteed Payouts
                </div>
              </div>
            </div>

            {/* Agency Overview & Mission */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>About {agency.name}</span>
              </h3>
              <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
                {agency.description}
              </p>
              <div className="p-3.5 rounded-xl bg-purple-900/30 border border-purple-400/20 text-xs sm:text-sm text-purple-200 flex items-center gap-3">
                <Award className="w-5 h-5 text-brand-gold shrink-0" />
                <span>
                  <strong className="text-white">Official ManaVerse Partner: </strong>
                  {agency.commissionRate} with 100% host contract protection.
                </span>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Key Agency Achievements</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {agency.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-purple-500/10 flex items-start gap-2.5 text-xs sm:text-sm text-purple-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Creators Roster */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-pink" />
                <span>Top Creators Represented by {agency.name}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {agency.featuredCreators.map((creator) => (
                  <div
                    key={creator.id}
                    className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 flex items-center gap-3 hover:border-purple-400/40 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-tr ${creator.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-purple-400/30 shrink-0`}
                    >
                      {creator.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white truncate">
                          {creator.name}
                        </span>
                        {creator.isLive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </div>
                      <div className="text-[11px] text-purple-300 truncate">
                        {creator.role}
                      </div>
                      <div className="text-[11px] font-semibold text-brand-gold">
                        {creator.followers} Fans
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency Stories Strip */}
            {agencyStories.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-purple-400" />
                  <span>Success Journeys & Stories</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {agencyStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => {
                        if (onOpenStory) onOpenStory(story.id);
                      }}
                      className="p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 to-pink-950/40 border border-purple-500/20 hover:border-pink-500/50 cursor-pointer flex items-center justify-between gap-3 group transition-all"
                    >
                      <div>
                        <div className="text-xs font-bold text-brand-gold">
                          {story.category} • {story.date}
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                          {story.storyTitle}
                        </div>
                        <div className="text-xs text-purple-300 mt-0.5">
                          With {story.creatorName} ({story.views})
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-brand-pink text-white flex items-center justify-center shrink-0 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Creator Application Form */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-[#1A0A38] to-pink-950 border border-purple-500/30 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Fast-Track Audition
                </span>
                <h4 className="text-xl font-black text-white mt-0.5">
                  Join {agency.name} as a Verified Creator
                </h4>
                <p className="text-xs sm:text-sm text-purple-200 mt-1">
                  Submit your details below to receive 1-on-1 streamer onboarding, ring light grants, and same-day payment setup.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    Application received! The {agency.name} talent team will contact you via WhatsApp or Phone within 2 hours.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-purple-400/60 text-sm focus:outline-none focus:border-brand-pink"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp / Phone (e.g. 8555896346)"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-purple-400/60 text-sm focus:outline-none focus:border-brand-pink"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-amber-500 text-purple-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Audition</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Direct Support Contacts */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-purple-300">
                <span>Direct Agency Helpline:</span>
                <a
                  href={COMPANY.contact.phoneTel}
                  className="font-bold text-white hover:text-brand-gold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {COMPANY.contact.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/91${COMPANY.contact.whatsapp}?text=Hello%2C+I+want+to+join+${encodeURIComponent(
                    agency.name
                  )}+on+Chamet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp Quick Chat
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
