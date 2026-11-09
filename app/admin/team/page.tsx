"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import { TeamMember } from "@/data/team";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  MapPin,
  Globe2,
  Upload,
  ShieldCheck,
} from "lucide-react";

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMembers = async () => {
    setIsLoading(true);
    const data = await cmsService.getTeamMembers();
    setMembers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleOpenNew = () => {
    setEditingMember({
      id: "",
      name: "",
      role: "Sales Manager",
      designation: "Manager – Creator Partnerships",
      department: "Sales & Business Development",
      image: "/images/team/koteswarao-gaddam.png",
      market: "India Market",
      location: "Bengaluru, Karnataka, India",
      phone: "8555896346",
      phoneDisplay: "+91 8555896346",
      phoneTel: "tel:+918555896346",
      whatsappLink: "https://wa.me/918555896346",
      email: "contact@manaverse.com",
      bio: "Dedicated live streaming creator manager and commercial lead driving talent growth.",
      skills: ["Creator Management", "Sales Leadership", "Streamer Coaching"],
      achievements: ["Successfully onboarded 50+ creator agencies"],
      isVerified: true,
      avatarColor: "from-purple-600 to-pink-500",
      badge: "Sales Leadership",
      rankOrder: members.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember({ ...m });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase.from("team_members").upsert([
        {
          id: editingMember.id.includes("-") && editingMember.id.length > 20 ? editingMember.id : undefined,
          name: editingMember.name,
          role: editingMember.role,
          designation: editingMember.designation,
          department: editingMember.department,
          image_url: editingMember.image,
          market: editingMember.market,
          location: editingMember.location,
          phone: editingMember.phone,
          phone_display: editingMember.phoneDisplay,
          phone_tel: editingMember.phoneTel,
          whatsapp_link: editingMember.whatsappLink,
          email: editingMember.email,
          bio: editingMember.bio,
          skills: editingMember.skills,
          achievements: editingMember.achievements,
          badge: editingMember.badge,
          is_verified: true,
          rank_order: editingMember.rankOrder,
          is_published: true,
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn("Supabase team_members upsert notice:", error.message);
      }

      setSuccessMsg(`Team profile for "${editingMember.name}" saved successfully!`);
      setIsModalOpen(false);
      fetchMembers();

      // Trigger cache revalidation
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/team" }),
      }).catch(() => {});
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save team member");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from leadership?`)) return;
    try {
      await supabase.from("team_members").delete().eq("id", id);
      setSuccessMsg(`Team member removed.`);
      fetchMembers();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to remove member");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMember) return;

    setUploadingImage(true);
    const result = await uploadToCloudinary(file, "manaverse/team");
    setUploadingImage(false);

    if (result.secure_url) {
      setEditingMember({ ...editingMember, image: result.secure_url });
    } else {
      alert(result.error || "Upload failed");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/20 border border-brand-pink/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-brand-gold" />
            <span>Executive & Sales Leadership CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Team Management
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage profiles, portraits, roles, phone numbers, and WhatsApp channels for all leadership members.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
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

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-3xl bg-[#110526] border border-purple-500/20 hover:border-brand-pink/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Photo & Role */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-purple-500/40 bg-purple-950 shrink-0">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-white truncate">{m.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                  </div>
                  <div className="text-xs font-bold text-brand-gold truncate">{m.role}</div>
                  <div className="text-[11px] text-purple-300 truncate">{m.designation}</div>
                </div>
              </div>

              {/* Location & Contact Info */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-xs text-purple-200">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                  <span className="truncate">{m.market}</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="truncate">{m.location}</span>
                </div>
                {m.phoneDisplay && (
                  <div className="flex items-center gap-2 text-white font-semibold pt-0.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{m.phoneDisplay}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-purple-200/80 line-clamp-2 leading-relaxed">
                {m.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-200">
                Rank #{m.rankOrder}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="p-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(m.id, m.name)}
                  className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-xs font-bold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-5 my-auto">
            <h2 className="text-xl font-black">
              {editingMember.name ? `Edit ${editingMember.name}` : "Add New Leadership Member"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, role: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Formal Designation</label>
                  <input
                    type="text"
                    required
                    value={editingMember.designation}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, designation: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Department</label>
                  <select
                    value={editingMember.department}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, department: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  >
                    <option value="Executive Leadership">Executive Leadership</option>
                    <option value="Sales & Business Development">Sales & Business Development</option>
                    <option value="India Operations">India Operations</option>
                    <option value="Global Markets">Global Markets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Market Jurisdiction</label>
                  <input
                    type="text"
                    required
                    value={editingMember.market}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, market: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Physical Location / Address</label>
                  <input
                    type="text"
                    required
                    value={editingMember.location}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, location: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingMember.phone || ""}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        phone: e.target.value,
                        phoneDisplay: `+91 ${e.target.value}`,
                        phoneTel: `tel:+91${e.target.value.replace(/\s+/g, "")}`,
                        whatsappLink: `https://wa.me/91${e.target.value.replace(/\s+/g, "")}`,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-purple-200 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingMember.email || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Executive Biography</label>
                <textarea
                  rows={4}
                  required
                  value={editingMember.bio}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, bio: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              {/* Photo Upload via Cloudinary */}
              <div>
                <label className="block font-bold text-purple-200 mb-1">Portrait Photo (Cloudinary)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingMember.image}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, image: e.target.value })
                    }
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
