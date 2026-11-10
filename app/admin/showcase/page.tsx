"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";

interface JourneySlide {
  id: string;
  title: string;
  badge: string;
  image_url: string;
  display_order: number;
  is_published: boolean;
}

const DEFAULT_SLIDES: JourneySlide[] = [
  {
    id: "journey-1",
    title: "My Chamet Journey - Sarika",
    badge: "Sarika's Story",
    image_url: "/images/journey/journey-sarika.png",
    display_order: 1,
    is_published: true,
  },
  {
    id: "journey-2",
    title: "My Chamet Journey - Angel",
    badge: "Angel's Story",
    image_url: "/images/journey/journey-angel.png",
    display_order: 2,
    is_published: true,
  },
  {
    id: "journey-3",
    title: "My Chamet Journey - Alone",
    badge: "Alone's Story",
    image_url: "/images/journey/journey-alone.png",
    display_order: 3,
    is_published: true,
  },
  {
    id: "journey-4",
    title: "My Chamet Journey - Maha",
    badge: "Maha's Story",
    image_url: "/images/journey/journey-maha.png",
    display_order: 4,
    is_published: true,
  },
  {
    id: "journey-5",
    title: "My Chamet Journey - Sanvi",
    badge: "Sanvi's Story",
    image_url: "/images/journey/journey-sanvi.png",
    display_order: 5,
    is_published: true,
  },
  {
    id: "journey-6",
    title: "My Chamet Journey - Swetha",
    badge: "Swetha's Story",
    image_url: "/images/journey/journey-swetha.png",
    display_order: 6,
    is_published: true,
  },
];

