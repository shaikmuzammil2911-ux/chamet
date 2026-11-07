import { SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dating & Social Connections | Verified Profiles & Real Companionship",
  description:
    "Safe, authentic, and verified human connections with smart affinity matching, private 1-on-1 HD calls, and zero tolerance for harassment.",
};

export default function SocialConnectionsPage() {
  const service = SERVICES.find((s) => s.slug === "social-connections")!;
  return <ServiceDetailView service={service} />;
}

