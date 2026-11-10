"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SERVICES, ServiceItem } from "@/data/services";
import { cmsService } from "@/lib/cms";
import { GlassCard } from "@/components/ui/GlassCard";
import { ServiceModal } from "@/components/modals/ServiceModal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  ShoppingBag,
  Radio,
  Gamepad2,
  Heart,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ServicesSectionProps {
  onOpenInquiry?: (subject?: string) => void;
  showSectionHeader?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenInquiry,
  showSectionHeader = true,
}) => {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Live Supabase Sync
  useEffect(() => {
    cmsService.getServices().then((liveServices) => {
      if (liveServices && liveServices.length > 0) {
        setServices(liveServices);
      }
    });
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "e-commerce":
        return ShoppingBag;
      case "live-streaming":
        return Radio;
      case "playrooms-games":
        return Gamepad2;
      case "social-connections":
        return Heart;
      default:
        return Sparkles;
    }
  };

  const getCardStyle = (id: string) => {
    switch (id) {
      case "e-commerce":
        return {
          glow: "blue" as const,
          gradient: "from-blue-600/30 via-indigo-900/40 to-purple-950/60",
          iconBg: "from-blue-500 to-indigo-600",
          tag: "Shopping & Retail",
        };
      case "live-streaming":
        return {
          glow: "purple" as const,
          gradient: "from-purple-600/30 via-blue-900/40 to-purple-950/60",
          iconBg: "from-purple-500 to-pink-600",
          tag: "High Yield Broadcasting",
        };
      case "playrooms-games":
        return {
          glow: "gold" as const,
          gradient: "from-amber-600/30 via-purple-900/40 to-purple-950/60",
          iconBg: "from-amber-500 to-orange-600",
          tag: "Audio Party & Games",
        };
      case "social-connections":
        return {
          glow: "pink" as const,
          gradient: "from-pink-600/30 via-rose-900/40 to-purple-950/60",
          iconBg: "from-pink-500 to-rose-600",
          tag: "Verified Matchmaking",
        };
      default:
        return {
          glow: "purple" as const,
          gradient: "from-purple-600/30 to-purple-950/60",
          iconBg: "from-purple-500 to-brand-pink",
          tag: "Entertainment",
        };
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-purple/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Chamet signature style */}
        {showSectionHeader && (
          <ScrollReveal direction="up">
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
              <div className="flex items-center gap-4 w-full max-w-md justify-center mb-3">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-brand-deep via-brand-purple to-brand-deep border border-brand-purple/60 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-purple-900/50">
                  Our Services
                </div>
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Innovative Platforms For Entertainment & Earning
              </h2>
              <p className="text-purple-200/80 text-sm sm:text-base max-w-2xl mt-2.5">
                Empowering global audiences and creator hosts with next-generation interactive digital entertainment.
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Services Cards Grid with Live Sync */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.id);
            const style = getCardStyle(service.id);

            return (
              <ScrollReveal key={service.id} direction="up" delay={index * 0.08}>
                <GlassCard
                  glowColor={style.glow}
                  className="h-full flex flex-col justify-between p-6 sm:p-7 group relative overflow-hidden transition-all duration-300 hover:-translate-y-2"
                >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${style.gradient} opacity-70 group-hover:opacity-90 transition-opacity`}
                />

                {/* Card Top: 3D-styled Icon & Badge */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${style.iconBg} p-0.5 shadow-xl shadow-purple-950/60 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <div className="w-full h-full rounded-[14px] bg-[#140628] flex items-center justify-center text-white">
                        <Icon className="w-7 h-7 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-purple-200 border border-white/10 backdrop-blur-md">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-purple-200/85 mt-2.5 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Bottom: Interactive Pop-up CTA + Dedicated Page Link */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-gradient-to-r from-brand-gold via-amber-300 to-amber-500 text-[#26005F] font-bold text-xs sm:text-sm shadow-md hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-center gap-1.5 text-[11px] text-purple-300/80 hover:text-white py-1 transition-colors group/link"
                  >
                    <span>View Full Page</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Service Detail Popup */}
      <ServiceModal
        service={selectedService}
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        onOpenInquiry={
          onOpenInquiry
            ? () => onOpenInquiry(`Inquiry about ${selectedService?.title}`)
            : undefined
        }
      />
    </section>
  );
};

