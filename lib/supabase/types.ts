export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          site_name: string;
          brand_name: string;
          experience_years: number;
          tagline: string;
          headline: string;
          subheadline: string;
          logo_url: string;
          favicon_url: string;
          contact_phone: string;
          contact_whatsapp: string;
          contact_email: string;
          primary_color: string;
          accent_color: string;
          maintenance_mode: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      home_hero_slides: {
        Row: {
          id: string;
          title: string;
          highlight_text: string;
          sub_title_tag: string;
          slide_badge: string;
          description: string;
          image_url: string;
          alt_text: string;
          video_url?: string;
          cta_text: string;
          cta_url: string;
          secondary_text: string;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      trust_features: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string;
          badge_text: string;
          display_order: number;
          is_published: boolean;
        };
      };
      ecosystem_features: {
        Row: {
          id: string;
          title: string;
          tagline: string;
          badge: string;
          description: string;
          image_url: string;
          accent_gradient: string;
          highlight_stat: string;
          cta_text: string;
          cta_url: string;
          display_order: number;
          is_published: boolean;
        };
      };
      featured_hosts: {
        Row: {
          id: string;
          name: string;
          role: string;
          category: string;
          followers: string;
          rating: number;
          avatar_bg: string;
          initials: string;
          is_live: boolean;
          tag: string;
          display_order: number;
          is_published: boolean;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          tagline: string;
          badge: string;
          short_desc: string;
          full_desc: string;
          hero_image?: string;
          icon_name: string;
          accent_gradient: string;
          stat_number: string;
          stat_label: string;
          display_order: number;
          is_published: boolean;
        };
      };
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          designation: string;
          department: string;
          image_url: string;
          market: string;
          location: string;
          phone?: string;
          phone_display?: string;
          phone_tel?: string;
          whatsapp_link?: string;
          email?: string;
          bio: string;
          skills: Json;
          achievements: Json;
          badge: string;
          is_verified: boolean;
          rank_order: number;
          is_published: boolean;
        };
      };
      job_openings: {
        Row: {
          id: string;
          title: string;
          department: string;
          location: string;
          job_type: string;
          experience: string;
          short_desc: string;
          full_desc: string;
          requirements: Json;
          responsibilities: Json;
          benefits: Json;
          is_active: boolean;
          display_order: number;
        };
      };
      job_applications: {
        Row: {
          id: string;
          job_id?: string;
          job_title: string;
          applicant_name: string;
          email: string;
          phone: string;
          experience_level?: string;
          portfolio_url?: string;
          cover_letter?: string;
          resume_url?: string;
          status: string;
          admin_notes?: string;
          created_at: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email?: string;
          subject: string;
          message: string;
          status: string;
          admin_notes?: string;
          created_at: string;
        };
      };
      office_locations: {
        Row: {
          id: string;
          location_type: string;
          name: string;
          address: string;
          landmark?: string;
          city: string;
          country: string;
          pincode?: string;
          phone?: string;
          is_head_office: boolean;
          display_order: number;
          is_active: boolean;
        };
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description?: string;
          is_published: boolean;
          seo_title?: string;
          seo_desc?: string;
          og_image?: string;
          created_at: string;
          updated_at: string;
        };
      };
      page_sections: {
        Row: {
          id: string;
          page_id: string;
          section_type: string;
          title?: string;
          subtitle?: string;
          content: Json;
          display_order: number;
          is_visible: boolean;
        };
      };
      media_assets: {
        Row: {
          id: string;
          name: string;
          public_id?: string;
          secure_url: string;
          media_type: string;
          format?: string;
          bytes?: number;
          width?: number;
          height?: number;
          folder?: string;
          alt_text?: string;
          created_at: string;
        };
      };
    };
  };
}
