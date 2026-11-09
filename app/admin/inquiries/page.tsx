"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  Filter,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setInquiries(data);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await supabase.from("contact_messages").update({ status }).eq("id", id);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
    } catch {
      // fallback
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await supabase.from("contact_messages").delete().eq("id", id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch {
      // fallback
    }
  };

  const filtered = inquiries.filter((item) => {
    if (filter !== "all" && item.status?.toLowerCase() !== filter.toLowerCase()) return false;
    if (
      searchTerm &&
      !item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.phone?.includes(searchTerm)
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
            <MessageSquare className="w-6 h-6 text-brand-pink" />
            <span>Contact Inquiries & Submissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Real-time contact messages and inquiries received from the public website.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by name, phone, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-brand-pink"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {["all", "New", "Contacted", "Resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === status
                  ? "bg-brand-pink text-white"
                  : "bg-white/5 text-purple-300 hover:text-white"
              }`}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#110526] border border-purple-500/20 space-y-3">
          <MessageSquare className="w-10 h-10 text-purple-400/40 mx-auto" />
          <h3 className="text-base font-bold text-white">No inquiries found</h3>
          <p className="text-xs text-purple-300 max-w-sm mx-auto">
            When website visitors submit inquiry forms on the public site, their inquiries will be recorded here in Supabase.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#110526] border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-white">{item.full_name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                    {item.subject}
                  </span>
                  <span className="text-[10px] text-purple-400">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                  </span>
                </div>

                <p className="text-xs text-purple-200/90 leading-relaxed">
                  {item.message}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-purple-300 pt-1">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-1 font-semibold text-emerald-400 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{item.phone}</span>
                  </a>
                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="flex items-center gap-1 hover:text-white"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{item.email}</span>
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
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={() => deleteInquiry(item.id)}
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
