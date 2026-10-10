"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If login page, skip auth check wrapper
    if (pathname === "/admin/login") {
      setLoading(false);
      setAuthenticated(true);
      return;
    }

    async function checkAuth() {
      if (!isSupabaseConfigured) {
        const isDemo = sessionStorage.getItem("demo_admin_logged_in");
        if (isDemo === "true") {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    }

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    } else {
      sessionStorage.removeItem("demo_admin_logged_in");
    }
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] text-zinc-400 text-sm">
        Loading admin console...
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navLinks = [
    { label: "Overview", href: "/admin" },
    { label: "Projects", href: "/admin/projects" },
    { label: "Skills", href: "/admin/skills" },
    { label: "Certificates", href: "/admin/certificates" },
    { label: "Profile", href: "/admin/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg-primary)] text-white">
      {/* Mobile & Tablet Header Bar */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[var(--color-bg-secondary)] sticky top-0 z-40 backdrop-blur-md">
        <Link href="/admin" className="font-bold text-base tracking-tight flex items-center gap-2">
          <span>Syarif<span className="text-[var(--color-accent)]">.</span> Studio</span>
          <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-[11px] text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5"
          >
            Live ↗
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (when open) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/5 bg-[#121214] px-5 py-4 flex flex-col gap-1 sticky top-[61px] z-30 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-semibold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-zinc-400 hover:text-white"
            >
              ↗ View Live Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex w-60 lg:w-64 border-r border-white/5 bg-[var(--color-bg-secondary)] p-6 flex-col justify-between flex-shrink-0 min-h-screen sticky top-0">
        <div>
          <div className="flex items-center justify-between mb-8">
            <Link href="/admin" className="font-bold text-lg tracking-tight">
              Syarif<span className="text-[var(--color-accent)]">.</span> Studio
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
              Admin
            </span>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-semibold"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            ↗ View Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-left text-xs text-red-400 hover:text-red-300 px-3.5 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto max-w-full md:max-w-6xl w-full">
        {children}
      </main>
    </div>
  );
}
