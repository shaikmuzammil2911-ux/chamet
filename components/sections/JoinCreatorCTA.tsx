"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/data/company";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Sparkles,
  Phone,
  MessageCircle,
  Radio,
  ShieldCheck,
  Award,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

interface JoinCreatorCTAProps {
  onOpenGetStarted?: () => void;
  onOpenInquiry?: (subject?: string) => void;
}

export const JoinCreatorCTA: React.FC<JoinCreatorCTAProps> = ({
  onOpenGetStarted,
  onOpenInquiry,
}) => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[#100628] via-[#1A0A38] to-[#0A021B] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-purple/25 rounded-full blur-[140px] pointer-events-none" />

      <ScrollReveal direction="scale" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-purple-950/80 via-[#180936]/90 to-pink-950/80 border border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-950/60 text-center relative overflow-hidden">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Start Your Earning Journey Today</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ready to Broadcast, Connect & Earn on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-pink-400">
              Chamet?
            </span>
          </h2>

          <p className="mt-4 text-purple-200/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are an aspiring entertainer, experienced broadcaster, or a talent agency looking to scale, ManaVerse provides certified contracts, equipment support, and guaranteed settlements.
          </p>

          {/* Value Props Row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">100% Host Protection</div>
                <div className="text-xs text-purple-300">Verified identities & safe streaming environments</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 flex items-start gap-3">
              <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Top Revenue Retention</div>
                <div className="text-xs text-purple-300">Highest commission payouts in the live industry</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Agency Partnership</div>
                <div className="text-xs text-purple-300">Dedicated guild managers & 24/7 tech assistance</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onOpenGetStarted?.()}
              withArrow
              className="shadow-xl shadow-amber-900/40 text-sm font-bold"
            >
              Apply as Creator / Host
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onOpenInquiry?.("Agency Partnership Application")}
              className="text-sm font-bold border-purple-400/40 text-purple-200 hover:text-white hover:bg-purple-900/40"
            >
              Register New Agency
            </Button>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs sm:text-sm text-purple-300">
            <span>Direct Talent Onboarding Helpline:</span>
            <a
              href={COMPANY.contact.phoneTel}
              className="font-bold text-white hover:text-brand-gold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY.contact.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/91${COMPANY.contact.whatsapp}?text=Hello%20ManaVerse%20Team%2C%20I%20am%20interested%20in%20joining%20Chamet%20as%20a%20Creator%2FAgency.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
