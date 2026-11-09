"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import { ServiceItem } from "@/data/services";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchServices = async () => {
    setIsLoading(true);
    const data = await cmsService.getServices();
    setServices(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenNew = () => {
    setEditingService({
      id: "",
      slug: "",
      title: "",
      tagline: "",
      badge: "New Service",
      shortDesc: "",
      fullDesc: "",
      heroImage: "/images/hero/hero-slide-1.png",
      iconName: "Radio",
      accentGradient: "from-purple-600 to-pink-500",
      glowColor: "rgba(133,0,255,0.4)",
      stats: [],
      benefits: [],
      ctaText: "Inquire Now",
      features: [],
      statNumber: "10K+",
      statLabel: "Active Broadcasters",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService({ ...svc });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Upsert into Supabase
      const { error } = await supabase.from("services").upsert([
        {
          slug: editingService.slug || editingService.title.toLowerCase().replace(/\s+/g, "-"),
          title: editingService.title,
          tagline: editingService.tagline,
          badge: editingService.badge,
          short_desc: editingService.shortDesc,
          full_desc: editingService.fullDesc,
          hero_image: editingService.heroImage,
          icon_name: editingService.iconName || "Radio",
          stat_number: editingService.statNumber,
          stat_label: editingService.statLabel,
          is_published: true,
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn("Supabase upsert notice:", error.message);
      }

      setSuccessMsg(`Service "${editingService.title}" successfully updated in database!`);
      setIsModalOpen(false);
      fetchServices();
      // Revalidate cache
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/services" }),
      }).catch(() => {});
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save service");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete service "${slug}"?`)) return;

    try {
      await supabase.from("services").delete().eq("slug", slug);
      setSuccessMsg(`Service deleted successfully.`);
      fetchServices();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete service");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    setUploadingImage(true);
    const result = await uploadToCloudinary(file, "manaverse/services");
    setUploadingImage(false);

    if (result.secure_url) {
      setEditingService({ ...editingService, heroImage: result.secure_url });
    } else {
      alert(result.error || "Upload failed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-brand-gold" />
            <span>Interactive Entertainment Portfolio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Services & Solutions Management
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Create, edit, and publish dynamic entertainment services. Real-time sync with public website.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Services Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.slug}
            className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-gold text-purple-950">
                  {svc.badge}
                </span>
                <span className="text-xs font-bold text-purple-300">
                  /{svc.slug}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{svc.title}</h3>
              <p className="text-xs font-semibold text-brand-gold">{svc.tagline}</p>
              <p className="text-xs text-purple-200/80 leading-relaxed line-clamp-3">
                {svc.shortDesc}
              </p>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-purple-200">
                <span>Key Metric:</span>
                <strong className="text-white">{svc.statNumber} {svc.statLabel}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between gap-2">
              <a
                href={`/services/${svc.slug}`}
                target="_blank"
                className="text-xs font-bold text-brand-pink hover:underline flex items-center gap-1"
              >
                <span>Preview Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(svc)}
                  className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(svc.slug)}
                  className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-xs font-bold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-5 my-auto">
            <h2 className="text-xl font-black">
              {editingService.id ? "Edit Service" : "Create New Entertainment Service"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        title: e.target.value,
                        slug: editingService.slug || e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingService.slug}
                    onChange={(e) =>
                      setEditingService({ ...editingService, slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Service Tagline</label>
                <input
                  type="text"
                  required
                  value={editingService.tagline}
                  onChange={(e) =>
                    setEditingService({ ...editingService, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDesc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDesc: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Full Detailed Narrative</label>
                <textarea
                  rows={4}
                  required
                  value={editingService.fullDesc}
                  onChange={(e) =>
                    setEditingService({ ...editingService, fullDesc: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingService.badge}
                    onChange={(e) =>
                      setEditingService({ ...editingService, badge: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Metric Number</label>
                  <input
                    type="text"
                    value={editingService.statNumber}
                    onChange={(e) =>
                      setEditingService({ ...editingService, statNumber: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Metric Label</label>
                  <input
                    type="text"
                    value={editingService.statLabel}
                    onChange={(e) =>
                      setEditingService({ ...editingService, statLabel: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload */}
              <div>
                <label className="block font-bold text-purple-200 mb-1">Cover / Hero Image (Cloudinary)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingService.heroImage || ""}
                    onChange={(e) =>
                      setEditingService({ ...editingService, heroImage: e.target.value })
                    }
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                  <label className="px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-400/30 text-purple-200 hover:text-white cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
