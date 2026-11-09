"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { uploadToCloudinary, CLOUDINARY_CONFIG } from "@/lib/cloudinary";
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Video,
  File,
  RefreshCw,
  Search,
} from "lucide-react";

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const staticInitialMedia = [
    {
      id: "media-1",
      name: "hero-slide-1.png",
      secure_url: "/images/hero/hero-slide-1.png",
      media_type: "image",
      folder: "/manaverse/hero",
    },
    {
      id: "media-2",
      name: "hero-slide-2.png",
      secure_url: "/images/hero/hero-slide-2.png",
      media_type: "image",
      folder: "/manaverse/hero",
    },
    {
      id: "media-3",
      name: "hero-slide-3.png",
      secure_url: "/images/hero/hero-slide-3.png",
      media_type: "image",
      folder: "/manaverse/hero",
    },
    {
      id: "media-4",
      name: "james-au.png",
      secure_url: "/images/team/james-au.png",
      media_type: "image",
      folder: "/manaverse/team",
    },
    {
      id: "media-5",
      name: "koteswarao-gaddam.png",
      secure_url: "/images/team/koteswarao-gaddam.png",
      media_type: "image",
      folder: "/manaverse/team",
    },
    {
      id: "media-6",
      name: "kota-kousalya.png",
      secure_url: "/images/team/kota-kousalya.png",
      media_type: "image",
      folder: "/manaverse/team",
    },
    {
      id: "media-7",
      name: "jesus.png",
      secure_url: "/images/team/jesus.png",
      media_type: "image",
      folder: "/manaverse/team",
    },
    {
      id: "media-8",
      name: "keerthi-reddy.png",
      secure_url: "/images/team/keerthi-reddy.png",
      media_type: "image",
      folder: "/manaverse/team",
    },
    {
      id: "media-9",
      name: "chamet-showcase.mp4",
      secure_url: "/videos/chamet-showcase.mp4",
      media_type: "video",
      folder: "/manaverse/videos",
    },
  ];

  const fetchMedia = async () => {
    try {
      const { data } = await supabase
        .from("media_assets")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setMediaList([...data, ...staticInitialMedia]);
      } else {
        setMediaList(staticInitialMedia);
      }
    } catch {
      setMediaList(staticInitialMedia);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const result = await uploadToCloudinary(file, "manaverse/media");
    setIsUploading(false);

    if (result.secure_url) {
      setSuccessMsg(`File "${file.name}" successfully uploaded to Cloudinary!`);
      const newAsset = {
        name: file.name,
        public_id: result.public_id,
        secure_url: result.secure_url,
        media_type: file.type.startsWith("video") ? "video" : "image",
        bytes: file.size,
        folder: "/manaverse/media",
      };

      await supabase.from("media_assets").insert([newAsset]);
      fetchMedia();
    } else {
      setErrorMsg(
        result.error ||
          "Upload failed. In your Cloudinary console (Settings -> Upload), ensure your upload preset 'ml_default' is set to Unsigned."
      );
    }
  };

  const copyUrl = (url: string, id: string) => {
    const full = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(full);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaList.filter((m) =>
    m.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span>Cloudinary Media Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cloudinary Media Library
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Upload, preview, search, and manage high-resolution images and video streams.
          </p>
        </div>

        {/* Upload Button */}
        <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 cursor-pointer flex items-center gap-2 self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "Uploading to Cloudinary..." : "Upload Media Asset"}</span>
          <input
            type="file"
            accept="image/*,video/*"
            disabled={isUploading}
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Cloudinary Integration Bar */}
      <div className="p-4 rounded-2xl bg-[#110526] border border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-purple-200">
          <span>Cloud: <strong className="text-brand-pink">{CLOUDINARY_CONFIG.cloudName}</strong></span>
          <span>Preset: <strong className="text-brand-gold">{CLOUDINARY_CONFIG.uploadPreset}</strong></span>
          <span>Total Assets: <strong className="text-white">{mediaList.length}</strong></span>
        </div>
        <a
          href="https://console.cloudinary.com"
          target="_blank"
          className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
        >
          <span>Cloudinary Console</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
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

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search media files by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-brand-pink"
        />
        <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-3 rounded-2xl bg-[#110526] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-3 group"
          >
            {/* Thumbnail */}
            <div className="relative h-32 w-full rounded-xl overflow-hidden bg-black/60 flex items-center justify-center">
              {item.media_type === "video" ? (
                <div className="flex flex-col items-center justify-center text-purple-300">
                  <Video className="w-8 h-8 text-brand-pink" />
                  <span className="text-[10px] mt-1 font-bold">Video Stream</span>
                </div>
              ) : (
                <Image
                  src={item.secure_url}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="180px"
                />
              )}
            </div>

            {/* Title & Actions */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-white truncate" title={item.name}>
                {item.name}
              </div>
              <div className="text-[10px] text-purple-400 truncate">
                {item.folder || "/manaverse"}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyUrl(item.secure_url, item.id || String(idx))}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-purple/40 text-[11px] font-bold text-purple-200 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedId === (item.id || String(idx)) ? "Copied!" : "Copy URL"}</span>
                </button>

                <a
                  href={item.secure_url}
                  target="_blank"
                  className="p-1 text-purple-400 hover:text-white"
                  title="Open Full Image"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

