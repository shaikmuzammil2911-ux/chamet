"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  FileText,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  Download,
  ExternalLink,
  Briefcase,
} from "lucide-react";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setApplications(data);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from("job_applications").update({ status }).eq("id", id);
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch {
      // fallback
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Delete this candidate application?")) return;
    try {
      await supabase.from("job_applications").delete().eq("id", id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch {
      // fallback
    }
  };

  const filtered = applications.filter((item) => {
    if (filter !== "all" && item.status?.toLowerCase() !== filter.toLowerCase()) return false;
    if (
      searchTerm &&
      !item.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            <span>Job Applications & Candidate Submissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Review candidate resumes, portfolio links, and recruitment pipeline stages.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Candidates</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search candidate by name, job role, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-brand-pink"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {["all", "New", "Under Review", "Shortlisted", "Interview", "Selected", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === status
                    ? "bg-emerald-500 text-black font-extrabold"
                    : "bg-white/5 text-purple-300 hover:text-white"
                }`}
              >
                {status === "all" ? "All" : status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#110526] border border-purple-500/20 space-y-3">
          <FileText className="w-10 h-10 text-purple-400/40 mx-auto" />
          <h3 className="text-base font-bold text-white">No applications found</h3>
          <p className="text-xs text-purple-300 max-w-sm mx-auto">
            When candidates submit job applications from the public Careers section, they will be registered here in Supabase.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#110526] border border-purple-500/20 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-white">{item.applicant_name}</h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {item.job_title}
                  </span>
                  <span className="text-[10px] text-purple-400">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                  </span>
                </div>

                {item.cover_letter && (
                  <p className="text-xs text-purple-200/90 leading-relaxed line-clamp-2">
                    {item.cover_letter}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-purple-300 pt-1">
                  <span className="font-semibold text-white">
                    Phone: {item.phone}
                  </span>
                  <span>Email: {item.email}</span>
                  {item.experience_level && (
                    <span className="text-brand-gold">Exp: {item.experience_level}</span>
                  )}
                  {item.resume_url && (
                    <a
                      href={item.resume_url}
                      target="_blank"
                      className="text-xs font-bold text-brand-pink hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={item.status || "New"}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs font-bold"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => deleteApplication(item.id)}
                  className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-xs transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
