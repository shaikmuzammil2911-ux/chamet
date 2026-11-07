"use client";

import React from "react";
import Link from "next/link";
import { ServiceItem } from "@/data/services";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useModals } from "@/components/providers/ModalContext";
import { TypewriterNumber } from "@/components/ui/TypewriterNumber";
import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Radio,
  Gamepad2,
  Heart,
  MessageCircle,
  Phone,
} from "lucide-react";
import { COMPANY } from "@/data/company";

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
}) => {
  const { openInquiry, openGetStarted } = useModals();

  const getIcon = () => {
    switch (service.id) {
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

  const Icon = getIcon();

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#190736]/90 to-blue-950/70 border border-purple-500/30 backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-lg">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-brand-gold border border-white/10">
                {service.badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-xl font-bold text-brand-gold">
              {service.tagline}
            </p>

            <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg leading-relaxed">
              {service.fullDesc}
            </p>

            {/* Quick CTA */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={() => openInquiry(`Inquiry for ${service.title}`)}
                withArrow
              >
                Inquire About {service.title}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={openGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid with Typewriter numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {service.stats.map((st, i) => (
            <GlassCard key={i} glowColor="purple" className="p-6 text-center">
              <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-brand-gold">
                <TypewriterNumber value={st.value} duration={1400} />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-200/80 block mt-1">
                {st.label}
              </span>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Features & Benefits Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Features */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
              Key Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Architecture & Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feat, index) => (
              <GlassCard key={index} glowColor="pink" className="p-6 sm:p-7">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-brand-pink flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Host & User Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Hosts & Audiences Choose This
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((ben, index) => (
              <GlassCard key={index} glowColor="gold" className="p-6">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 text-brand-gold">
                  {ben.title}
                </h3>
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                  {ben.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Bar */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="text-sm font-bold text-white">
              Have questions regarding {service.title}?
            </div>
            <div className="text-xs text-purple-300">
              Speak to our solutions team via WhatsApp or Direct Call.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={COMPANY.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold shadow hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp: {COMPANY.contact.whatsapp}
            </a>
            <a
              href={COMPANY.contact.phoneTel}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
