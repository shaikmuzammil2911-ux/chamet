import { SERVICES } from "@/data/services";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }
  return {
    title: `${service.title} | ManaVerse Technologies Pvt. Ltd.`,
    description: service.shortDesc,
  };
}

export default function DynamicServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

