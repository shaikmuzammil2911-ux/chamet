"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { useModals } from "@/components/providers/ModalContext";

export const HeaderWrapper: React.FC = () => {
  const pathname = usePathname();
  const { openGetStarted } = useModals();

  // Do not render the public site navbar on admin panel routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Navbar onOpenGetStarted={openGetStarted} />;
};


