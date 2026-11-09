"use client";

import React, { useState } from "react";
import { Shield, Plus, Edit2, Trash2, CheckCircle2, UserCheck, Key } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: "u-1",
      email: "admin@manaverse.com",
      name: "ManaVerse Super Admin",
      role: "Super Admin",
      status: "Active",
      lastLogin: "Today, Just now",
    },
    {
      id: "u-2",
      email: "editor@manaverse.com",
      name: "Content Editor",
      role: "Content Editor",
      status: "Active",
      lastLogin: "Yesterday",
    },
    {
      id: "u-3",
      email: "media@manaverse.com",
      name: "Media Manager",
      role: "Media Manager",
      status: "Active",
      lastLogin: "3 days ago",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "Content Editor" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: `u-${Date.now()}`,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        status: "Active",
        lastLogin: "Never",
      },
    ]);
    setIsModalOpen(false);
    setNewUser({ email: "", name: "", role: "Content Editor" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-gold" />
            <span>Admin Users & Role-Based Access Control</span>
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
            Manage administrative credentials, role assignments (Super Admin, Editor, Media Manager), and access permissions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="p-5 rounded-2xl bg-[#110526] border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold text-sm">
                {u.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{u.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                    {u.role}
                  </span>
                </div>
                <div className="text-purple-300 font-mono text-[11px] mt-0.5">
                  {u.email}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-purple-300">
              <span>Last Active: <strong className="text-white">{u.lastLogin}</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                {u.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#14062B] border border-purple-500/30 text-white space-y-4">
            <h2 className="text-base font-bold">Invite Administrator</h2>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-purple-200 mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-1 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="block text-purple-200 mb-1 font-bold">Role Privilege</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white"
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Content Editor">Content Editor (CMS Pages & Media)</option>
                  <option value="Media Manager">Media Manager (Cloudinary Only)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-purple-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-pink text-white font-bold"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
