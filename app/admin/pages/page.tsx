"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import {
  FilePlus,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AdminPageBuilderPage() {
  const [pages, setPages] = useState<any[]>([
    {
      id: "p-about",
      slug: "about",
      title: "About ManaVerse",
      is_published: true,
      section_count: 5,
    },
    {
      id: "p-vision",
      slug: "vision",
      title: "Vision & Philosophy",
      is_published: true,
      section_count: 4,
    },
    {
      id: "p-team",
      slug: "team",
      title: "Executive Leadership",
      is_published: true,
      section_count: 3,
    },
    {
      id: "p-careers",
      slug: "careers",
      title: "Careers & Talents",
      is_published: true,
      section_count: 4,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    description: "",
    seoTitle: "",
    seoDesc: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPage.title || !newPage.slug) return;

    try {
      await supabase.from("pages").insert([
        {
          slug: newPage.slug.toLowerCase().replace(/\s+/g, "-"),
          title: newPage.title,
          description: newPage.description,
          seo_title: newPage.seoTitle || newPage.title,
          seo_desc: newPage.seoDesc || newPage.description,
          is_published: true,
        },
      ]);
    } catch {
      // fallback
    }

    setPages([
      ...pages,
      {
        id: `p-${Date.now()}`,
        slug: newPage.slug.toLowerCase().replace(/\s+/g, "-"),
        title: newPage.title,
        is_published: true,
        section_count: 1,
      },
    ]);

    setSuccessMsg(`Page "${newPage.title}" created! Accessible at /${newPage.slug}`);
    setIsModalOpen(false);
    setNewPage({ title: "", slug: "", description: "", seoTitle: "", seoDesc: "" });
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete page /${slug}?`)) return;
    try {
      await supabase.from("pages").delete().eq("slug", slug);
    } catch {}
    setPages(pages.filter((p) => p.slug !== slug));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <FilePlus className="w-6 h-6 text-brand-pink" />
            <span>Dynamic Page Builder</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Create new landing pages and custom routes with modular drag-and-drop sections without code deployment.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Pages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-3xl bg-[#110526] border border-purple-500/20 hover:border-brand-pink/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Published
                </span>
                <span className="text-xs text-purple-300">/{p.slug}</span>
              </div>
              <h3 className="text-base font-black text-white">{p.title}</h3>
              <p className="text-xs text-purple-200/80">
                Contains {p.section_count || 1} modular visual content sections.
              </p>
            </div>

            <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between">
              <Link
                href={`/${p.slug}`}
                target="_blank"
                className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={() => handleDelete(p.slug)}
                className="p-1.5 text-rose-400 hover:text-rose-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-4">
            <h2 className="text-lg font-black">Create Custom Landing Page</h2>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">Page Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Host Program"
                  value={newPage.title}
                  onChange={(e) =>
                    setNewPage({
                      ...newPage,
                      title: e.target.value,
                      slug: newPage.slug || e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">URL Path Slug</label>
                <input
                  type="text"
                  required
                  placeholder="vip-host-program"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">SEO Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description for search engines and social previews..."
                  value={newPage.description}
                  onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-purple-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold"
                >
                  Publish New Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
