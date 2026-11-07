"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChametLogo } from "@/components/ui/ChametLogo";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY } from "@/data/company";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  onOpenGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Track window scroll for glassmorphism navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force close mobile menu and reset scroll whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    window.scrollTo(0, 0);
  }, [pathname]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMobileMenu();
    // Immediate instant scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [closeMobileMenu]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return next;
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0318]/95 backdrop-blur-xl border-b border-purple-500/20 py-2.5 sm:py-3 shadow-lg shadow-purple-950/50"
            : "bg-[#0B0318]/40 backdrop-blur-md py-3 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ChametLogo size="md" showCompanyName={true} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (item.dropdown) {
                  return (
                    <div
                      key={item.title}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        className={`flex items-center gap-1 px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all ${
                          isActive
                            ? "bg-brand-purple text-white shadow-md shadow-purple-900/50"
                            : "text-purple-100/90 hover:text-white hover:bg-white/10"
                        }`}
                        aria-expanded={servicesDropdownOpen}
                      >
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.12 }}
                            className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#16062E] border border-purple-500/30 backdrop-blur-2xl shadow-2xl p-2 z-50 overflow-hidden"
                          >
                            <div className="space-y-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setServicesDropdownOpen(false)}
                                  className="group flex flex-col p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white group-hover:text-brand-pink transition-colors">
                                      {subItem.title}
                                    </span>
                                    {subItem.badge && (
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-gold text-[#26005F]">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-purple-200/70 mt-0.5 leading-tight">
                                    {subItem.description}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all relative ${
                      isActive
                        ? "bg-brand-purple text-white shadow-md shadow-purple-900/50"
                        : "text-purple-100/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {onOpenGetStarted ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={onOpenGetStarted}
                  withArrow
                >
                  Get Started
                </Button>
              ) : (
                <Button variant="gold" size="sm" href="/contact" withArrow>
                  Get Started
                </Button>
              )}
            </div>

            {/* Mobile Header Controls: Join Us button + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              {onOpenGetStarted ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={onOpenGetStarted}
                  className="!px-3.5 !py-1.5 !text-xs font-bold shadow-md"
                >
                  Join Us
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  href="/contact"
                  className="!px-3.5 !py-1.5 !text-xs font-bold shadow-md"
                >
                  Join Us
                </Button>
              )}

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple"
                aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu — Fully Opaque & Instant Responsive */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0B0318] text-white"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0E031F]">
            <ChametLogo size="md" showCompanyName={true} />
            <button
              type="button"
              onClick={closeMobileMenu}
              className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
            {/* Home Link */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* Services Collapsible / Flat Section */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-gold px-2 py-1">
                <span>Services</span>
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              </div>

              <Link
                href="/services"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/services"
                    ? "bg-brand-purple text-white"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
              >
                All Services Overview
              </Link>

              <Link
                href="/services/e-commerce"
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/services/e-commerce"
                    ? "bg-brand-purple text-white"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>E-Commerce</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-pink text-white font-bold">
                  New
                </span>
              </Link>

              <Link
                href="/services/live-streaming"
                onClick={handleLinkClick}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/services/live-streaming"
                    ? "bg-brand-purple text-white"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>Live Streaming</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-gold text-[#26005F] font-bold">
                  Popular
                </span>
              </Link>

              <Link
                href="/services/playrooms-games"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/services/playrooms-games"
                    ? "bg-brand-purple text-white"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
              >
                Playrooms & Games
              </Link>

              <Link
                href="/services/social-connections"
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/services/social-connections"
                    ? "bg-brand-purple text-white"
                    : "text-purple-200 hover:text-white hover:bg-white/5"
                }`}
              >
                Dating & Social
              </Link>
            </div>

            {/* Other Core Pages */}
            <Link
              href="/about"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/about"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/vision"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/vision"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              Our Vision
            </Link>

            <Link
              href="/team"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/team"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              Our Team
            </Link>

            <Link
              href="/careers"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/careers"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              Careers
            </Link>

            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                pathname === "/contact"
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-900/50"
                  : "text-purple-100 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Bottom Actions: WhatsApp & Call & Get Started */}
          <div className="p-4 border-t border-white/10 space-y-3 bg-[#080112]">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={COMPANY.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={COMPANY.contact.phoneTel}
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4" />
                Call Office
              </a>
            </div>

            {onOpenGetStarted && (
              <Button
                variant="gold"
                size="md"
                fullWidth
                onClick={() => {
                  closeMobileMenu();
                  onOpenGetStarted();
                }}
                withArrow
              >
                Get Started with ManaVerse
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
