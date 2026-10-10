"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { initialProfile } from "@/lib/mockData";
import FileUpload from "@/components/FileUpload";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!isSupabaseConfigured) return;
      try {
        const { data } = await supabase
          .from("site_settings")
          .select("*")
          .single();
        if (data) setProfile(data);
      } catch (e) {
        console.warn(e);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from("site_settings")
          .upsert({ ...profile, updated_at: new Date() });
        setSaved(true);
      } catch (err) {
        alert("Failed to save settings: " + err.message);
      }
    } else {
      setSaved(true);
    }
    setLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Profile & Bio Settings</h1>
        <p className="text-xs text-zinc-400">
          Update your headline, biography, contact email, and professional social links.
        </p>
      </div>

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          ✓ Profile settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="glass-card p-6 sm:p-8 flex flex-col gap-5">
        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={profile.full_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Role Title / Headline
          </label>
          <input
            type="text"
            required
            value={profile.role_title || ""}
            onChange={(e) =>
              setProfile({ ...profile, role_title: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            About Bio (Hero Section)
          </label>
          <textarea
            rows={4}
            required
            value={profile.bio || ""}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-zinc-300 block mb-1">
            Contact Email
          </label>
          <input
            type="email"
            required
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <FileUpload
            label="Curriculum Vitae (CV) - PDF File"
            folder="cv"
            accept=".pdf,application/pdf"
            value={profile.cv_url || ""}
            onChange={(url) => setProfile({ ...profile, cv_url: url })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={profile.github_url || ""}
              onChange={(e) =>
                setProfile({ ...profile, github_url: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={profile.linkedin_url || ""}
              onChange={(e) =>
                setProfile({ ...profile, linkedin_url: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Fiverr Profile URL
            </label>
            <input
              type="url"
              value={profile.fiverr_url || ""}
              onChange={(e) =>
                setProfile({ ...profile, fiverr_url: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-2.5 px-6 text-xs disabled:opacity-50"
          >
            {loading ? "Saving Changes..." : "Save Profile Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
