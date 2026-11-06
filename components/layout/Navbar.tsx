"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0F0624]/90 backdrop-blur-xl border-b border-purple-500/20 py-3 shadow-lg shadow-purple-950/40"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
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
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#16062E]/95 border border-purple-500/30 backdrop-blur-2xl shadow-2xl p-2 z-50 overflow-hidden"
                          >
                            <div className="space-y-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="group flex flex-col p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                                  onClick={() => setServicesDropdownOpen(false)}
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

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              {onOpenGetStarted ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={onOpenGetStarted}
                  className="!px-3.5 !py-1.5 !text-xs"
                >
                  Join Us
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  href="/contact"
                  className="!px-3.5 !py-1.5 !text-xs"
                >
                  Join Us
                </Button>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#0F0624]/98 backdrop-blur-2xl"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <ChametLogo size="md" showCompanyName={true} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                if (item.dropdown) {
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-white/[0.03] border border-white/5 p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm font-bold text-brand-gold px-2">
                        <span>{item.title}</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-sm font-medium text-purple-100 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span>{sub.title}</span>
                              {sub.badge && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-pink text-white font-bold">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-brand-purple text-white shadow-lg shadow-purple-900/50"
                        : "text-purple-100 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Contacts */}
            <div className="p-5 border-t border-white/10 space-y-3 bg-[#090216]/80">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={COMPANY.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={COMPANY.contact.phoneTel}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md"
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
                    setMobileMenuOpen(false);
                    onOpenGetStarted();
                  }}
                  withArrow
                >
                  Get Started with ManaVerse
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
