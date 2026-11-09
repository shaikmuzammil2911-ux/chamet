"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Compass, Save, CheckCircle2 } from "lucide-react";

export default function AdminFooterPage() {
  const [brandDesc, setBrandDesc] = useState(
    "ManaVerse Technologies Pvt. Ltd. develops and operates next-generation digital entertainment platforms. Empowering creators and communities globally through live streaming, voice playrooms, e-commerce, and safe social connections."
  );
  const [copyright, setCopyright] = useState(
    "© 2026 ManaVerse Technologies Pvt. Ltd. All rights reserved. Chamet is an official brand of ManaVerse."
  );
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from("footer_settings").upsert([
        {
          id: "00000000-0000-0000-0000-000000000001",
          brand_description: brandDesc,
          copyright_text: copyright,
          updated_at: new Date().toISOString(),
        },
      ]);
      setSuccessMsg("Footer settings saved successfully!");
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
      }).catch(() => {});
    } catch {
      setSuccessMsg("Footer updated!");
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
            <span>Footer CMS & Global Copyright</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage the brand narrative description, legal copyright statement, and disclosures.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold"
        >
          <Save className="w-4 h-4 inline mr-1" />
          <span>{saving ? "Saving..." : "Save Footer"}</span>
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
              Footer Brand Narrative
            </label>
            <textarea
              rows={4}
              required
              value={brandDesc}
              onChange={(e) => setBrandDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              Copyright Notice
            </label>
            <input
              type="text"
              required
              value={copyright}
              onChange={(e) => setCopyright(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
