import { Metadata } from "next";
import { LiveExperienceView } from "@/components/services/LiveExperienceView";

export const metadata: Metadata = {
  title: "Chamet Live Experience | Top Agencies, Creator Stories & Live Broadcasting",
  description:
    "Discover leading agencies empowering creators on Chamet. Explore active broadcaster guilds, inspiring success stories, and verified live host earning opportunities.",
};

export default function LiveStreamingPage() {
  return <LiveExperienceView />;
}
