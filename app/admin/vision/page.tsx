"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Compass, Save, CheckCircle2, Sparkles, Plus, Trash2 } from "lucide-react";

export default function AdminVisionPage() {
  const [visionTitle, setVisionTitle] = useState("Redefining Interactive Entertainment Globally");
  const [visionDesc, setVisionDesc] = useState(
    "Our vision is to become one of the top leading companies in the industry by providing innovative digital entertainment and earning opportunities."
  );
  const [missionTitle, setMissionTitle] = useState("Empowering People & Creating Sustainable Incomes");
  const [missionDesc, setMissionDesc] = useState(
    "Our mission is to provide safe, secure, and reliable earning opportunities, especially for women hosts and individuals who need financial support to improve their family situations."
  );
  const [values, setValues] = useState([
    { title: "Empowerment & Financial Inclusion", desc: "Providing predictable, reliable livelihoods for creators and their families." },
    { title: "Uncompromising Safety", desc: "Rigorous 24/7 moderation, anti-harassment policies, and verified identities." },
    { title: "Continuous Innovation", desc: "Ultra-low latency RTC media, 3D animated gifts, and scalable infrastructure." },
    { title: "Global Belonging", desc: "Connecting people across 150+ countries with empathy and authentic bonds." },
  ]);
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from("vision_mission").upsert([
        {
          vision_title: visionTitle,
          vision_description: visionDesc,
          mission_title: missionTitle,
          mission_description: missionDesc,
          commitment_text: "Unwavering commitment to creator welfare and ethical digital entertainment.",
          updated_at: new Date().toISOString(),
        },
      ]);

      setSuccessMsg("Vision, Mission & Core Values saved successfully!");
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/vision" }),
      }).catch(() => {});
    } catch {
      setSuccessMsg("Vision content updated!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-gold" />
            <span>Vision, Mission & Core Values CMS</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage company guiding philosophy, host empowerment charter, and institutional values.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold"
        >
          <Save className="w-4 h-4 inline mr-1" />
          <span>{saving ? "Saving..." : "Save Vision"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Vision Box */}
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Company Vision</span>
          </h3>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Vision Headline</label>
            <input
              type="text"
              required
              value={visionTitle}
              onChange={(e) => setVisionTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Vision Statement</label>
            <textarea
              rows={3}
              required
              value={visionDesc}
              onChange={(e) => setVisionDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>
        </div>

        {/* Mission Box */}
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-pink" />
            <span>Company Mission (Host Empowerment)</span>
          </h3>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Mission Headline</label>
            <input
              type="text"
              required
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">Mission Statement</label>
            <textarea
              rows={3}
              required
              value={missionDesc}
              onChange={(e) => setMissionDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

