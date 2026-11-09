import { supabase } from "@/lib/supabase/client";
import { COMPANY } from "@/data/company";
import { SERVICES, ServiceItem } from "@/data/services";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { JOB_OPENINGS, JobOpening } from "@/data/careers";
import { TOP_AGENCIES } from "@/data/agencies";
import { AGENCY_STORIES } from "@/data/stories";
import { NAV_ITEMS, NavItem } from "@/data/navigation";

/**
 * Live CMS Content Service with resilient offline fallback
 */
export const cmsService = {
  // 1. Site Settings & Brand Identity
  async getSiteSettings() {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error || !data) {
        return {
          name: COMPANY.name,
          brand: COMPANY.brand,
          experienceYears: COMPANY.experienceYears,
          tagline: COMPANY.tagline,
          headline: COMPANY.headline,
          subheadline: COMPANY.subheadline,
          contact: COMPANY.contact,
          logo: "/images/logo/chamet-logo.png",
          favicon: "/icon.svg",
        };
      }

      return {
        name: data.site_name,
        brand: data.brand_name,
        experienceYears: data.experience_years,
        tagline: data.tagline,
        headline: data.headline,
        subheadline: data.subheadline,
        contact: {
          phone: data.contact_phone,
          phoneDisplay: `+91 ${data.contact_phone}`,
          phoneTel: `tel:+91${data.contact_phone}`,
          whatsapp: data.contact_whatsapp,
          whatsappLink: `https://wa.me/91${data.contact_whatsapp}`,
          email: data.contact_email,
        },
        logo: data.logo_url,
        favicon: data.favicon_url,
      };
    } catch {
      return {
        name: COMPANY.name,
        brand: COMPANY.brand,
        experienceYears: COMPANY.experienceYears,
        tagline: COMPANY.tagline,
        headline: COMPANY.headline,
        subheadline: COMPANY.subheadline,
        contact: COMPANY.contact,
        logo: "/images/logo/chamet-logo.png",
        favicon: "/icon.svg",
      };
    }
  },

  // 2. Services Management
  async getServices(): Promise<ServiceItem[]> {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return SERVICES;
      }

      return data.map((item: any) => ({
        id: item.slug,
        slug: item.slug,
        title: item.title,
        tagline: item.tagline,
        badge: item.badge,
        shortDesc: item.short_desc,
        fullDesc: item.full_desc,
        heroImage: item.hero_image || "/images/hero/hero-slide-1.png",
        iconName: item.icon_name || "Radio",
        accentGradient: item.accent_gradient || "from-purple-600 to-pink-500",
        glowColor: "rgba(133,0,255,0.4)",
        stats: [
          { label: item.stat_label || "Active Users", value: item.stat_number || "100K+" },
        ],
        features: [],
        benefits: [],
        ctaText: "Inquire Now",
        statNumber: item.stat_number,
        statLabel: item.stat_label,
      }));
    } catch {
      return SERVICES;
    }
  },

  // 3. Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_published", true)
        .order("rank_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return TEAM_MEMBERS;
      }

      return data.map((m: any) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        designation: m.designation,
        department: m.department,
        image: m.image_url,
        market: m.market,
        location: m.location,
        phone: m.phone,
        phoneDisplay: m.phone_display,
        phoneTel: m.phone_tel,
        whatsappLink: m.whatsapp_link,
        email: m.email,
        bio: m.bio,
        skills: Array.isArray(m.skills) ? m.skills : [],
        achievements: Array.isArray(m.achievements) ? m.achievements : [],
        isVerified: m.is_verified ?? true,
        avatarColor: "from-purple-600 to-pink-500",
        badge: m.badge,
        rankOrder: m.rank_order || 1,
      }));
    } catch {
      return TEAM_MEMBERS;
    }
  },

  // 4. Careers & Job Openings
  async getJobOpenings(): Promise<JobOpening[]> {
    try {
      const { data, error } = await supabase
        .from("job_openings")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return JOB_OPENINGS;
      }

      return data.map((j: any) => ({
        id: j.id,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.job_type,
        experience: j.experience,
        shortDesc: j.short_desc,
        fullDesc: j.full_desc,
        requirements: Array.isArray(j.requirements) ? j.requirements : [],
        responsibilities: Array.isArray(j.responsibilities) ? j.responsibilities : [],
        benefits: Array.isArray(j.benefits) ? j.benefits : [],
      }));
    } catch {
      return JOB_OPENINGS;
    }
  },

  // 5. Office Locations
  async getOfficeLocations() {
    try {
      const { data, error } = await supabase
        .from("office_locations")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return COMPANY.offices;
      }

      return data.map((o: any) => ({
        type: o.location_type,
        name: o.name,
        address: o.address,
        landmark: o.landmark,
        city: o.city,
        country: o.country,
        pincode: o.pincode,
        phone: o.phone,
        isHeadOffice: o.is_head_office,
      }));
    } catch {
      return COMPANY.offices;
    }
  },

  // 6. Navigation Items
  async getNavigation(): Promise<NavItem[]> {
    try {
      const { data, error } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return NAV_ITEMS;
      }

      return data.map((n: any) => ({
        title: n.title,
        href: n.href,
        dropdown: Array.isArray(n.dropdown_items) ? n.dropdown_items : undefined,
      }));
    } catch {
      return NAV_ITEMS;
    }
  },

  // 7. Dynamic Pages
  async getDynamicPage(slug: string) {
    try {
      const { data, error } = await supabase
        .from("pages")
        .select("*, page_sections(*)")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) return null;
      return data;
    } catch {
      return null;
    }
  },

  // 8. Hero Slides with Live Supabase sync
  async getHeroSlides() {
    try {
      const { data, error } = await supabase
        .from("home_hero_slides")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return null;
      }

      return data.map((item: any, idx: number) => ({
        id: item.display_order || idx + 1,
        image: item.image_url || "/images/hero/hero-slide-1.png",
        alt: `${item.title || "ManaVerse"} ${item.highlight_text || ""}`,
        slideBadge: item.slide_badge || "Live Interactive Broadcasting",
        headingHighlight: item.highlight_text || "Technologies Pvt. Ltd.",
        subTitleTag: item.sub_title_tag || "Play • Connect • Earn • Grow",
        description: item.description || "",
        ctaText: item.cta_text || "Explore Services",
        featurePill: item.slide_badge || "Top Ranked Platform",
      }));
    } catch {
      return null;
    }
  },
};
