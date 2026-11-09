import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cmsService } from "@/lib/cms";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface DynamicPageProps {
  params: {
    customSlug: string;
  };
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const page = await cmsService.getDynamicPage(params.customSlug);
  if (!page) {
    return {
      title: "Page Not Found | ManaVerse",
    };
  }
  return {
    title: `${page.seo_title || page.title} | ManaVerse Technologies`,
    description: page.seo_desc || page.description,
  };
}

export default async function DynamicCMSPage({ params }: DynamicPageProps) {
  // Reserved static routes to ignore
  const reserved = [
    "admin",
    "api",
    "about",
    "services",
    "team",
    "careers",
    "contact",
    "vision",
    "terms",
    "privacy-policy",
    "live-experience",
  ];

  if (reserved.includes(params.customSlug)) {
    notFound();
  }

  const page = await cmsService.getDynamicPage(params.customSlug);

  if (!page) {
    notFound();
  }

  const sections = Array.isArray(page.page_sections) ? page.page_sections : [];

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Dynamic Page Hero */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>ManaVerse Official Portal</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          {page.title}
        </h1>

        {page.description && (
          <p className="text-purple-200/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            {page.description}
          </p>
        )}
      </section>

      {/* Render Dynamic Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {sections.length === 0 ? (
          <GlassCard glowColor="purple" className="p-8 sm:p-12 text-center space-y-4">
            <h2 className="text-xl font-bold text-white">Welcome to {page.title}</h2>
            <p className="text-sm text-purple-200/80 max-w-md mx-auto leading-relaxed">
              This custom page was created via the ManaVerse Dynamic Page Builder. Sections and content modules can be customized in the Super Admin Console.
            </p>
            <div className="pt-2">
              <Button variant="gold" size="md" href="/services" withArrow>
                Explore Services & Entertainment
              </Button>
            </div>
          </GlassCard>
        ) : (
          sections.map((sec: any) => (
            <GlassCard key={sec.id} glowColor="purple" className="p-6 sm:p-8 space-y-3">
              {sec.title && (
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {sec.title}
                </h2>
              )}
              {sec.subtitle && (
                <p className="text-sm font-semibold text-brand-gold">
                  {sec.subtitle}
                </p>
              )}
              {sec.content?.body && (
                <p className="text-sm text-purple-200/90 leading-relaxed whitespace-pre-line">
                  {sec.content.body}
                </p>
              )}
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
