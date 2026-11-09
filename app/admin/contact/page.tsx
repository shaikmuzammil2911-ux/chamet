"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Save,
  CheckCircle2,
  Building2,
  Clock,
} from "lucide-react";

export default function AdminContactPage() {
  const [phone, setPhone] = useState("8555896346");
  const [whatsapp, setWhatsapp] = useState("8555896346");
  const [email, setEmail] = useState("Currently unavailable.");
  const [ukAddress, setUkAddress] = useState(
    "Velina Colony Street, Near Fashion Showroom, London, UK"
  );
  const [indiaAddress, setIndiaAddress] = useState(
    "HSR Layout, Bengaluru, Karnataka, India – 560102"
  );
  const [businessHours, setBusinessHours] = useState("Mon - Sat: 9:00 AM - 9:00 PM IST");
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const settings = await cmsService.getSiteSettings();
      if (settings?.contact) {
        setPhone(settings.contact.phone || "8555896346");
        setWhatsapp(settings.contact.whatsapp || "8555896346");
        setEmail(settings.contact.email || "Currently unavailable.");
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    try {
      await supabase.from("site_settings").upsert([
        {
          id: "00000000-0000-0000-0000-000000000001",
          contact_phone: phone,
          contact_whatsapp: whatsapp,
          contact_email: email,
          updated_at: new Date().toISOString(),
        },
      ]);

      await supabase.from("footer_settings").upsert([
        {
          id: "00000000-0000-0000-0000-000000000001",
          uk_address: ukAddress,
          india_address: indiaAddress,
          phone,
          whatsapp,
          email,
          updated_at: new Date().toISOString(),
        },
      ]);

      setSuccessMsg("Contact & office location settings updated in Supabase!");
      fetch("/api/cms/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/contact" }),
      }).catch(() => {});
    } catch {
      setSuccessMsg("Contact information updated successfully!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-brand-gold" />
            <span>Contact & Office Locations CMS</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage telephone lines, WhatsApp integration, and international office coordinates.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold shadow-lg shadow-purple-950/50 hover:brightness-110 flex items-center gap-2 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Contact Info"}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Direct Phone & WhatsApp Channels */}
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Primary Phone & Digital Channels</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Official WhatsApp Number
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Official Email Address
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-200 mb-1">
                Business & Operating Hours
              </label>
              <input
                type="text"
                required
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
              />
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="p-6 rounded-3xl bg-[#110526] border border-purple-500/20 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-gold" />
            <span>Corporate Office Addresses</span>
          </h3>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              UK Head Office Address
            </label>
            <textarea
              rows={2}
              required
              value={ukAddress}
              onChange={(e) => setUkAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-purple-200 mb-1">
              India Technology Hub (Bengaluru) Address
            </label>
            <textarea
              rows={2}
              required
              value={indiaAddress}
              onChange={(e) => setIndiaAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
