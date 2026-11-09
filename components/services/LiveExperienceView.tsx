"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Radio } from "lucide-react";
import { TOP_AGENCIES, Agency } from "@/data/agencies";
import { AGENCY_STORIES, AgencyStory } from "@/data/stories";
import { ChametShowcaseSlider } from "@/components/sections/ChametShowcaseSlider";
import { CreatorStreamBanner } from "@/components/sections/CreatorStreamBanner";
import { TopAgenciesSection } from "@/components/sections/TopAgenciesSection";
import { AgencyStoriesSection } from "@/components/sections/AgencyStoriesSection";
import { FeaturedAgencyCreators } from "@/components/sections/FeaturedAgencyCreators";
import { TrendingLiveStories } from "@/components/sections/TrendingLiveStories";
import { JoinCreatorCTA } from "@/components/sections/JoinCreatorCTA";
import { StoryViewerModal } from "@/components/modals/StoryViewerModal";
import { AgencyDetailModal } from "@/components/modals/AgencyDetailModal";
import { useModals } from "@/components/providers/ModalContext";

export const LiveExperienceView: React.FC = () => {
  const { openGetStarted, openInquiry } = useModals();

  // Selected agency modal state
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);

  // Selected story modal state
  const [selectedStoryId, setSelectedStoryId] = useState<string | undefined>(undefined);
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  const handleOpenAgency = (agency: Agency) => {
    setSelectedAgency(agency);
    setAgencyModalOpen(true);
  };

  const handleOpenAgencyById = (agencyId: string) => {
    const ag = TOP_AGENCIES.find((a) => a.id === agencyId);
    if (ag) {
      setSelectedAgency(ag);
      setAgencyModalOpen(true);
    }
  };

  const handleOpenStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    setStoryModalOpen(true);
  };

  const handleExploreAgencyStories = (agencyId: string) => {
    const story = AGENCY_STORIES.find((s) => s.agencyId === agencyId);
    if (story) {
      setSelectedStoryId(story.id);
      setStoryModalOpen(true);
    } else {
      setSelectedStoryId(AGENCY_STORIES[0].id);
      setStoryModalOpen(true);
    }
  };

  return (
    <div className="pt-24 pb-12 w-full overflow-hidden flex flex-col">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 pb-2">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-purple-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* 1. Chamet Live Experience Hero Carousel */}
      <ChametShowcaseSlider onOpenGetStarted={openGetStarted} />

      {/* 2. Featured Top Hosts & Broadcasters */}
      <CreatorStreamBanner
        onOpenInquiry={openInquiry}
        onOpenGetStarted={openGetStarted}
      />

      {/* 3. Top Agencies & Talent Networks */}
      <TopAgenciesSection
        onSelectAgency={handleOpenAgency}
        onExploreStories={handleExploreAgencyStories}
      />

      {/* 4. Agency Stories & Success Journeys */}
      <AgencyStoriesSection onOpenStory={handleOpenStory} />

      {/* 5. Featured Agency Creators */}
      <FeaturedAgencyCreators
        onOpenInquiry={openInquiry}
        onOpenGetStarted={openGetStarted}
      />

      {/* 6. Trending Live Stories */}
      <TrendingLiveStories onOpenStory={handleOpenStory} />

      {/* 7. Join Chamet / Become a Creator CTA */}
      <JoinCreatorCTA
        onOpenGetStarted={openGetStarted}
        onOpenInquiry={openInquiry}
      />

      {/* Full-Screen Story Viewer Modal */}
      <StoryViewerModal
        stories={AGENCY_STORIES}
        initialStoryId={selectedStoryId}
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
        onSelectAgency={handleOpenAgencyById}
      />

      {/* Individual Agency Profile Modal */}
      <AgencyDetailModal
        agency={selectedAgency}
        isOpen={agencyModalOpen}
        onClose={() => setAgencyModalOpen(false)}
        onOpenStory={(id) => {
          setAgencyModalOpen(false);
          handleOpenStory(id);
        }}
      />
    </div>
  );
};

