"use client";

import React, { createContext, useContext, useState } from "react";
import { InquiryModal } from "@/components/modals/InquiryModal";
import { GetStartedModal } from "@/components/modals/GetStartedModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { CareerModal } from "@/components/modals/CareerModal";

interface ModalContextType {
  openInquiry: (subject?: string) => void;
  openGetStarted: () => void;
  openVideo: () => void;
  openCareer: (position?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState<string>("General Business Inquiry");

  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const [careerOpen, setCareerOpen] = useState(false);
  const [careerPosition, setCareerPosition] = useState<string>("General Talent Expression");

  const openInquiry = (subject?: string) => {
    if (subject) setInquirySubject(subject);
    setInquiryOpen(true);
  };

  const openGetStarted = () => setGetStartedOpen(true);
  const openVideo = () => setVideoOpen(true);

  const openCareer = (position?: string) => {
    if (position) setCareerPosition(position);
    setCareerOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        openInquiry,
        openGetStarted,
        openVideo,
        openCareer,
      }}
    >
      {children}

      {/* Global Application Modals */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultSubject={inquirySubject}
      />

      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
        onOpenInquiry={(sub) => openInquiry(sub)}
      />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />

      <CareerModal
        isOpen={careerOpen}
        onClose={() => setCareerOpen(false)}
        defaultPosition={careerPosition}
      />
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
};
