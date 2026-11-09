"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChametLogo } from "@/components/ui/ChametLogo";
import {
  LayoutDashboard,
  Layers,
  Home,
  Briefcase,
  Users,
  Compass,
  GraduationCap,
  FileText,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  Menu as MenuIcon,
  Compass as FooterIcon,
  FilePlus,
  Search,
  Settings,
  Shield,
  History,
  Activity,
  LogOut,
  ExternalLink,
  ChevronDown,
  Bell,
  X,
  Radio,
  CheckCircle2,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { title: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Website Content Hub", href: "/admin/content", icon: Layers },
  { title: "Home Page CMS", href: "/admin/home", icon: Home },
  { title: "Services Management", href: "/admin/services", icon: Briefcase },
  { title: "About Us CMS", href: "/admin/about", icon: FileText },
  { title: "Vision & Core Values", href: "/admin/vision", icon: Compass },
  { title: "Team Management", href: "/admin/team", icon: Users },
  { title: "Careers & Openings", href: "/admin/careers", icon: GraduationCap },
  { title: "Job Applications", href: "/admin/applications", icon: FileText, badge: "Live" },
  { title: "Contact Settings", href: "/admin/contact", icon: Mail },
  { title: "Contact Inquiries", href: "/admin/inquiries", icon: MessageSquare, badge: "Forms" },
  { title: "Cloudinary Media", href: "/admin/media", icon: ImageIcon },
  { title: "Header Navigation", href: "/admin/navigation", icon: MenuIcon },
  { title: "Footer Management", href: "/admin/footer", icon: FooterIcon },
  { title: "Page Builder", href: "/admin/pages", icon: FilePlus },
  { title: "SEO Management", href: "/admin/seo", icon: Search },
  { title: "Website Settings", href: "/admin/settings", icon: Settings },
  { title: "Admin Users & Roles", href: "/admin/users", icon: Shield },
  { title: "Audit Activity Logs", href: "/admin/activity", icon: History },
  { title: "System & DB Status", href: "/admin/system", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string; name?: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Auth Guard
  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsCheckingAuth(false);
      return;
    }

    try {
      const stored = localStorage.getItem("manaverse_admin_session");
      if (!stored) {
        router.push("/admin/login");
        return;
      }
      setAdminUser(JSON.parse(stored));
    } catch {
      router.push("/admin/login");
    } finally {
      setIsCheckingAuth(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("manaverse_admin_session");
    router.push("/admin/login");
  };

  // If on login page, just render children without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#070114] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-purple-300 font-bold tracking-wider">
            Loading Admin Workspace...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080214] text-white flex">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0E0424] border-r border-purple-500/20 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo & Close for Mobile */}
          <div className="p-5 border-b border-purple-500/15 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <ChametLogo size="sm" />
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-gold text-purple-950">
                CMS
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-purple-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick System Badge */}
          <div className="px-5 py-3 border-b border-purple-500/10 flex items-center justify-between text-xs text-purple-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase Connected</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/60 font-semibold text-purple-200">
              v2.0
            </span>
          </div>

          {/* Nav Items List */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-transparent">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg shadow-purple-950/60"
                      : "text-purple-200/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-brand-gold" : "text-purple-400"}`} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-brand-pink/30 border border-brand-pink/50 text-pink-200 font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User & Logout */}
        <div className="p-4 border-t border-purple-500/15 space-y-3 bg-[#0A021B]">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-white truncate">
                {adminUser?.email || "admin@manaverse.com"}
              </div>
              <div className="text-[10px] text-brand-gold font-semibold">
                Super Admin
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-purple-300 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-purple-200 hover:text-white transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 px-4 sm:px-8 border-b border-purple-500/20 bg-[#0E0424]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 text-purple-300 hover:text-white"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <div className="text-sm font-black text-white">
                ManaVerse Administration Console
              </div>
              <div className="text-[11px] text-purple-300">
                Live Supabase Synchronization Active
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-bold hover:bg-brand-gold/25 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="p-2 rounded-xl bg-white/5 text-purple-300 hover:text-white relative"
              title="Inquiries"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-brand-pink absolute top-1.5 right-1.5 ring-2 ring-[#0E0424]" />
            </Link>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-purple-300 hover:text-rose-400 text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Child Pages Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
