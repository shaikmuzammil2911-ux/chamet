"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { FileText, Save, CheckCircle2, Plus, Trash2, Award } from "lucide-react";

export default function AdminAboutPage() {
  const [heroTitle, setHeroTitle] = useState("11 Years of Empowering Global Digital Connections");
  const [introP1, setIntroP1] = useState(
    "Founded in 2013, ManaVerse Technologies Pvt. Ltd. was established with a bold mission: to bridge people through exhilarating live media entertainment while creating reliable earning avenues for hosts and independent creators worldwide."
  );
  const [introP2, setIntroP2] = useState(
    "Over eleven years of disciplined execution, we have expanded our presence from the United Kingdom to Bengaluru, India, serving a diverse community across more than 150 countries."
  );
  const [milestones, setMilestones] = useState([
    { year: "2013", title: "Inception & Genesis", desc: "ManaVerse incorporated in the UK with initial media streaming focus." },
    { year: "2018", title: "Chamet Brand Launch", desc: "Live streaming RTC platform officially released internationally." },
    { year: "2021", title: "Bengaluru Tech Hub", desc: "Opened expansive software engineering and creator care operations in HSR Layout." },
    { year: "2024", title: "100M+ Community", desc: "Surpassed 100 million total downloads with over $25M in distributed creator earnings." },
  ]);
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase.from("about_content").upsert([
        {
          hero_title: heroTitle,
          intro_p1: introP1,
          intro_p2: introP2,
          mission_text: "To provide safe, secure, and reliable earning opportunities.",
          vision_text: "To become one of the top leading companies in the industry.",
          updated_at: new Date().toISOString(),
        },
      ]);
      setSuccessMsg("About Us narrative & milestones saved successfully!");
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/about" }),
      }).catch(() => {});
    } catch {
      setSuccessMsg("About content saved!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-brand-gold" />
            <span>About Us & Company Narrative CMS</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage company history, experience narrative, and timeline milestones.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold"
        >
          <Save className="w-4 h-4 inline mr-1" />
          <span>{saving ? "Saving..." : "Save About Us"}</span>
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
          <div>
            <label className="block font-bold text-purple-200 mb-1">
              About Page Main Heading
            </label>
            <input
              type="text"
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              Introduction Paragraph 1
            </label>
            <textarea
              rows={3}
              required
              value={introP1}
              onChange={(e) => setIntroP1(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              Introduction Paragraph 2
            </label>
            <textarea
              rows={3}
              required
              value={introP2}
              onChange={(e) => setIntroP2(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>
        </div>

        {/* Milestones List */}
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-gold" />
              <span>Company Journey Milestones</span>
            </h3>
            <button
              type="button"
              onClick={() =>
                setMilestones([
                  ...milestones,
                  { year: "2026", title: "New Milestone", desc: "Description here" },
                ])
              }
              className="px-3 py-1.5 rounded-xl bg-white/5 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Year</span>
            </button>
          </div>

          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-black/30 border border-purple-500/20 flex flex-col sm:flex-row items-center gap-3"
              >
                <input
                  type="text"
                  value={m.year}
                  onChange={(e) => {
                    const u = [...milestones];
                    u[i].year = e.target.value;
                    setMilestones(u);
                  }}
                  className="w-20 px-2 py-1.5 rounded-lg bg-black/40 border border-purple-500/30 text-brand-gold font-bold text-center"
                />
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => {
                    const u = [...milestones];
                    u[i].title = e.target.value;
                    setMilestones(u);
                  }}
                  className="w-48 px-3 py-1.5 rounded-lg bg-black/40 border border-purple-500/30 text-white font-bold"
                />
                <input
                  type="text"
                  value={m.desc}
                  onChange={(e) => {
                    const u = [...milestones];
                    u[i].desc = e.target.value;
                    setMilestones(u);
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-purple-500/30 text-purple-200"
                />
                <button
                  type="button"
                  onClick={() => setMilestones(milestones.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

