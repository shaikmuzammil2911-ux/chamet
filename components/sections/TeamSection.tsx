"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TEAM_MEMBERS, TEAM_DEPARTMENTS, TeamMember } from "@/data/team";
import { cmsService } from "@/lib/cms";
import { GlassCard } from "@/components/ui/GlassCard";
import { TeamModal } from "@/components/modals/TeamModal";
import { Button } from "@/components/ui/Button";
import {
  Users,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Globe2,
  CheckCircle2,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

interface TeamSectionProps {
  isFullPage?: boolean;
  onOpenInquiry?: (subject?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  isFullPage = false,
  onOpenInquiry,
}) => {
  const [members, setMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [selectedDept, setSelectedDept] = useState<string>("All Leadership");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Live Supabase Sync
  useEffect(() => {
    cmsService.getTeamMembers().then((liveMembers) => {
      if (liveMembers && liveMembers.length > 0) {
        setMembers(liveMembers);
      }
    });
  }, []);

  const displayedMembers = members.filter((m) => {
    if (selectedDept === "All Leadership") return true;
    if (selectedDept === "Executive Leadership") {
      return m.department === "Executive Leadership";
    }
    if (selectedDept === "Sales & Business Development") {
      return m.department === "Sales & Business Development";
    }
    if (selectedDept === "India Operations") {
      return m.market.includes("India");
    }
    if (selectedDept === "Global Markets") {
      return m.market.includes("UK") || m.market.includes("Middle East");
    }
    return true;
  });

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-[#0B031E] via-[#12052C] to-[#0A021B]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/25 border border-brand-purple/40 text-purple-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-brand-gold" />
            <span>Executive & Regional Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet the Leaders Driving{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-pink-400">
              Chamet & ManaVerse
            </span>
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg leading-relaxed">
            The visionary executives, co-founders, and sales leadership steering global creator ecosystems across India, the UK, the Americas, and the Middle East.
          </p>

          {/* Department / Market Filter Pills */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-2">
            {TEAM_DEPARTMENTS.map((dept) => {
              const isActive = selectedDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50 scale-105"
                      : "bg-white/5 text-purple-200 hover:text-white hover:bg-white/10 border border-purple-500/20"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Grid: Grand 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedMembers.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedMember(member)}
              className="flex flex-col h-full rounded-3xl bg-gradient-to-b from-[#180A36]/90 via-[#13072E]/95 to-[#0F0424]/95 border border-purple-500/25 shadow-xl shadow-purple-950/40 hover:border-brand-pink/50 transition-all overflow-hidden cursor-pointer group"
            >
              {/* Grand Portrait Photo Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-purple-950">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={member.rankOrder <= 2}
                />

                {/* Ambient Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180A36] via-[#180A36]/40 to-transparent" />

                {/* Floating Top Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-brand-gold text-purple-950 shadow-md">
                    {member.badge}
                  </span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-brand-gold text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md group-hover:text-pink-300 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-brand-gold drop-shadow-sm">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Market & Location Strip */}
                  <div className="space-y-1.5 text-xs text-purple-200">
                    <div className="flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-brand-pink shrink-0" />
                      <span className="font-semibold text-white truncate">
                        {member.market}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-300">
                      <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                      <span className="truncate">{member.location}</span>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-white/5 text-purple-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Actions (Phone & WhatsApp) */}
                <div className="pt-2 border-t border-purple-500/20 space-y-2">
                  <div className="flex items-center gap-2">
                    {member.phoneDisplay && member.phoneTel ? (
                      <a
                        href={member.phoneTel}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 px-3 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="truncate">{member.phoneDisplay}</span>
                      </a>
                    ) : (
                      <div className="flex-1 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-purple-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Executive Board</span>
                      </div>
                    )}

                    {member.whatsappLink && (
                      <a
                        href={member.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-10 h-9 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-300 flex items-center justify-center transition-colors shrink-0 shadow-sm"
                        title="Direct WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* View Details Link */}
                  <div className="flex items-center justify-between text-xs text-brand-gold font-bold pt-1 group-hover:text-pink-300 transition-colors">
                    <span>View Profile & Credentials</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* If on Homepage, show Link to full team page */}
        {!isFullPage && (
          <div className="mt-12 text-center">
            <Button variant="purple" size="md" href="/team" withArrow>
              Explore Full Leadership & Operating Corridors
            </Button>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      <TeamModal
        member={selectedMember}
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        onOpenInquiry={
          onOpenInquiry
            ? () => onOpenInquiry(`Inquiry for ${selectedMember?.name} (${selectedMember?.role})`)
            : undefined
        }
      />
    </section>
  );
};
