"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  initialProjects,
  initialSkills,
  initialCertificates,
} from "@/lib/mockData";
import Link from "next/link";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    projectsCount: initialProjects.length,
    skillsCount: initialSkills.length,
    certsCount: initialCertificates.length,
  });

  useEffect(() => {
    async function loadCounts() {
      if (!isSupabaseConfigured) return;
      try {
        const [{ count: pCount }, { count: sCount }, { count: cCount }] =
          await Promise.all([
            supabase.from("projects").select("*", { count: "exact", head: true }),
            supabase.from("skills").select("*", { count: "exact", head: true }),
            supabase.from("certificates").select("*", { count: "exact", head: true }),
          ]);

        setStats({
          projectsCount: pCount ?? initialProjects.length,
          skillsCount: sCount ?? initialSkills.length,
          certsCount: cCount ?? initialCertificates.length,
        });
      } catch (e) {
        console.warn("Count fetch error:", e);
      }
    }

    loadCounts();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
          Welcome back, Syarif 👋
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage and update portfolio contents dynamically across web, mobile, and certificates.
        </p>
      </div>

      {/* Supabase connection status banner */}
      {!isSupabaseConfigured ? (
        <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-amber-300">
              Supabase Belum Terhubung (.env.local)
            </h4>
            <p className="text-xs text-amber-200/70 mt-0.5">
              Website saat ini berjalan dengan data mock lokal. Masukkan URL dan Anon Key di <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">.env.local</code> untuk menyinkronkan database langsung ke cloud.
            </p>
          </div>
          <span className="text-[11px] font-semibold uppercase px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full shrink-0">
            Mock Mode Active
          </span>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-semibold text-emerald-300">
              Supabase Connected & Synchronized
            </h4>
          </div>
          <span className="text-[11px] font-semibold uppercase px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
            Live Cloud
          </span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Total Projects
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-white">
              {stats.projectsCount}
            </span>
            <Link
              href="/admin/projects"
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Manage →
            </Link>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Skills & Tools
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-white">
              {stats.skillsCount}
            </span>
            <Link
              href="/admin/skills"
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Manage →
            </Link>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            Certifications
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-white">
              {stats.certsCount}
            </span>
            <Link
              href="/admin/certificates"
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Manage →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="glass-card p-6 sm:p-8">
        <h3 className="text-base font-semibold text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/projects"
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all block"
          >
            <h4 className="text-sm font-semibold text-white mb-1">
              Add New Project
            </h4>
            <p className="text-xs text-zinc-400">
              Publish new case study, upload thumbnail, and assign tech stack.
            </p>
          </Link>

          <Link
            href="/admin/certificates"
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all block"
          >
            <h4 className="text-sm font-semibold text-white mb-1">
              Add Certificate
            </h4>
            <p className="text-xs text-zinc-400">
              Upload PDF credentials and issuer details.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
