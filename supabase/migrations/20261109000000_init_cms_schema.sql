-- ==============================================================================
-- MANAVERSE TECHNOLOGIES (CHAMET) - COMPLETE SUPABASE CMS DATABASE SCHEMA
-- Migration: 20261109000000_init_cms_schema.sql
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ADMIN ROLES & PROFILES
CREATE TABLE IF NOT EXISTS public.admin_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Super Admin',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SITE SETTINGS & BRAND CONFIG
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR(255) NOT NULL DEFAULT 'ManaVerse Technologies Pvt. Ltd.',
    brand_name VARCHAR(100) NOT NULL DEFAULT 'Chamet',
    experience_years INTEGER NOT NULL DEFAULT 11,
    tagline TEXT DEFAULT 'Play • Connect • Earn • Grow',
    headline TEXT DEFAULT 'Innovating Entertainment, Empowering Lives',
    subheadline TEXT DEFAULT 'Your ultimate platform for entertainment, social connections, and earning opportunities.',
    logo_url TEXT DEFAULT '/images/logo/chamet-logo.png',
    favicon_url TEXT DEFAULT '/icon.svg',
    contact_phone VARCHAR(50) DEFAULT '8555896346',
    contact_whatsapp VARCHAR(50) DEFAULT '8555896346',
    contact_email VARCHAR(255) DEFAULT 'contact@manaverse.com',
    primary_color VARCHAR(20) DEFAULT '#8500FF',
    accent_color VARCHAR(20) DEFAULT '#FF29D6',
    maintenance_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. HOME HERO SLIDES
CREATE TABLE IF NOT EXISTS public.home_hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    sub_title_tag VARCHAR(255),
    slide_badge VARCHAR(255),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    video_url TEXT,
    cta_text VARCHAR(100) DEFAULT 'Explore Services',
    cta_url VARCHAR(255) DEFAULT '/services',
    secondary_text VARCHAR(100) DEFAULT 'Watch Story',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRUST & HIGHLIGHT FEATURES
CREATE TABLE IF NOT EXISTS public.trust_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) DEFAULT 'Shield',
    badge_text VARCHAR(100),
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ECOSYSTEM FEATURES (5-Slide Showcase)
CREATE TABLE IF NOT EXISTS public.ecosystem_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    badge VARCHAR(100),
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    accent_gradient VARCHAR(100) DEFAULT 'from-purple-600 to-pink-500',
    highlight_stat VARCHAR(100),
    cta_text VARCHAR(100) DEFAULT 'Explore Live Rooms',
    cta_url VARCHAR(255) DEFAULT '/services/live-streaming',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. FEATURED HOSTS & BROADCASTERS
CREATE TABLE IF NOT EXISTS public.featured_hosts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    followers VARCHAR(50) DEFAULT '1.2M',
    rating NUMERIC(3, 2) DEFAULT 4.90,
    avatar_bg VARCHAR(100) DEFAULT 'from-pink-500 to-purple-600',
    initials VARCHAR(10) DEFAULT 'SR',
    is_live BOOLEAN DEFAULT TRUE,
    tag VARCHAR(100) DEFAULT 'Trending #1',
    image_url TEXT,
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    tagline TEXT NOT NULL,
    badge VARCHAR(100) DEFAULT 'Enterprise',
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    hero_image TEXT,
    icon_name VARCHAR(50) DEFAULT 'Radio',
    accent_gradient VARCHAR(100) DEFAULT 'from-purple-600 to-pink-500',
    stat_number VARCHAR(50) DEFAULT '100K+',
    stat_label VARCHAR(100) DEFAULT 'Active Users',
    whatsapp_cta_text VARCHAR(100) DEFAULT 'Inquire on WhatsApp',
    seo_title VARCHAR(255),
    seo_desc TEXT,
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. SERVICE FEATURES
CREATE TABLE IF NOT EXISTS public.service_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    badge VARCHAR(100),
    icon_name VARCHAR(50) DEFAULT 'Sparkles',
    image_url TEXT,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. COMPANY STATS
