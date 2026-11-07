"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Restore body scroll in case any open modal/drawer locked it
    document.body.style.overflow = "";

    // Instantly scroll window to top upon route change to eliminate glitching/stuck feeling
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
