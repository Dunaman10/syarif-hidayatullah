"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * ImageUpload Component
 * Mendukung upload file langsung ke Supabase Storage ('portfolio-assets')
 * atau memasukkan URL/path gambar secara manual.
 */
export default function ImageUpload({ value, onChange, folder = "uploads", label = "Gambar / Icon" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      if (isSupabaseConfigured) {
        // Upload langsung ke Supabase Storage bucket 'portfolio-assets'
        const fileExt = file.name.split(".").pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from("portfolio-assets")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Ambil Public URL
        const { data: publicUrlData } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(fileName);

        if (publicUrlData?.publicUrl) {
          onChange(publicUrlData.publicUrl);
        }
      } else {
        // Fallback untuk mode lokal / offline preview menggunakan FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Gagal mengunggah gambar. Pastikan bucket 'portfolio-assets' sudah dibuat di Supabase Storage.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {/* Preview Box */}
        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0 relative group">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-xs text-zinc-500 font-mono">No Pic</span>
          )}
        </div>

        {/* Upload Input */}
        <div className="flex-1 space-y-1.5">
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-white cursor-pointer transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span>{uploading ? "Mengunggah..." : "Pilih File Gambar / Icon"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau masukkan path/URL: /portfolio/zentury.png"
            className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-white/30 font-mono"
          />
        </div>
      </div>

      {error && (
        <p className="text-[11px] text-red-400 mt-1.5">{error}</p>
      )}
    </div>
  );
}
