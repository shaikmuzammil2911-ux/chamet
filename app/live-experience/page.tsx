import { Metadata } from "next";
import { LiveExperienceView } from "@/components/services/LiveExperienceView";

export const metadata: Metadata = {
  title: "Chamet Live Experience | Top Agencies & Talent Networks",
  description:
    "Explore premier agency networks, broadcaster guild profiles, and creator success stories on Chamet Live.",
};

export default function LiveExperiencePage() {
  return <LiveExperienceView />;
}

