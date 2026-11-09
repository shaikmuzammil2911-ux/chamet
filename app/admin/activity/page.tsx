"use client";

import React, { useState } from "react";
import { History, Search, Shield, Clock, FileText, CheckCircle2 } from "lucide-react";

export default function AdminActivityPage() {
  const [logs] = useState([
    {
      id: "log-1",
      admin: "admin@manaverse.com",
      action: "UPDATED",
      entity: "Services",
      details: "Updated Real-Time Live Streaming narrative & stat numbers.",
      timestamp: "Today, 10:45 AM",
    },
    {
      id: "log-2",
      admin: "admin@manaverse.com",
      action: "CREATED",
      entity: "Team Members",
      details: "Added verified executive profile for James Au (CEO).",
      timestamp: "Today, 9:30 AM",
    },
    {
      id: "log-3",
      admin: "admin@manaverse.com",
      action: "UPLOADED",
      entity: "Cloudinary Media",
      details: "Uploaded high-resolution portrait for Koteswarao Gaddam.",
      timestamp: "Today, 9:15 AM",
    },
    {
      id: "log-4",
      admin: "admin@manaverse.com",
      action: "PUBLISHED",
      entity: "Home Hero Slides",
      details: "Published 3-slide auto-sliding showcase with updated clearance.",
      timestamp: "Yesterday, 4:20 PM",
    },
    {
      id: "log-5",
      admin: "admin@manaverse.com",
      action: "REVIEWED",
      entity: "Job Applications",
      details: "Updated candidate application stage to 'Under Review'.",
      timestamp: "Nov 8, 2:10 PM",
    },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <History className="w-6 h-6 text-brand-gold" />
          <span>Audit Activity Logs</span>
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 mt-1">
          Cryptographically recorded administrative actions, content publishing events, and security access trails.
        </p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-[#110526] border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{log.admin}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase bg-purple-900/60 text-brand-gold border border-purple-400/30">
                  {log.action}
                </span>
                <span className="text-[10px] text-brand-pink font-semibold">
                  {log.entity}
                </span>
              </div>
              <p className="text-purple-200/90">{log.details}</p>
            </div>

            <div className="flex items-center gap-1.5 text-purple-400 shrink-0 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
