"use client";

import React from "react";
import { ModalBackdrop } from "./ModalBackdrop";
import { Button } from "@/components/ui/Button";
import { TeamMember } from "@/data/team";
import { Briefcase, Award, Shield, Mail } from "lucide-react";

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
      title={member.placeholderName}
      badge={member.department}
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Profile Avatar / Banner */}
        <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/[0.03] border border-white/10">
          <div
            className={`w-24 h-24 rounded-full bg-gradient-to-tr ${member.avatarColor} p-1 shadow-xl mb-3`}
          >
            <div className="w-full h-full rounded-full bg-[#120426] flex items-center justify-center text-white text-center p-2">
              <span className="text-xs font-bold leading-tight text-purple-200">
                {member.imagePlaceholderText}
              </span>
            </div>
          </div>

          <h4 className="text-lg font-bold text-white">{member.designation}</h4>
          <p className="text-xs font-semibold text-brand-gold mt-0.5">{member.role}</p>

          {!member.isConfigured && (
            <span className="mt-2 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30">
              Company Confidential Profile • In-House Leadership
            </span>
          )}
        </div>

        {/* Bio */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-pink" />
            Role & Focus
          </h5>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Skills & Focus Areas */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-brand-gold" />
            Key Competencies
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-purple-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          {onOpenInquiry && (
            <Button
              variant="purple"
              size="sm"
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
            >
              Contact Department
            </Button>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
};

