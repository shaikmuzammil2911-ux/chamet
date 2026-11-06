"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { useModals } from "@/components/providers/ModalContext";

export const HeaderWrapper: React.FC = () => {
  const { openGetStarted } = useModals();

  return <Navbar onOpenGetStarted={openGetStarted} />;
};