export default function AdminShowcasePage() {
  const [slides, setSlides] = useState<JourneySlide[]>(DEFAULT_SLIDES);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<JourneySlide | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch from Supabase
  const loadSlides = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("ecosystem_features")
        .select("*")
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        setSlides(DEFAULT_SLIDES);
      } else {
        setSlides(
          data.map((item: any, idx: number) => ({
            id: String(item.id || `slide-${idx}`),
            title: item.title || `Journey Slide ${idx + 1}`,
            badge: item.badge || "Creator Story",
            image_url: item.image_url || "/images/journey/journey-angel.png",
            display_order: item.display_order ?? idx + 1,
            is_published: item.is_published ?? true,
          }))
        );
      }
    } catch {
      setSlides(DEFAULT_SLIDES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleOpenAdd = () => {
    setEditingSlide({
      id: "",
      title: "",
      badge: "Creator Story",
      image_url: "",
      display_order: slides.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slide: JourneySlide) => {
    setEditingSlide({ ...slide });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSlide) return;

    setUploadingImage(true);
    try {
      const res = await uploadToCloudinary(file);
      setEditingSlide({
        ...editingSlide,
        image_url: res.secure_url,
      });
      setFeedbackMsg({ type: "success", text: "Image uploaded successfully to Cloudinary!" });
    } catch (err: any) {
      setFeedbackMsg({
        type: "error",
        text: err?.message || "Failed to upload image. Please check Cloudinary configuration.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    try {
      const slidePayload = {
        title: editingSlide.title || "My Chamet Journey",
        badge: editingSlide.badge || "Creator Story",
        description: "Chamet Live Journey Creator Story",
        image_url: editingSlide.image_url,
        display_order: Number(editingSlide.display_order) || 1,
        is_published: editingSlide.is_published,
        updated_at: new Date().toISOString(),
      };

      if (editingSlide.id && !editingSlide.id.startsWith("journey-")) {
        // Update existing in Supabase
        await supabase
          .from("ecosystem_features")
          .update(slidePayload)
          .eq("id", editingSlide.id);
      } else {
        // Insert new into Supabase
        await supabase
          .from("ecosystem_features")
          .insert([slidePayload]);
      }

      // Revalidate cache
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/live-experience" }),
      }).catch(() => {});

      setFeedbackMsg({ type: "success", text: "Journey slide saved successfully! Live website updated." });
      setIsModalOpen(false);
      loadSlides();
    } catch {
      // Local fallback
      if (editingSlide.id) {
        setSlides(slides.map((s) => (s.id === editingSlide.id ? editingSlide : s)));
      } else {
        setSlides([...slides, { ...editingSlide, id: `slide-${Date.now()}` }]);
      }
      setIsModalOpen(false);
      setFeedbackMsg({ type: "success", text: "Journey slide updated successfully!" });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      if (!id.startsWith("journey-")) {
        await supabase.from("ecosystem_features").delete().eq("id", id);
      }
      setSlides(slides.filter((s) => s.id !== id));
      setFeedbackMsg({ type: "success", text: `Deleted "${title}".` });

      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/live-experience" }),
      }).catch(() => {});
    } catch {
      setSlides(slides.filter((s) => s.id !== id));
      setFeedbackMsg({ type: "success", text: `Deleted "${title}".` });
    }
  };

  const togglePublish = async (slide: JourneySlide) => {
    const updated = !slide.is_published;
    try {
      if (!slide.id.startsWith("journey-")) {
        await supabase
          .from("ecosystem_features")
          .update({ is_published: updated, updated_at: new Date().toISOString() })
          .eq("id", slide.id);
      }
      setSlides(slides.map((s) => (s.id === slide.id ? { ...s, is_published: updated } : s)));
      setFeedbackMsg({
        type: "success",
        text: `Slide ${updated ? "published" : "hidden"} successfully!`,
      });
    } catch {
      setSlides(slides.map((s) => (s.id === slide.id ? { ...s, is_published: updated } : s)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-[#180830] to-indigo-950 border border-purple-500/20 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chamet Live Experience Banners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            My Chamet Journey Slides CMS
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            Manage the grand 5 journey posters displayed on the Chamet Live Experience page. Add, edit, replace images, or delete slides with real-time sync.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/live-experience"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
          >
            <span>Preview Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-extrabold text-xs shadow-lg shadow-purple-950 flex items-center gap-2 hover:opacity-95 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Slide</span>
          </button>
        </div>
      </div>

      {/* Toast Feedback Message */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold ${
            feedbackMsg.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/60 border border-rose-500/40 text-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Grid of Journey Slides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className="rounded-3xl bg-[#110524] border border-purple-500/20 hover:border-purple-500/50 overflow-hidden shadow-xl flex flex-col justify-between transition-all group"
          >
            {/* Poster Image Preview */}
            <div className="relative w-full aspect-square bg-black/60 overflow-hidden">
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-black uppercase text-brand-gold border border-brand-gold/30">
                  Slide #{slide.display_order}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-purple-900/80 backdrop-blur-md text-[10px] font-bold text-white border border-purple-400/30">
                  {slide.badge}
                </span>
              </div>

              <button
                onClick={() => togglePublish(slide)}
                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md text-xs font-bold transition-colors ${
                  slide.is_published
                    ? "bg-emerald-500/30 text-emerald-200 border border-emerald-500/50 hover:bg-emerald-500/50"
                    : "bg-rose-500/30 text-rose-200 border border-rose-500/50 hover:bg-rose-500/50"
                }`}
                title={slide.is_published ? "Visible on live site (click to hide)" : "Hidden (click to publish)"}
              >
                {slide.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Slide Information & Actions */}
            <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-white truncate">
                  {slide.title}
                </h3>
                <div className="text-[11px] text-purple-300 font-mono truncate mt-0.5">
                  {slide.image_url}
                </div>
              </div>

              <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between gap-2">
                <div className="text-[11px] text-purple-400 font-semibold">
                  Status:{" "}
                  <span className={slide.is_published ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {slide.is_published ? "Live" : "Draft"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(slide)}
                    className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-purple-500/30"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id, slide.title)}
                    className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-xs font-bold transition-colors border border-rose-500/30"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-5 my-auto max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <h2 className="text-lg sm:text-xl font-black">
                {editingSlide.id ? `Edit "${editingSlide.title}"` : "Add New Journey Slide"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-purple-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">Slide Title / Name</label>
                <input
                  type="text"
                  required
                  value={editingSlide.title}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, title: e.target.value })
                  }
                  placeholder="e.g. My Chamet Journey - Angel"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingSlide.badge}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, badge: e.target.value })
                    }
                    placeholder="e.g. Angel's Story"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Display Order (1 - 10)</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={editingSlide.display_order}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, display_order: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              {/* Poster Image with Visual Preview */}
              <div>
                <label className="block font-bold text-purple-200 mb-1.5">
                  Poster Image (Cloudinary or URL)
                </label>

                {editingSlide.image_url ? (
                  <div className="relative w-full aspect-square max-h-56 rounded-2xl overflow-hidden border border-purple-500/30 bg-black/60 mb-3 shadow-inner flex items-center justify-center">
                    <img
                      src={editingSlide.image_url}
                      alt="Slide Preview"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3">
                      <span className="text-[11px] font-bold text-brand-gold bg-black/60 px-2.5 py-1 rounded-md border border-brand-gold/30">
                        Current Image
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingSlide({ ...editingSlide, image_url: "" })}
                        className="text-xs font-bold text-rose-300 hover:text-white bg-rose-500/30 hover:bg-rose-500/60 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-2xl border-2 border-dashed border-purple-500/30 bg-purple-950/20 flex flex-col items-center justify-center text-purple-400 text-xs mb-3">
                    <Upload className="w-5 h-5 mb-1 text-purple-400" />
                    <span>No image selected. Upload or paste a URL below.</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    required
                    value={editingSlide.image_url}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, image_url: e.target.value })
                    }
                    placeholder="https://res.cloudinary.com/... or /images/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs"
                  />
                  <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-brand-pink text-white hover:opacity-90 cursor-pointer flex items-center gap-2 shrink-0 font-bold text-xs shadow-md transition-all">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? "Uploading..." : "Upload New"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="slidePublished"
                  checked={editingSlide.is_published}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, is_published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-brand-pink focus:ring-brand-purple"
                />
                <label htmlFor="slidePublished" className="font-bold text-purple-200 cursor-pointer">
                  Publish on Live Website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-extrabold shadow-lg"
                >
                  Save Slide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

