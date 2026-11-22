"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  MapPin,
  Image as ImageIcon,
  Mail,
  Settings,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, don't show admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Tour Packages", href: "/admin/packages", icon: Package },
    { label: "Destinations", href: "/admin/destinations", icon: MapPin },
    { label: "Hero Banners", href: "/admin/banners", icon: ImageIcon },
    { label: "Contact Messages", href: "/admin/messages", icon: Mail },
    { label: "Website Content", href: "/admin/content", icon: Settings },
    { label: "Admin Users", href: "/admin/admins", icon: Users },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    } finally {
      setLoggingOut(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F3F6FD] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#232c57] text-white shrink-0 shadow-xl border-r border-[#181f3d]">
        {/* Brand */}
        <div className="p-6 border-b border-[#181f3d] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative h-10 w-36 bg-white/10 p-1.5 rounded-lg">
              <Image
                src="/assets/img/logo.png"
                alt="Layali Kerala"
                fill
                className="object-contain brightness-200"
              />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-2">
            Management Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-[#F79837] text-white font-semibold shadow-md"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-[#F79837]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 mt-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#F79837]" />
                View Live Site
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-[#181f3d] bg-[#181f3d]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F79837] text-white font-bold text-xs flex items-center justify-center">
                LK
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Layali Admin</p>
                <p className="text-[10px] text-gray-400">admin@layalikerala.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-1.5 text-gray-400 hover:text-red-400 transition rounded-lg hover:bg-white/5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <span className="font-heading font-bold text-lg text-[#232c57] hidden sm:inline-block">
              Layali Kerala Administration
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-[#232c57] bg-[#F3F6FD] hover:bg-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F79837]" />
              Visit Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#232c57] text-white p-4 space-y-2 border-b border-gray-700">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    active ? "bg-[#F79837] text-white" : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
