"use client";

import React from "react";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { HighlightsBar } from "@/components/sections/HighlightsBar";
import { ChametShowcaseSlider } from "@/components/sections/ChametShowcaseSlider";
import { CreatorStreamBanner } from "@/components/sections/CreatorStreamBanner";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TeamSection } from "@/components/sections/TeamSection";
import { StatsBanner } from "@/components/sections/StatsBanner";
import { OfficesAndContact } from "@/components/sections/OfficesAndContact";
import { useModals } from "@/components/providers/ModalContext";

export default function HomePage() {
  const { openVideo, openInquiry, openGetStarted } = useModals();

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section with 3 Automatic Sliding Banners */}
      <HeroSlider
        onOpenVideo={openVideo}
        onOpenServicesModal={() => {
          const el = document.getElementById("services-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Horizontal Glassmorphism Company Highlights (Supporting Families and Communities) */}
      <HighlightsBar />

      {/* 2.1 NEW: Premium Five-Image Automatic Horizontal Carousel */}
      <ChametShowcaseSlider onOpenGetStarted={openGetStarted} />

      {/* 2.2 NEW: Meet Our Creators Mini Horizontal Auto-Sliding Banner */}
      <CreatorStreamBanner
        onOpenInquiry={openInquiry}
        onOpenGetStarted={openGetStarted}
      />

      {/* 3. Existing: Our Services Section with 4 Cards & Detail Modals */}
      <ServicesSection onOpenInquiry={openInquiry} />

      {/* 4. About ManaVerse Narrative Preview */}
      <AboutSection />

      {/* 5. Why Choose ManaVerse Feature Grid */}
      <WhyChooseUs />

      {/* 6. Grand Our Team Section Preview */}
      <TeamSection isFullPage={false} onOpenInquiry={openInquiry} />

      {/* 7. Verified Statistics Banner */}
      <StatsBanner />

      {/* 8. Office Locations (UK & Bengaluru) & Direct Contact */}
      <OfficesAndContact
        onOpenInquiry={openInquiry}
        onOpenGetStarted={openGetStarted}
      />
    </div>
  );
}
