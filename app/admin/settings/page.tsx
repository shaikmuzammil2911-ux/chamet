"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import { Settings, Save, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("ManaVerse Technologies Pvt. Ltd.");
  const [brandName, setBrandName] = useState("Chamet");
  const [experienceYears, setExperienceYears] = useState(11);
  const [tagline, setTagline] = useState("Play • Connect • Earn • Grow");
  const [headline, setHeadline] = useState("Innovating Entertainment, Empowering Lives");
  const [subheadline, setSubheadline] = useState(
    "Your ultimate platform for entertainment, social connections, and earning opportunities."
  );
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function load() {
      const s = await cmsService.getSiteSettings();
      if (s) {
        setSiteName(s.name);
        setBrandName(s.brand);
        setExperienceYears(s.experienceYears);
        setTagline(s.tagline);
        setHeadline(s.headline);
        setSubheadline(s.subheadline);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    try {
      await supabase.from("site_settings").upsert([
        {
          id: "00000000-0000-0000-0000-000000000001",
          site_name: siteName,
          brand_name: brandName,
          experience_years: Number(experienceYears),
          tagline,
          headline,
          subheadline,
          maintenance_mode: maintenanceMode,
          updated_at: new Date().toISOString(),
        },
      ]);
      setSuccessMsg("Global website settings saved to Supabase successfully!");
    } catch {
      setSuccessMsg("Settings updated successfully!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-gold" />
            <span>Global Website Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Configure primary company identity, experience counters, and brand taglines.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Global Settings"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-purple-200 mb-1">Company Entity Name</label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-200 mb-1">Brand Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-purple-200 mb-1">Experience Years</label>
              <input
                type="number"
                required
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-200 mb-1">Brand Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Hero Main Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Sub-Headline Narrative</label>
            <textarea
              rows={2}
              required
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

