"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TEAM_MEMBERS, TEAM_DEPARTMENTS, TeamMember } from "@/data/team";
import { GlassCard } from "@/components/ui/GlassCard";
import { TeamModal } from "@/components/modals/TeamModal";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Shield,
  Briefcase,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

interface TeamSectionProps {
  isFullPage?: boolean;
  onOpenInquiry?: (subject?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  isFullPage = false,
  onOpenInquiry,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const displayedMembers = TEAM_MEMBERS.filter((m) =>
    selectedDept === "All Departments" ? true : m.department === selectedDept
  );

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-3 backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-brand-gold" />
            <span>Our Executive & Engineering Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pioneers of Next-Gen Entertainment
          </h2>

          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed">
            The dedicated architects, engineers, operations directors, and safety specialists powering ManaVerse Technologies Pvt. Ltd. and the Chamet platform.
          </p>

          {/* Transparent Notice regarding local profile configuration */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 text-xs">
            <Info className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>
              Company-configurable roster • Verified leadership positions
            </span>
          </div>
        </div>

        {/* Department Filter Tabs */}
        {isFullPage && (
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {TEAM_DEPARTMENTS.map((dept) => {
              const isActive = selectedDept === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50 scale-105"
                      : "bg-white/5 text-purple-200 hover:text-white hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        )}

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isFullPage ? displayedMembers : TEAM_MEMBERS.slice(0, 3)).map(
            (member) => (
              <GlassCard
                key={member.id}
                glowColor="purple"
                onClick={() => setSelectedMember(member)}
                className="p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div>
                  {/* Top Avatar Card */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${member.avatarColor} p-0.5 shadow-xl shadow-purple-950/60 group-hover:scale-105 transition-transform`}
                    >
                      <div className="w-full h-full rounded-[14px] bg-[#140628] flex items-center justify-center text-white text-center p-1">
                        <Users className="w-7 h-7 text-purple-200 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-purple-200 border border-white/10">
                      {member.department}
                    </span>
                  </div>

                  {/* Title & Designation */}
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors">
                    {member.designation}
                  </h3>
                  <div className="text-xs font-semibold text-brand-pink mt-0.5">
                    {member.role}
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-purple-200/80 mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 text-purple-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-brand-gold font-bold">
                  <span>View Profile Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            )
          )}
        </div>

        {/* If on Homepage, show Link to full team page */}
        {!isFullPage && (
          <div className="mt-12 text-center">
            <Button variant="purple" size="md" href="/team" withArrow>
              Explore All Departments & Leadership
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
            ? () => onOpenInquiry(`Inquiry for ${selectedMember?.designation}`)
            : undefined
        }
      />
    </section>
  );
};

