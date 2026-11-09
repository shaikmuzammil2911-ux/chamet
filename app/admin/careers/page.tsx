"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import { JobOpening } from "@/data/careers";
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  MapPin,
} from "lucide-react";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchJobs = async () => {
    const data = await cmsService.getJobOpenings();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenNew = () => {
    setEditingJob({
      id: "",
      title: "",
      department: "Technology",
      location: "Bengaluru, Karnataka (On-Site)",
      type: "Full-Time",
      experience: "2-5 Years",
      shortDesc: "",
      fullDesc: "",
      requirements: ["Strong proficiency in TypeScript and React / Next.js", "Experience in WebRTC or live streaming"],
      responsibilities: ["Develop responsive UI interfaces", "Collaborate with cross-functional teams"],
      benefits: ["Competitive salary package", "Comprehensive health coverage"],
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    try {
      await supabase.from("job_openings").upsert([
        {
          title: editingJob.title,
          department: editingJob.department,
          location: editingJob.location,
          job_type: editingJob.type,
          experience: editingJob.experience,
          short_desc: editingJob.shortDesc,
          full_desc: editingJob.fullDesc,
          requirements: editingJob.requirements,
          responsibilities: editingJob.responsibilities,
          benefits: editingJob.benefits,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
      ]);

      setSuccessMsg(`Job opening "${editingJob.title}" saved successfully!`);
      setIsModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save job opening");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete job opening "${title}"?`)) return;
    try {
      await supabase.from("job_openings").delete().eq("id", id);
      setSuccessMsg(`Job opening deleted.`);
      fetchJobs();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete job");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-gold" />
            <span>Careers & Job Openings Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Publish open positions, requirements, and locations to the public Careers section.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Opening</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-3xl bg-[#110526] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                {job.department}
              </span>
              <h3 className="text-base font-black text-white">{job.title}</h3>
              <p className="text-xs text-purple-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{job.location} • {job.type}</span>
              </p>
              <p className="text-xs text-purple-200/80 line-clamp-3 leading-relaxed mt-2">
                {job.shortDesc}
              </p>
            </div>

            <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-300">
                Exp: {job.experience}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingJob(job);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-xl bg-purple-900/40 text-white text-xs font-bold"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(job.id, job.title)}
                  className="p-2 rounded-xl bg-rose-500/20 text-rose-300 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-4 my-auto">
            <h2 className="text-lg font-black">
              {editingJob.id ? "Edit Position" : "Create New Job Opening"}
            </h2>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-purple-200 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingJob.shortDesc}
                  onChange={(e) => setEditingJob({ ...editingJob, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Full Detailed Requirements</label>
                <textarea
                  rows={3}
                  required
                  value={editingJob.fullDesc}
                  onChange={(e) => setEditingJob({ ...editingJob, fullDesc: e.target.value })}
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
                  Save Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

