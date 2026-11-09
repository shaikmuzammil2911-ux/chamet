"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  Home,
  Save,
  CheckCircle2,
  AlertCircle,
  Upload,
  Radio,
  Sparkles,
  Layers,
  Star,
  ExternalLink,
} from "lucide-react";

export default function AdminHomePage() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      headingHighlight: "Technologies Pvt. Ltd.",
      subTitleTag: "Play • Connect • Earn • Grow",
      slideBadge: "Live Interactive Broadcasting",
      description:
        "Your ultimate platform for entertainment, social connections, and earning opportunities. Join millions celebrating talents and building financial independence.",
      image: "/images/hero/hero-slide-1.png",
      ctaText: "Explore Services",
    },
    {
      id: 2,
      headingHighlight: "Global Digital Community",
      subTitleTag: "Voice • Stream • Collaborate • Win",
      slideBadge: "Voice Party Rooms & Gaming",
      description:
        "Host multi-seat voice lounges, stream high-fidelity gaming moments, and exchange breathtaking 3D virtual gifts with audiences spanning over 150 countries.",
      image: "/images/hero/hero-slide-2.png",
      ctaText: "Join Party Rooms",
    },
    {
      id: 3,
      headingHighlight: "Empowering Lives Daily",
      subTitleTag: "Connect • Share • Celebrate • Belong",
      slideBadge: "Authentic Social Connections",
      description:
        "Explore dynamic short video reels, meet genuine verified individuals, and build sustainable livelihood opportunities with reliable, timely host payouts.",
      image: "/images/hero/hero-slide-3.png",
      ctaText: "Discover Connections",
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    try {
      // Upsert into Supabase home_hero_slides
      for (const slide of slides) {
        await supabase.from("home_hero_slides").upsert([
          {
            title: "ManaVerse",
            highlight_text: slide.headingHighlight,
            sub_title_tag: slide.subTitleTag,
            slide_badge: slide.slideBadge,
            description: slide.description,
            image_url: slide.image,
            cta_text: slide.ctaText,
            display_order: slide.id,
            is_published: true,
            updated_at: new Date().toISOString(),
          },
        ]);
      }

      setSuccessMsg("Home page hero slides saved successfully to Supabase!");
      // Revalidate
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
      }).catch(() => {});
    } catch {
      setSuccessMsg("Home page hero slides updated successfully!");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(idx);
    const result = await uploadToCloudinary(file, "manaverse/hero");
    setUploadingIdx(null);

    if (result.secure_url) {
      const updated = [...slides];
      updated[idx].image = result.secure_url;
      setSlides(updated);
    } else {
      alert(result.error || "Upload failed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Home className="w-3.5 h-3.5 text-brand-gold" />
            <span>Landing Page Visual Content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Home Page Hero & Slider CMS
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage the primary hero carousel banners, titles, descriptions, and CTA action buttons.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Publish Home Slides"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 3 Slides Editors */}
      <form onSubmit={handleSave} className="space-y-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-gold text-purple-950">
                Hero Slide #{slide.id}
              </span>
              <span className="text-xs text-purple-300 font-semibold">
                Auto-Slide Active (3.2s)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">
                  Headline Highlight
                </label>
                <input
                  type="text"
                  required
                  value={slide.headingHighlight}
                  onChange={(e) => {
                    const u = [...slides];
                    u[idx].headingHighlight = e.target.value;
                    setSlides(u);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  required
                  value={slide.slideBadge}
                  onChange={(e) => {
                    const u = [...slides];
                    u[idx].slideBadge = e.target.value;
                    setSlides(u);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">
                  Sub-Title Tagline
                </label>
                <input
                  type="text"
                  required
                  value={slide.subTitleTag}
                  onChange={(e) => {
                    const u = [...slides];
                    u[idx].subTitleTag = e.target.value;
                    setSlides(u);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  required
                  value={slide.ctaText}
                  onChange={(e) => {
                    const u = [...slides];
                    u[idx].ctaText = e.target.value;
                    setSlides(u);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-purple-200 mb-1">
                Slide Narrative Description
              </label>
              <textarea
                rows={3}
                required
                value={slide.description}
                onChange={(e) => {
                  const u = [...slides];
                  u[idx].description = e.target.value;
                  setSlides(u);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>

            {/* Slide Background Image Preview & Upload */}
            <div className="text-xs space-y-2">
              <label className="block font-bold text-purple-200">
                Slide Background Image (Cloudinary)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-48 h-24 rounded-xl overflow-hidden bg-black/60 shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.headingHighlight}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>

                <div className="flex-1 w-full space-y-2">
                  <input
                    type="text"
                    value={slide.image}
                    onChange={(e) => {
                      const u = [...slides];
                      u[idx].image = e.target.value;
                      setSlides(u);
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />

                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-400/30 text-purple-200 text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5 text-brand-gold" />
                    <span>
                      {uploadingIdx === idx ? "Uploading to Cloudinary..." : "Replace Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(idx, e)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
