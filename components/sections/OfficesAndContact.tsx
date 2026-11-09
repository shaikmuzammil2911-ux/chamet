"use client";

import React, { useState, useEffect } from "react";
import { COMPANY } from "@/data/company";
import { cmsService } from "@/lib/cms";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Building2,
  Phone,
  MessageCircle,
  Rocket,
  ArrowRight,
  ExternalLink,
  Mail,
} from "lucide-react";

interface OfficesAndContactProps {
  onOpenInquiry?: (subject?: string) => void;
  onOpenGetStarted?: () => void;
}

export const OfficesAndContact: React.FC<OfficesAndContactProps> = ({
  onOpenInquiry,
  onOpenGetStarted,
}) => {
  const [contact, setContact] = useState(COMPANY.contact);

  useEffect(() => {
    cmsService.getSiteSettings().then((settings) => {
      if (settings && settings.contact) {
        setContact(settings.contact);
      }
    });
  }, []);
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Office Locations Card (Head Office UK & Branch Office Bengaluru) */}
          <div className="lg:col-span-6">
            <GlassCard
              glowColor="blue"
              className="p-6 sm:p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center text-white shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Our Office Locations
                    </h3>
                    <p className="text-xs text-purple-300">
                      Global Headquarters & Technology Development Center
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Head Office UK */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-purple/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-gold text-[#26005F]">
                        Head Office
                      </span>
                      <span className="text-xs text-purple-300 font-semibold">UK</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      United Kingdom
                    </h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      Velina Colony Street, <br />
                      Near Fashion Showroom, <br />
                      London, UK.
                    </p>
                  </div>

                  {/* Branch Office Bengaluru */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-brand-purple/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-pink text-white">
                        Branch Office
                      </span>
                      <span className="text-xs text-purple-300 font-semibold">India</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      Bengaluru Technology Hub
                    </h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      HSR Layout, Bengaluru, <br />
                      Karnataka, India – 560102.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-purple-300">
                <span>International Corporate Network</span>
                <span className="text-brand-gold font-semibold">Operating Worldwide</span>
              </div>
            </GlassCard>
          </div>

          {/* Right Top: Direct Contact Card (Phone & WhatsApp) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <GlassCard
              glowColor="gold"
              className="p-6 sm:p-7 bg-gradient-to-br from-[#1C0938] via-[#14062E] to-[#1F0A40]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                    Direct Corporate Line
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Connect With Our Team
                  </h3>
                </div>
                <div className="text-xs text-purple-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                  Phone / WhatsApp Support
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Phone Call */}
                <a
                  href={contact.phoneTel}
                  className="p-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-400/40 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600/40 text-purple-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-[11px] text-purple-300 font-medium">Direct Call</div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {contact.phone}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-300 font-medium">Chat on WhatsApp</div>
                    <div className="text-sm font-bold text-white tracking-wide">
                      {contact.whatsapp}
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-purple-300/80">
                  Email: {contact.email}
                </span>
                {onOpenInquiry && (
                  <button
                    type="button"
                    onClick={() => onOpenInquiry("General Contact Inquiry")}
                    className="text-xs font-bold text-brand-gold hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Open Inquiry Form
                  </button>
                )}
              </div>
            </GlassCard>

            {/* Right Bottom: CTA Banner Start Your Journey */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-brand-purple via-[#A832FF] to-brand-pink border border-white/20 shadow-xl shadow-purple-950/60 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative z-10 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Rocket className="w-6 h-6 text-brand-gold animate-bounce" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-white">
                    Start Your Journey with ManaVerse
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-100/90 mt-0.5">
                    Explore live streaming, entertainment, and earning today.
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-full sm:w-auto shrink-0">
                {onOpenGetStarted ? (
                  <Button
                    variant="gold"
                    size="md"
                    onClick={onOpenGetStarted}
                    withArrow
                    fullWidth
                  >
                    Get Started Now
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    size="md"
                    href="/contact"
                    withArrow
                    fullWidth
                  >
                    Get Started Now
                  </Button>
                )}
              </div>

              {/* Decorative background shape */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

