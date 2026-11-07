import { SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Solutions | Interactive Shopping & Entertainment",
  description:
    "Interactive video shopping, host merchandise showcases, flash offers, and seamless in-stream checkout powered by ManaVerse Technologies Pvt. Ltd.",
};

export default function EcommercePage() {
  const service = SERVICES.find((s) => s.slug === "e-commerce")!;
  return <ServiceDetailView service={service} />;
}