CREATE TABLE IF NOT EXISTS public.company_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(255) NOT NULL,
    numeric_value VARCHAR(50) NOT NULL,
    prefix VARCHAR(20) DEFAULT '',
    suffix VARCHAR(20) DEFAULT '',
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'TrendingUp',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ABOUT CONTENT & TIMELINE MILESTONES
CREATE TABLE IF NOT EXISTS public.about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hero_title VARCHAR(255) NOT NULL,
    hero_subtitle TEXT,
    intro_p1 TEXT NOT NULL,
    intro_p2 TEXT NOT NULL,
    mission_text TEXT NOT NULL,
    vision_text TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.company_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(100),
    icon_name VARCHAR(50) DEFAULT 'Award',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. VISION, MISSION & CORE VALUES
CREATE TABLE IF NOT EXISTS public.vision_mission (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vision_title VARCHAR(255) NOT NULL,
    vision_description TEXT NOT NULL,
    mission_title VARCHAR(255) NOT NULL,
    mission_description TEXT NOT NULL,
    commitment_text TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.core_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tagline VARCHAR(255),
    icon_name VARCHAR(50) DEFAULT 'Sparkles',
    accent_color VARCHAR(100) DEFAULT 'from-purple-600 to-pink-500',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. TEAM DEPARTMENTS & TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    display_order INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    market VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    phone_display VARCHAR(50),
    phone_tel VARCHAR(50),
    whatsapp_link TEXT,
    email VARCHAR(255),
    bio TEXT NOT NULL,
    skills JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    badge VARCHAR(100) DEFAULT 'Leadership',
    is_verified BOOLEAN DEFAULT TRUE,
    rank_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. JOB OPENINGS & APPLICATIONS
CREATE TABLE IF NOT EXISTS public.job_openings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) DEFAULT 'Full-Time',
    experience VARCHAR(100) DEFAULT '2-5 Years',
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    requirements JSONB DEFAULT '[]'::jsonb,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.job_openings(id) ON DELETE SET NULL,
    job_title VARCHAR(255) NOT NULL,
    applicant_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    experience_level VARCHAR(100),
    portfolio_url TEXT,
    cover_letter TEXT,
    resume_url TEXT,
    status VARCHAR(50) DEFAULT 'New', -- New, Under Review, Shortlisted, Interview, Selected, Rejected
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. CONTACT INQUIRIES & MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New', -- New, Contacted, In Progress, Resolved
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. OFFICE LOCATIONS
CREATE TABLE IF NOT EXISTS public.office_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location_type VARCHAR(50) NOT NULL, -- Head Office, Branch Office
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    landmark VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    phone VARCHAR(50),
    is_head_office BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. NAVIGATION ITEMS
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    href VARCHAR(255) NOT NULL,
    dropdown_items JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. FOOTER SETTINGS & SOCIAL LINKS
CREATE TABLE IF NOT EXISTS public.footer_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_description TEXT NOT NULL,
    copyright_text VARCHAR(255) NOT NULL DEFAULT '© 2026 ManaVerse Technologies Pvt. Ltd. All rights reserved.',
    uk_address TEXT,
    india_address TEXT,
    phone VARCHAR(50) DEFAULT '8555896346',
    whatsapp VARCHAR(50) DEFAULT '8555896346',
    email VARCHAR(255) DEFAULT 'Currently unavailable.',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50) DEFAULT 'Globe',
    display_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 19. DYNAMIC PAGES & PAGE BUILDER SECTIONS
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    seo_title VARCHAR(255),
    seo_desc TEXT,
    og_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL, -- hero, text, image, gallery, video, features, stats, cta
    title VARCHAR(255),
    subtitle TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    display_order INTEGER DEFAULT 1,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. MEDIA ASSETS (Cloudinary integrated)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    public_id VARCHAR(255),
    secure_url TEXT NOT NULL,
    media_type VARCHAR(20) DEFAULT 'image', -- image, video, document
    format VARCHAR(20),
    bytes INTEGER,
    width INTEGER,
    height INTEGER,
    folder VARCHAR(100) DEFAULT '/manaverse',
    alt_text VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. SEO METADATA
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_path VARCHAR(255) UNIQUE NOT NULL,
    meta_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    og_image TEXT,
    canonical_url VARCHAR(255),
    is_indexed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. LEGAL PAGES (Privacy Policy & Terms)
