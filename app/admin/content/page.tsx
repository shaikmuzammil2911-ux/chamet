"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Home,
  Briefcase,
  Users,
  Compass,
  GraduationCap,
  Mail,
  FileText,
  ImageIcon,
  Search,
  Settings,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AdminContentHubPage() {
  const hubs = [
    {
      title: "Home Page CMS",
      desc: "Hero slider banners, trust highlights bar, ecosystem 5-slide carousel, and verified metrics.",
      href: "/admin/home",
      icon: Home,
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "Services Management",
      desc: "E-Commerce, Live Streaming, Playrooms & Games, Dating & Social Connections CRUD.",
      href: "/admin/services",
      icon: Briefcase,
      color: "from-pink-600 to-rose-600",
    },
    {
      title: "Team & Leadership",
      desc: "James Au (CEO), Koteswarao Gaddam (Co-Founder), Kota Kousalya, Jesus, Keerthi Reddy profiles.",
      href: "/admin/team",
      icon: Users,
      color: "from-amber-500 to-purple-600",
    },
    {
      title: "Careers & Recruitment",
      desc: "Job openings, experience requirements, application tracking, and candidate CV management.",
      href: "/admin/careers",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Contact & Offices",
      desc: "Helpline phone numbers, official WhatsApp link, London UK headquarters, Bengaluru tech hub.",
      href: "/admin/contact",
      icon: Mail,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "About Us & Milestones",
      desc: "11-year company narrative, foundation story, and timeline milestones from 2013 to 2026.",
      href: "/admin/about",
      icon: FileText,
      color: "from-violet-600 to-pink-500",
    },
    {
      title: "Vision, Mission & Values",
      desc: "Host empowerment mission, safety commitment, and core operating pillars.",
      href: "/admin/vision",
      icon: Compass,
      color: "from-purple-600 to-pink-500",
    },
    {
      title: "Cloudinary Media Library",
      desc: "High-resolution media asset uploads, video streams, and CDN URL generation.",
      href: "/admin/media",
      icon: ImageIcon,
      color: "from-rose-500 to-amber-500",
    },
    {
      title: "Dynamic Page Builder",
      desc: "Construct new landing pages with custom URLs and modular sections.",
      href: "/admin/pages",
      icon: Layers,
      color: "from-indigo-600 to-blue-500",
    },
    {
      title: "SEO & Social Sharing",
      desc: "Meta titles, descriptions, Open Graph preview cards, and indexing controls.",
      href: "/admin/seo",
      icon: Search,
      color: "from-teal-600 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5 text-brand-gold" />
          <span>Unified CMS Navigation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Website Content Management Hub
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
          Select any public section below to edit live website content, replace media, or publish new updates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.href}
              href={hub.href}
              className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 hover:border-brand-pink/50 transition-all flex flex-col justify-between space-y-4 group shadow-xl shadow-purple-950/40"
            >
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${hub.color} p-0.5 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-white group-hover:text-pink-300 transition-colors">
                  {hub.title}
                </h3>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  {hub.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-brand-gold group-hover:text-white transition-colors pt-2 border-t border-white/5">
                <span>Open Editor</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

