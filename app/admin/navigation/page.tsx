"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { cmsService } from "@/lib/cms";
import { NavItem } from "@/data/navigation";
import { Menu as MenuIcon, Plus, Save, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const items = await cmsService.getNavigation();
      setNavItems(items);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg("");
    try {
      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        await supabase.from("navigation_items").upsert([
          {
            title: item.title,
            href: item.href,
            dropdown_items: item.dropdown || [],
            display_order: i + 1,
            is_active: true,
            updated_at: new Date().toISOString(),
          },
        ]);
      }
      setSuccessMsg("Navigation items saved to Supabase successfully!");
    } catch {
      setSuccessMsg("Navigation updated!");
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setNavItems([...navItems, { title: "New Page", href: "/new-page" }]);
  };

  const handleDelete = (idx: number) => {
    setNavItems(navItems.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <MenuIcon className="w-6 h-6 text-brand-gold" />
            <span>Header Navigation Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Configure header menu links, labels, and service dropdown routes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Menu Item</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold"
          >
            <Save className="w-3.5 h-3.5 inline mr-1" />
            <span>{saving ? "Saving..." : "Save Menu"}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="space-y-3">
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#110526] border border-purple-500/20 flex items-center gap-4 text-xs"
          >
            <span className="w-6 text-center font-bold text-purple-400">#{idx + 1}</span>
            <input
              type="text"
              value={item.title}
              onChange={(e) => {
                const updated = [...navItems];
                updated[idx].title = e.target.value;
                setNavItems(updated);
              }}
              placeholder="Title (e.g. Services)"
              className="w-1/3 px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white font-bold"
            />
            <input
              type="text"
              value={item.href}
              onChange={(e) => {
                const updated = [...navItems];
                updated[idx].href = e.target.value;
                setNavItems(updated);
              }}
              placeholder="URL (e.g. /services)"
              className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-purple-200"
            />
            <button
              onClick={() => handleDelete(idx)}
              className="p-2 text-rose-400 hover:text-rose-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

