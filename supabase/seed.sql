-- ==============================================================================
-- MANAVERSE TECHNOLOGIES (CHAMET) - COMPLETE SEED SCRIPT
-- Idempotent, safe to rerun without creating duplicates
-- ==============================================================================

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (
    id, site_name, brand_name, experience_years, tagline, headline, subheadline,
    contact_phone, contact_whatsapp, contact_email, logo_url, favicon_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'ManaVerse Technologies Pvt. Ltd.',
    'Chamet',
    11,
    'Play • Connect • Earn • Grow',
    'Innovating Entertainment, Empowering Lives',
    'Your ultimate platform for entertainment, social connections, and earning opportunities.',
    '8555896346',
    '8555896346',
    'contact@manaverse.com',
    '/images/logo/chamet-logo.png',
    '/icon.svg'
) ON CONFLICT (id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    experience_years = EXCLUDED.experience_years,
    contact_phone = EXCLUDED.contact_phone,
    contact_whatsapp = EXCLUDED.contact_whatsapp,
    updated_at = NOW();

-- 2. ADMIN PROFILE (Default Super Admin)
INSERT INTO public.admin_profiles (
    id, email, full_name, role, is_active
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    'admin@manaverse.com',
    'ManaVerse Super Admin',
    'Super Admin',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- 3. HOME HERO SLIDES
DELETE FROM public.home_hero_slides;
INSERT INTO public.home_hero_slides (
    title, highlight_text, sub_title_tag, slide_badge, description,
    image_url, alt_text, cta_text, cta_url, secondary_text, display_order, is_published
) VALUES
(
    'ManaVerse', 'Technologies Pvt. Ltd.',
    'Play • Connect • Earn • Grow', 'Live Interactive Broadcasting',
    'Your ultimate platform for entertainment, social connections, and earning opportunities. Join millions celebrating talents and building financial independence.',
    '/images/hero/hero-slide-1.png', 'Chamet Live Host and Interactive Entertainment',
    'Explore Services', '/services', 'Watch Video', 1, TRUE
),
(
    'ManaVerse', 'Global Digital Community',
    'Voice • Stream • Collaborate • Win', 'Voice Party Rooms & Gaming',
    'Host multi-seat voice lounges, stream high-fidelity gaming moments, and exchange breathtaking 3D virtual gifts with audiences spanning over 150 countries.',
    '/images/hero/hero-slide-2.png', 'Chamet Audio Party Rooms and Gaming Streamers',
    'Join Party Rooms', '/services/playrooms-games', 'Explore Games', 2, TRUE
),
(
    'ManaVerse', 'Empowering Lives Daily',
    'Connect • Share • Celebrate • Belong', 'Authentic Social Connections',
    'Explore dynamic short video reels, meet genuine verified individuals, and build sustainable livelihood opportunities with reliable, timely host payouts.',
    '/images/hero/hero-slide-3.png', 'Chamet Social Connections and Reels Experience',
    'Discover Connections', '/services/social-connections', 'Become a Host', 3, TRUE
);

-- 4. TRUST FEATURES (Highlights Bar)
DELETE FROM public.trust_features;
INSERT INTO public.trust_features (title, description, icon_name, badge_text, display_order, is_published)
VALUES
('Independent Livelihoods', 'Providing predictable, secure earnings for women hosts & creators globally.', 'HeartHandshake', 'Family Support', 1, TRUE),
('100% Verified Profiles', 'Advanced face verification and human safety moderators available 24/7.', 'ShieldCheck', 'Safety First', 2, TRUE),
('Global Entertainment', 'Over 150 countries enjoying low-latency video and audio celebrations.', 'Sparkles', 'Global Reach', 3, TRUE),
('Enterprise Payouts', 'Automated bi-weekly banking transfers with full transaction transparency.', 'CheckCircle2', 'Guaranteed Settlement', 4, TRUE);

-- 5. ECOSYSTEM FEATURES (6-Slide My Chamet Journey Showcase)
DELETE FROM public.ecosystem_features;
INSERT INTO public.ecosystem_features (
    title, tagline, badge, description, image_url, accent_gradient, highlight_stat, cta_text, cta_url, display_order, is_published
) VALUES
(
    'My Chamet Journey - Sarika',
    'Happiness & Support With Chamet',
    'Sarika''s Story',
    'Overcoming challenges from a middle-class family and discovering genuine happiness and support on Chamet.',
    '/images/journey/journey-sarika.png',
    'from-purple-600 to-amber-500',
    'Featured Story #1',
    'Join Chamet Today',
    '/services/live-streaming',
    1, TRUE
),
(
    'My Chamet Journey - Angel',
    'Real Creator Inspiration',
    'Angel''s Story',
    'Inspiring journey with Chamet - connect, play, and share happy moments with friends worldwide.',
    '/images/journey/journey-angel.png',
    'from-purple-600 to-pink-500',
    'Verified Host Story',
    'Join Chamet Today',
    '/services/live-streaming',
    2, TRUE
),
(
    'My Chamet Journey - Alone',
    'Tailor Business to Creative Freedom',
    'Alone''s Story',
    'Balancing family and creative broadcasting with predictable earning opportunities on Chamet.',
    '/images/journey/journey-alone.png',
    'from-pink-500 to-rose-600',
    'Middle Class Empowerment',
    'Join Chamet Today',
    '/services/live-streaming',
    3, TRUE
),
(
    'My Chamet Journey - Maha',
    'Village Roots to Digital Success',
    'Maha''s Story',
    'Finding friends, funding education, and creating financial independence with Chamet.',
    '/images/journey/journey-maha.png',
    'from-blue-600 to-purple-600',
    'College Student Success',
    'Join Chamet Today',
    '/services/live-streaming',
    4, TRUE
),
(
    'My Chamet Journey - Sanvi',
    'Happiness & Sustainable Support',
    'Sanvi''s Story',
    'Heartfelt stories of party room hosting, casual gaming, and genuine community bond.',
    '/images/journey/journey-sanvi.png',
    'from-amber-500 to-purple-600',
    'Community Pillar',
    'Join Chamet Today',
    '/services/live-streaming',
    5, TRUE
),
(
    'My Chamet Journey - Swetha',
    'True Financial Empowerment',
    'Swetha''s Story',
    'Referring 10+ hosts and building a verified network of successful broadcasters.',
    '/images/journey/journey-swetha.png',
    'from-emerald-500 to-teal-600',
    '10+ Referrals',
    'Join Chamet Today',
    '/services/live-streaming',
    6, TRUE
);

-- 6. FEATURED HOSTS
DELETE FROM public.featured_hosts;
INSERT INTO public.featured_hosts (
    name, role, category, followers, rating, avatar_bg, initials, is_live, tag, image_url, display_order, is_published
) VALUES
('Sophia Rivera', 'Top Live Broadcaster', 'Music & Vocals', '1.2M', 4.90, 'from-pink-500 via-rose-500 to-purple-600', 'SR', TRUE, 'Trending #1', '/images/journey/journey-angel.png', 1, TRUE),
('Aisha Kapoor', 'Party Lounge Host', 'Voice Playrooms', '950K', 4.90, 'from-purple-600 via-indigo-600 to-blue-500', 'AK', TRUE, 'Voice Star', '/images/journey/journey-alone.png', 2, TRUE),
('Elena Rostova', 'Interactive Host', 'Gaming & Battles', '780K', 4.80, 'from-amber-500 via-orange-500 to-rose-500', 'ER', FALSE, 'PK Duel Pro', '/images/journey/journey-swetha.png', 3, TRUE),
('Priya Sharma', 'Master Creator Mentor', 'Host Empowerment', '1.1M', 5.00, 'from-emerald-500 via-teal-600 to-purple-600', 'PS', TRUE, 'Top Mentor', '/images/journey/journey-sanvi.png', 4, TRUE),
('Carlos Diaz', 'DJ & Audio Master', 'Late Night Beats', '640K', 4.80, 'from-blue-600 via-cyan-500 to-purple-600', 'CD', TRUE, 'Audio DJ', '/images/team/jesus.png', 5, TRUE),
('Maya Song', 'Rising Star Streamer', 'Dance & Lifestyle', '520K', 4.90, 'from-violet-600 via-pink-500 to-amber-500', 'MS', TRUE, 'Rising Star', '/images/journey/journey-maha.png', 6, TRUE);

-- 7. SERVICES
DELETE FROM public.services;
INSERT INTO public.services (
    id, slug, title, tagline, badge, short_desc, full_desc, icon_name, accent_gradient, stat_number, stat_label, display_order, is_published
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    'e-commerce',
    'Interactive E-Commerce',
    'Next-Gen Live Video Shopping & Creator Marketplace',
    'Retail Reimagined',
    'Seamlessly merge live video broadcasts with direct purchasing. Real-time product demos, creator merchandise, and flash sales.',
    'ManaVerse interactive e-commerce combines the excitement of real-time livestream entertainment with friction-free digital shopping. Broadcasters and verified retail merchants showcase products with live demonstrations, answer viewer questions instantly in chat, and trigger limited-quantity interactive flash sales.',
    'ShoppingBag',
    'from-emerald-500 to-teal-700',
    '250K+',
    'Products Sold',
    1, TRUE
),
(
    '10000000-0000-0000-0000-000000000002',
    'live-streaming',
    'Real-Time Live Streaming',
    'Ultra-Low Latency Video Broadcasting & Virtual Gift Economies',
    'Flagship Platform',
    'Broadcast your talents to millions worldwide. High-definition video with sub-second latency and stunning 3D animated gifts.',
    'Our core live video broadcasting infrastructure delivers sub-second global latency across 150+ countries. Creators broadcast music, dance, talk shows, and educational content while audiences show appreciation through interactive 3D virtual gifts that convert into dependable, real-world income.',
    'Radio',
    'from-purple-600 to-pink-500',
    '1.5M+',
    'Daily Broadcast Hours',
    2, TRUE
),
(
    '10000000-0000-0000-0000-000000000003',
    'playrooms-games',
    'Audio Playrooms & Casual Gaming',
    'Multi-Seat Audio Lounges & Interactive Casual Games',
    'High Engagement',
    'Connect with friends across multi-seat voice rooms while playing popular casual games like Ludo, Carrom, and party challenges.',
    'Audio playrooms allow up to 12 simultaneous speakers and thousands of active listeners to chat, sing karaoke, and play casual multiplayer games without camera pressure. Integrated social games include classic board favorites, trivia, and competitive guild tournaments.',
    'Gamepad2',
    'from-amber-500 to-rose-600',
    '12M+',
    'Games Played Monthly',
    3, TRUE
),
(
    '10000000-0000-0000-0000-000000000004',
    'social-connections',
    'Authentic Social Connections',
    'Safe, Verified Matching & 1-on-1 Video Encounters',
    'Community Focused',
    'Form genuine friendships, find companions, and discover exciting conversations through verified profiles and smart matching.',
    'Our social connection features prioritize safety, respect, and emotional authenticity. Leveraging face verification and anti-harassment safeguards, members connect via 1-on-1 private video calls, audio conversations, and interest-based community clubs.',
    'Heart',
    'from-rose-500 to-purple-600',
    '45M+',
    'Meaningful Matches',
    4, TRUE
);

-- 8. COMPANY STATS
DELETE FROM public.company_stats;
INSERT INTO public.company_stats (label, numeric_value, suffix, description, icon_name, display_order, is_published)
VALUES
('Industry Experience', '11', ' Years', 'Pioneering live entertainment, creator monetization, and community building since 2013.', 'Award', 1, TRUE),
('Global Reach', '150', '+ Countries', 'Connecting hosts, gamers, and communities seamlessly across every continent.', 'Globe', 2, TRUE),
('Total Creator Payouts', '25', 'M+ USD', 'Dependable income distributed to women hosts and creator families worldwide.', 'DollarSign', 3, TRUE),
('Verified Active Broadcasters', '500', 'K+', 'Empowering individuals to turn creative passion into sustainable financial independence.', 'Users', 4, TRUE);

-- 9. TEAM MEMBERS
DELETE FROM public.team_members;
INSERT INTO public.team_members (
    name, role, designation, department, image_url, market, location,
    phone, phone_display, phone_tel, whatsapp_link, email, bio, skills, achievements, badge, rank_order, is_published
) VALUES
(
    'James Au',
    'CEO Chamet & Chillchat',
    'Chief Executive Officer',
    'Executive Leadership',
    '/images/team/james-au.png',
    'UK, America & Middle East Market',
    'London, UK (Global Headquarters)',
    NULL, NULL, NULL, NULL,
    'james.au@manaverse.com',
    'Visionary technology executive steering Chamet and Chillchat across Western Europe, the Americas, and Middle Eastern digital entertainment corridors. Spearheads global product strategy, high-concurrency RTC streaming infrastructure, international creator monetization, and worldwide platform safety standards.',
    '["Global Enterprise Strategy", "Interactive Social Platforms", "High-Concurrency RTC Media", "Cross-Continental Monetization", "Brand Ecosystems"]'::jsonb,
    '["Pioneered global expansion of Chamet across 150+ countries", "Executive architect behind Chillchat and Chamet ecosystem integration", "Built multi-million-dollar live streaming creator networks", "Spearheaded international safety compliance and creator welfare standards"]'::jsonb,
    'Chief Executive Officer', 1, TRUE
),
(
    'Koteswarao Gaddam',
    'Co-Founder (India Market)',
    'Co-Founder & Director of India Operations',
    'Executive Leadership',
    '/images/team/koteswarao-gaddam.png',
    'India Market & South Asia Corridor',
    'Bengaluru, Karnataka, India',
    '8555896346', '+91 8555896346', 'tel:+918555896346',
    'https://wa.me/918555896346?text=Hello%20Koteswarao%20Sir%2C%20I%20am%20contacting%20regarding%20ManaVerse%20%2F%20Chamet%20India.',
    'koteswarao.gaddam@manaverse.com',
    'Founding visionary driving ManaVerse Technologies and the Chamet platform across the Indian subcontinent. Deeply passionate about creator empowerment, financial inclusion for women broadcasters, agency network scaling, and ethical live streaming ecosystems that support thousands of families.',
    '["India Market Leadership", "Host & Creator Empowerment", "Talent Agency Guild Governance", "Sustainable Payout Infrastructures", "Strategic Business Partnerships"]'::jsonb,
    '["Co-founded and scaled ManaVerse Technologies Pvt. Ltd.", "Empowered thousands of women broadcasters with verified independent earnings", "Built extensive talent agency partnerships across Tier 1, 2 & 3 Indian cities", "Pioneered zero-delay direct financial settlement mechanisms for creators"]'::jsonb,
    'Co-Founder • India Market', 2, TRUE
),
(
    'Kota Kousalya',
    'Head of Sales (India)',
    'Director of Sales & Business Growth',
    'Sales & Business Development',
    '/images/team/kota-kousalya.png',
    'India Market',
    'Bengaluru, Karnataka, India',
    '80964 41494', '+91 80964 41494', 'tel:+918096441494',
    'https://wa.me/918096441494?text=Hello%20Kota%20Kousalya%20Ma''am%2C%20I%20am%20contacting%20regarding%20Chamet%20Sales%20%26%20Partnerships.',
    'kousalya.kota@manaverse.com',
    'Senior commercial strategist leading nationwide revenue growth, talent agency acquisition, brand alliances, and enterprise host recruitment programs across India. Champion for high-retention creator relationships and transparent agency monetization models.',
    '["Enterprise Sales Leadership", "Agency Network Acquisition", "Revenue Optimization", "Creator Relationship Management", "Commercial Expansion Strategy"]'::jsonb,
    '["Drove record-breaking quarter-on-quarter agency onboarding growth", "Established strategic alliances with over 150+ regional talent networks", "Spearheaded VIP host retention programs yielding 96% broadcast consistency", "Recognized for excellence in creator empowerment and commercial excellence"]'::jsonb,
    'Head of Sales • India', 3, TRUE
),
(
    'Jesus',
    'Sales Manager',
    'Senior Manager – Sales & Creator Partnerships',
    'Sales & Business Development',
    '/images/team/jesus.png',
    'India Market & Regional Guilds',
    'Bengaluru, Karnataka, India',
    '9392786785', '+91 9392786785', 'tel:+919392786785',
    'https://wa.me/919392786785?text=Hello%20Jesus%2C%20I%20am%20reaching%20out%20regarding%20Chamet%20Creator%20%26%20Agency%20Partnerships.',
    'jesus@manaverse.com',
    'Key commercial driver orchestrating regional agency onboarding, streamer negotiations, revenue tracking, and broadcaster support. Dedicated to ensuring every creator and agency achieves rapid growth and maximum monetization on Chamet.',
    '["Sales Pipeline Management", "Host Talent Acquisition", "Agency Performance Coaching", "Client Engagement & Retention", "Regional Market Penetration"]'::jsonb,
    '["Successfully launched 50+ new high-performing host agencies", "Delivered top-tier broadcaster recruitment metrics across Southern India", "Provides dedicated day-to-day operational support to top agency managers", "Consistently achieved outstanding customer satisfaction ratings"]'::jsonb,
    'Sales Manager', 4, TRUE
),
(
    'Keerthi Reddy',
    'Sales Manager',
    'Senior Manager – Business Development & Streamer Success',
    'Sales & Business Development',
    '/images/team/keerthi-reddy.png',
    'India Market & Southern Corridors',
    'Bengaluru, Karnataka, India',
    '7981640590', '+91 7981640590', 'tel:+917981640590',
    'https://wa.me/917981640590?text=Hello%20Keerthi%20Reddy%2C%20I%20am%20reaching%20out%20regarding%20Chamet%20Creator%20%26%20Agency%20Partnerships.',
    'keerthi.reddy@manaverse.com',
    'Dynamic sales leader focused on creator success journeys, agency relationship cultivation, event sponsorships, and host career mentorship. Champions host financial security and ensures streamlined settlement processes for signed creators.',
    '["Business Development", "Streamer Success & Mentorship", "Agency Growth Strategies", "Contract Negotiations", "Creator Career Pathways"]'::jsonb,
    '["Facilitated career pathways for hundreds of independent female broadcasters", "Expanded agency relationships throughout Telangana, Andhra Pradesh, and Karnataka", "Organized regional streamer workshops on professional broadcasting techniques", "Achieved stellar retention rates among managed agency partners"]'::jsonb,
    'Sales Manager', 5, TRUE
);

-- 10. OFFICE LOCATIONS
DELETE FROM public.office_locations;
INSERT INTO public.office_locations (
    location_type, name, address, landmark, city, country, pincode, phone, is_head_office, display_order, is_active
) VALUES
(
    'Head Office', 'United Kingdom Headquarters',
    'Velina Colony Street', 'Near Fashion Showroom',
    'London', 'UK', 'EC1A 1BB', '+44 20 7946 0912', TRUE, 1, TRUE
),
(
    'Branch Office', 'India Technology & Operations Hub',
    'HSR Layout, Sector 6', 'Near Outer Ring Road Junction',
    'Bengaluru, Karnataka', 'India', '560102', '8555896346', FALSE, 2, TRUE
);

-- 11. FOOTER SETTINGS
DELETE FROM public.footer_settings;
INSERT INTO public.footer_settings (
    brand_description, copyright_text, uk_address, india_address, phone, whatsapp, email
) VALUES (
    'ManaVerse Technologies Pvt. Ltd. develops and operates next-generation digital entertainment platforms. Empowering creators and communities globally through live streaming, voice playrooms, e-commerce, and safe social connections.',
    '© 2026 ManaVerse Technologies Pvt. Ltd. All rights reserved. Chamet is an official brand of ManaVerse.',
    'Velina Colony Street, Near Fashion Showroom, UK',
    'HSR Layout, Bengaluru, Karnataka, India – 560102',
    '8555896346',
    '8555896346',
    'Currently unavailable.'
);

-- 12. NAVIGATION ITEMS
DELETE FROM public.navigation_items;
INSERT INTO public.navigation_items (title, href, dropdown_items, is_active, display_order)
VALUES
('Home', '/', '[]'::jsonb, TRUE, 1),
('Services', '/services', '[
    {"title": "All Services Overview", "href": "/services", "description": "Explore our full suite of interactive entertainment solutions."},
    {"title": "E-Commerce", "href": "/services/e-commerce", "description": "Interactive video shopping and commerce platforms.", "badge": "New"},
    {"title": "Live Streaming", "href": "/services/live-streaming", "description": "Real-time broadcasting, host gifts & global reach.", "badge": "Popular"},
    {"title": "Playrooms & Games", "href": "/services/playrooms-games", "description": "Multi-seat audio party rooms & interactive gaming."},
    {"title": "Dating & Social", "href": "/services/social-connections", "description": "Genuine connections, verified profiles & meaningful chats."}
]'::jsonb, TRUE, 2),
('About Us', '/about', '[]'::jsonb, TRUE, 3),
('Our Vision', '/vision', '[]'::jsonb, TRUE, 4),
('Our Team', '/team', '[]'::jsonb, TRUE, 5),
('Careers', '/careers', '[]'::jsonb, TRUE, 6),
('Contact', '/contact', '[]'::jsonb, TRUE, 7);

