"use client";

import React, { useState } from "react";
import { COMPANY } from "@/data/company";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Compass,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9+-\s]{7,15}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid phone number";
    }
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Please write your message";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="pt-28 pb-20 overflow-hidden">
      {/* Hero Header */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/40 text-purple-200 text-xs font-bold mb-4 backdrop-blur-md">
          <Phone className="w-3.5 h-3.5 text-brand-gold" />
          <span>Contact ManaVerse Technologies</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Get in Touch With <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-pink">
            Our Corporate Team
          </span>
        </h1>

        <p className="text-purple-100/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-3">
          Have an inquiry regarding live host opportunities, media partnerships, or platform support? Reach us through direct phone, WhatsApp, or our inquiry desk.
        </p>
      </section>

      {/* Main Grid: Contact Details Left & Form Right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Phone, WhatsApp & Office Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Card (Call & WhatsApp) */}
            <GlassCard glowColor="gold" className="p-6 sm:p-7">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                Instant Assistance
              </span>
              <h2 className="text-xl font-bold text-white mt-1 mb-4">
                Call or Chat Directly
              </h2>

              <div className="space-y-3">
                <a
                  href={COMPANY.contact.phoneTel}
                  className="p-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-brand-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-purple-300">Direct Phone</div>
                      <div className="text-base font-bold text-white tracking-wide">
                        {COMPANY.contact.phone}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-gold px-3 py-1 rounded-full bg-brand-gold/10">
                    Call Now
                  </span>
                </a>

                <a
                  href={COMPANY.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-300">WhatsApp Desk</div>
                      <div className="text-base font-bold text-white tracking-wide">
                        {COMPANY.contact.whatsapp}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-[#25D366]">
                    Chat
                  </span>
                </a>
              </div>
            </GlassCard>

            {/* Office Locations */}
            <GlassCard glowColor="purple" className="p-6 sm:p-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                Registered Physical Locations
              </span>
              <h2 className="text-xl font-bold text-white">Our Offices</h2>

              {/* Head Office */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs uppercase tracking-wider text-brand-gold font-extrabold">
                    Head Office (UK)
                  </strong>
                  <span className="text-[10px] text-purple-300">United Kingdom</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                  Velina Colony Street, Near Fashion Showroom, London, UK.
                </p>
              </div>

              {/* Branch Office */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs uppercase tracking-wider text-brand-pink font-extrabold">
                    Branch Office (India)
                  </strong>
                  <span className="text-[10px] text-purple-300">Bengaluru</span>
                </div>
                <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                  HSR Layout, Bengaluru, Karnataka, India – 560102.
                </p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=HSR+Layout+Bengaluru+Karnataka+560102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:underline font-semibold"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Get Directions to Bengaluru Office</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard glowColor="purple" className="p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                Online Inquiry Portal
              </span>
              <h2 className="text-2xl font-bold text-white mt-1 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/80 mb-6">
                Fill out the form below. We will review your query and respond swiftly.
              </p>

              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Thank You!</h3>
                  <p className="text-purple-200/90 text-sm max-w-md mx-auto">
                    Your inquiry has been received. Our team will contact you at{" "}
                    <strong className="text-brand-gold">{formData.phone}</strong>.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        subject: "General Inquiry",
                        message: "",
                      });
                    }}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-purple-200 mb-1">
                        Full Name <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-purple-200 mb-1">
                        Phone Number <span className="text-brand-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 8555896346"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-purple-200 mb-1">
                        Email Address <span className="text-purple-400/60">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-purple-200 mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#180830] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Host Onboarding & Guidelines">Host Onboarding & Guidelines</option>
                        <option value="Agency / Talent Collaboration">Agency / Talent Collaboration</option>
                        <option value="E-Commerce Merchant Support">E-Commerce Merchant Support</option>
                        <option value="Media & Press Relations">Media & Press Relations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-purple-200 mb-1">
                      Your Message <span className="text-brand-pink">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Write your detailed query or message here..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-300/40 text-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      type="submit"
                      variant="gold"
                      size="md"
                      disabled={isSubmitting}
                      withArrow
                    >
                      {isSubmitting ? "Submitting..." : "Send Inquiry"}
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}

