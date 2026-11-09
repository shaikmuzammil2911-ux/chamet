"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChametLogo } from "@/components/ui/ChametLogo";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { NAV_ITEMS } from "@/data/navigation";
import {
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide public footer on admin panel pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      color: "from-[#1877F2] to-[#0D5BB5]",
      glow: "hover:shadow-[0_0_25px_rgba(24,119,242,0.6)] hover:border-[#1877F2]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      color: "from-[#FF0000] to-[#C40000]",
      glow: "hover:shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:border-[#FF0000]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      color: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
      glow: "hover:shadow-[0_0_25px_rgba(253,29,29,0.6)] hover:border-[#fd1d1d]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: "https://telegram.org",
      color: "from-[#2AABEE] to-[#229ED9]",
      glow: "hover:shadow-[0_0_25px_rgba(42,171,238,0.6)] hover:border-[#2AABEE]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.196 1.006.128.832.942z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://x.com",
      color: "from-[#2C184D] via-[#1B0C33] to-[#000000]",
      glow: "hover:shadow-[0_0_25px_rgba(255,41,214,0.5)] hover:border-brand-pink",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: COMPANY.contact.whatsappLink,
      color: "from-[#25D366] to-[#128C7E]",
      glow: "hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:border-[#25D366]",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-[#090216] border-t border-purple-500/20 text-purple-200/90 pt-16 pb-10 overflow-hidden">
      {/* Top ambient glow line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF29D6] to-transparent" />

      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Mission (Col 1 - 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ChametLogo size="lg" showCompanyName={true} />
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed pt-2">
              {COMPANY.description}
            </p>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-[#1F073E]/70 border border-purple-500/30 text-xs text-purple-200/90 shadow-lg">
              <strong className="text-brand-gold flex items-center gap-1.5 mb-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                Our Core Mission
              </strong>
              <span>{COMPANY.mission}</span>
            </div>
          </div>

          {/* Quick Navigation Links (Col 2 - 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-pink transition-colors inline-block py-0.5"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (Col 3 - 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-brand-gold transition-colors inline-block py-0.5"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-brand-pink hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Explore All Services</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Corporate Info (Col 4 - 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact & Offices
            </h4>

            <div className="space-y-2.5 text-xs text-purple-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">UK Head Office:</strong>
                  <span>Velina Colony Street, Near Fashion Showroom, London, UK.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">India Branch:</strong>
                  <span>HSR Layout, Bengaluru, Karnataka, India – 560102.</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={COMPANY.contact.phoneTel}
                  className="hover:text-white font-semibold transition-colors"
                >
                  Phone: {COMPANY.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={COMPANY.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: {COMPANY.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GRAND-LEVEL SOCIAL MEDIA ICONS & LEGAL SECTION (ENCIRCLED IN IMAGE) */}
        <div className="py-8 border-b border-white/10 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left: Follow Title & Badge */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-gold font-extrabold block">
                  Connect With Us
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Follow Our Global Chamet Community
                </h4>
              </div>
            </div>

            {/* Center / Right: Grand-level Colored 3D Social Icons */}
            <div className="flex items-center justify-center flex-wrap gap-3.5 sm:gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ManaVerse on ${item.name}`}
                  className={`
                    group relative flex items-center justify-center
                    w-11 h-11 sm:w-12 sm:h-12 rounded-2xl
                    bg-gradient-to-tr ${item.color}
                    text-white
                    p-0.5
                    border border-white/20
                    shadow-lg shadow-black/40
                    transition-all duration-300
                    hover:scale-115 hover:-translate-y-1 active:scale-95
                    ${item.glow}
                  `}
                >
                  {/* Subtle inner dark gradient for depth */}
                  <div className="w-full h-full rounded-[14px] bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-transparent transition-colors">
                    {item.icon}
                  </div>

                  {/* Tooltip on hover */}
                  <span className="pointer-events-none absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-bold text-white bg-black/90 px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Pages Glass Links */}
          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs pt-2">
            <Link
              href="/privacy-policy"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-purple-200 hover:text-white transition-all font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-purple-500">•</span>
            <Link
              href="/terms"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-purple-200 hover:text-white transition-all font-medium"
            >
              Terms & Conditions
            </Link>
            <span className="text-purple-500">•</span>
            <Link
              href="/admin/login"
              className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-brand-purple/30 border border-white/10 text-brand-gold hover:text-white transition-all font-semibold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-400/80 text-center sm:text-left">
          <p>© 2026 ManaVerse Technologies Pvt. Ltd. All Rights Reserved.</p>
          <p className="font-serif italic text-brand-gold tracking-wide text-sm">
            {COMPANY.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};
