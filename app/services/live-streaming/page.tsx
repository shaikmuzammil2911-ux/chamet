import { SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Streaming | Real-Time Broadcasting & Host Earnings",
  description:
    "Ultra-low latency HD video streaming, virtual 3D gifts, PK battles, and sustainable earning opportunities for creators and women hosts worldwide.",
};

export default function LiveStreamingPage() {
  const service = SERVICES.find((s) => s.slug === "live-streaming")!;
  return <ServiceDetailView service={service} />;
}

