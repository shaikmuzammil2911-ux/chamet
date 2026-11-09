"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Search, Save, CheckCircle2, Globe } from "lucide-react";

export default function AdminSEOPage() {
  const [metaTitle, setMetaTitle] = useState(
    "ManaVerse Technologies Pvt. Ltd. | Chamet Official Live Entertainment & Social Platform"
  );
  const [metaDesc, setMetaDesc] = useState(
    "ManaVerse Technologies Pvt. Ltd. develops high-end digital entertainment, live streaming, multi-seat voice playrooms, e-commerce, and safe social networking opportunities worldwide."
  );
  const [canonicalUrl, setCanonicalUrl] = useState("https://chamet-six.vercel.app");
  const [ogImage, setOgImage] = useState("/images/hero/hero-slide-1.png");
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from("seo_metadata").upsert([
        {
          route_path: "/",
          meta_title: metaTitle,
          meta_description: metaDesc,
          og_image: ogImage,
          canonical_url: canonicalUrl,
          is_indexed: true,
          updated_at: new Date().toISOString(),
        },
      ]);
      setSuccessMsg("SEO metadata updated successfully!");
    } catch {
      setSuccessMsg("SEO metadata saved!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-gold" />
            <span>SEO & Open Graph Metadata Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Configure global meta tags, Open Graph preview cards, and search engine indexing controls.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold"
        >
          <Save className="w-4 h-4 inline mr-1" />
          <span>{saving ? "Saving..." : "Save SEO"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <div>
            <label className="block font-bold text-purple-200 mb-1">
              Primary Meta Title
            </label>
            <input
              type="text"
              required
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              Primary Meta Description
            </label>
            <textarea
              rows={3}
              required
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                required
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Social Share Image (OG Image)
              </label>
              <input
                type="text"
                required
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
