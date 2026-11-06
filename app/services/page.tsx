"use client";

import React from "react";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { StatsBanner } from "@/components/sections/StatsBanner";
import { useModals } from "@/components/providers/ModalContext";
import { Button } from "@/components/ui/Button";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export default function ServicesOverviewPage() {
  const { openInquiry, openGetStarted } = useModals();

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Top Header */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-4 backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-brand-gold" />
          <span>Interactive Entertainment Ecosystem</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">Platforms & Services</span>
        </h1>

        <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-3">
          Discover how ManaVerse Technologies Pvt. Ltd. blends high-definition broadcasting, interactive voice rooms, gaming, and verified human matchmaking.
        </p>
      </section>

      {/* Services Grid with Modal and Dedicated page linkages */}
      <ServicesSection onOpenInquiry={openInquiry} showSectionHeader={false} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Verified Stats */}
      <StatsBanner />

      {/* Service Onboarding CTA */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-brand-deep to-indigo-950 border border-purple-500/40 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Explore ManaVerse Services?
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl mx-auto">
            Get instant support, register as a verified host, or integrate your commerce store.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button variant="gold" size="md" onClick={openGetStarted} withArrow>
              Get Started Now
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => openInquiry("Services Technical Consultation")}
            >
              Request Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
