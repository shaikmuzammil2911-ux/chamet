"use client";

import React from "react";
import Link from "next/link";
import { ChametLogo } from "@/components/ui/ChametLogo";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { NAV_ITEMS } from "@/data/navigation";
import {
  Phone,
  MessageCircle,
  MapPin,
  Heart,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#090216] border-t border-purple-500/20 text-purple-200/90 pt-16 pb-8 overflow-hidden">
      {/* Top ambient glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF29D6]/50 to-transparent" />

      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Mission (Col 1 - 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ChametLogo size="lg" showCompanyName={true} />
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed pt-2">
              {COMPANY.description}
            </p>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-purple-200/90">
              <strong className="text-brand-gold block mb-1">Our Mission</strong>
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
                  <span>View All Services</span>
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

        {/* Social Media & Legal Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 text-xs text-purple-300/70">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">Follow Us:</span>
            <div className="flex items-center gap-3">
              {[
                { name: "Facebook", href: "https://facebook.com" },
                { name: "YouTube", href: "https://youtube.com" },
                { name: "Instagram", href: "https://instagram.com" },
                { name: "Telegram", href: "https://telegram.org" },
                { name: "X", href: "https://x.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-purple-200 hover:text-white transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-purple-400/40" />
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Bottom Copyright & Tagline */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-400/80">
          <p>© 2026 ManaVerse Technologies Pvt. Ltd. All Rights Reserved.</p>
          <p className="font-serif italic text-brand-gold tracking-wide">
            {COMPANY.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};