CREATE TABLE IF NOT EXISTS public.legal_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL, -- privacy-policy, terms
    title VARCHAR(255) NOT NULL,
    last_updated VARCHAR(100) DEFAULT 'November 2026',
    sections JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. ADMIN ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100) NOT NULL,
    record_id VARCHAR(255),
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecosystem_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vision_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS FOR CMS CONTENT TABLES
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Hero Slides" ON public.home_hero_slides FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Trust Features" ON public.trust_features FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Ecosystem" ON public.ecosystem_features FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Hosts" ON public.featured_hosts FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Service Features" ON public.service_features FOR SELECT USING (true);
CREATE POLICY "Public Read Stats" ON public.company_stats FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read About Content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Public Read Milestones" ON public.company_milestones FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Vision Mission" ON public.vision_mission FOR SELECT USING (true);
CREATE POLICY "Public Read Core Values" ON public.core_values FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Team Members" ON public.team_members FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Team Departments" ON public.team_departments FOR SELECT USING (true);
CREATE POLICY "Public Read Job Openings" ON public.job_openings FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Office Locations" ON public.office_locations FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Navigation" ON public.navigation_items FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Footer" ON public.footer_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON public.social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Pages" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Page Sections" ON public.page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public Read Media Assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public Read SEO" ON public.seo_metadata FOR SELECT USING (true);
CREATE POLICY "Public Read Legal Pages" ON public.legal_pages FOR SELECT USING (true);

-- PUBLIC INSERT ACCESS FOR FORMS (Submissions)
CREATE POLICY "Public Insert Inquiries" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Applications" ON public.job_applications FOR INSERT WITH CHECK (true);

-- FULL ACCESS POLICIES (Supabase authenticated / service role / admin)
CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Admin Full Access Hero Slides" ON public.home_hero_slides FOR ALL USING (true);
CREATE POLICY "Admin Full Access Trust Features" ON public.trust_features FOR ALL USING (true);
CREATE POLICY "Admin Full Access Ecosystem" ON public.ecosystem_features FOR ALL USING (true);
CREATE POLICY "Admin Full Access Hosts" ON public.featured_hosts FOR ALL USING (true);
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL USING (true);
CREATE POLICY "Admin Full Access Service Features" ON public.service_features FOR ALL USING (true);
CREATE POLICY "Admin Full Access Stats" ON public.company_stats FOR ALL USING (true);
CREATE POLICY "Admin Full Access About" ON public.about_content FOR ALL USING (true);
CREATE POLICY "Admin Full Access Milestones" ON public.company_milestones FOR ALL USING (true);
CREATE POLICY "Admin Full Access Vision" ON public.vision_mission FOR ALL USING (true);
CREATE POLICY "Admin Full Access Core Values" ON public.core_values FOR ALL USING (true);
CREATE POLICY "Admin Full Access Team" ON public.team_members FOR ALL USING (true);
CREATE POLICY "Admin Full Access Departments" ON public.team_departments FOR ALL USING (true);
CREATE POLICY "Admin Full Access Jobs" ON public.job_openings FOR ALL USING (true);
CREATE POLICY "Admin Full Access Applications" ON public.job_applications FOR ALL USING (true);
CREATE POLICY "Admin Full Access Contact Messages" ON public.contact_messages FOR ALL USING (true);
CREATE POLICY "Admin Full Access Offices" ON public.office_locations FOR ALL USING (true);
CREATE POLICY "Admin Full Access Navigation" ON public.navigation_items FOR ALL USING (true);
CREATE POLICY "Admin Full Access Footer" ON public.footer_settings FOR ALL USING (true);
CREATE POLICY "Admin Full Access Social Links" ON public.social_links FOR ALL USING (true);
CREATE POLICY "Admin Full Access Pages" ON public.pages FOR ALL USING (true);
CREATE POLICY "Admin Full Access Page Sections" ON public.page_sections FOR ALL USING (true);
CREATE POLICY "Admin Full Access Media Assets" ON public.media_assets FOR ALL USING (true);
CREATE POLICY "Admin Full Access SEO" ON public.seo_metadata FOR ALL USING (true);
CREATE POLICY "Admin Full Access Legal Pages" ON public.legal_pages FOR ALL USING (true);
CREATE POLICY "Admin Full Access Admin Profiles" ON public.admin_profiles FOR ALL USING (true);
CREATE POLICY "Admin Full Access Activity Logs" ON public.admin_activity_logs FOR ALL USING (true);

