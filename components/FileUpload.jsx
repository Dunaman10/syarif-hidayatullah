"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * FileUpload Component
 * Mendukung upload file (PDF, dokumen, dll.) ke Supabase Storage ('portfolio-assets')
 * dengan UI modern, drag-and-drop / click to upload, progress indikator, dan preview/link.
 */
export default function FileUpload({
  value,
  onChange,
  folder = "documents",
  label = "Upload File",
  accept = ".pdf,application/pdf",
}) {
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
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileName = `${folder}/${Date.now()}-${safeName}`;

        const { data, error: uploadError } = await supabase.storage
          .from("portfolio-assets")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || "application/pdf",
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
      setError(
        err.message ||
          "Gagal mengunggah file. Pastikan bucket 'portfolio-assets' sudah dibuat di Supabase Storage."
      );
    } finally {
      setUploading(false);
    }
  };

  const getFileName = (url) => {
    if (!url) return "";
    try {
      const parts = url.split("/");
      return decodeURIComponent(parts[parts.length - 1]);
    } catch {
      return url;
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
        {label}
      </label>

      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Upload Button */}
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-white cursor-pointer transition-all flex-shrink-0">
            <svg
              className="w-4 h-4 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span>{uploading ? "Mengunggah PDF..." : "Pilih File PDF"}</span>
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          {/* Current File Display */}
          {value && (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300 flex-1 min-w-0">
              <span className="p-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[10px] uppercase">
                PDF
              </span>
              <span className="truncate flex-1 font-mono text-[11px] text-zinc-300">
                {getFileName(value)}
              </span>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
              >
                Lihat ↗
              </a>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-red-400 transition-colors"
                title="Hapus file"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[11px] text-red-400 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
}
