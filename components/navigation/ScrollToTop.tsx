"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();

  // Disable browser's automatic history scroll restoration so destination pages ALWAYS start at top 0
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Force scroll reset on route change immediately and on next animation frame
  useEffect(() => {
    // Restore any locked overflow states
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Immediate instant reset
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Follow-up frame to guarantee clean positioning after DOM commit
    const frameId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return null;
};
