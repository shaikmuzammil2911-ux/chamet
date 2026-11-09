"use client";

import React from "react";
import Image from "next/image";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { TeamMember } from "@/data/team";
import {
  Briefcase,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Globe2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface TeamModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry?: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({
  member,
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  if (!member) return null;

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      title={member.name}
      badge={member.badge}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Profile Card Header with Portrait & Identity */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-950/70 via-[#180936]/80 to-pink-950/50 border border-purple-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Portrait Image */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-purple-500/40 shadow-2xl shrink-0 bg-purple-950">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 128px, 144px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {member.name}
              </h3>
              {member.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Leadership
                </span>
              )}
            </div>

            <div className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-pink-400">
              {member.role}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-purple-200">
              {member.designation}
            </p>

            {/* Market & Location badges */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/10">
                <Globe2 className="w-3.5 h-3.5 text-brand-gold" />
                <span>{member.market}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{member.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Contact Strip (Phone, WhatsApp, Email) */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {member.phoneDisplay && member.phoneTel && (
              <a
                href={member.phoneTel}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800/60 border border-purple-400/30 text-white text-xs font-bold transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>Call: {member.phoneDisplay}</span>
              </a>
            )}

            {member.whatsappLink && (
              <a
                href={member.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-200 text-xs font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Message</span>
              </a>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 hover:text-white text-xs font-medium transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-purple-300" />
                <span>{member.email}</span>
              </a>
            )}
          </div>

          <span className="text-[11px] text-purple-300 font-medium">
            Direct Official Contact
          </span>
        </div>

        {/* Executive Biography */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-pink" />
            Executive Overview & Leadership Focus
          </h4>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            {member.bio}
          </p>
        </div>

        {/* Key Achievements */}
        {member.achievements && member.achievements.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Strategic Achievements & Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {member.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs text-purple-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
            Core Competencies & Expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-lg bg-gradient-to-r from-purple-900/40 to-pink-900/30 border border-purple-500/30 text-purple-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs text-purple-300">
            ManaVerse Technologies Pvt. Ltd. • Chamet Leadership
          </span>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            {onOpenInquiry && (
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  onClose();
                  onOpenInquiry();
                }}
              >
                Contact Leadership
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};
