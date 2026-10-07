"use client";

import React, { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import gsap from "gsap";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Fallback data (hardcoded) hanya digunakan jika Supabase belum diisi
const fallbackDataMap = {
  codepolitan: {
    name: "Codepolitan",
    category_type: "WEB DEVELOPMENT",
    list: [
      { id: "1", title: "Devhandal 2026", level: "Advanced", pdf_url: "/certificate/codepolitan/Devhandal 2026.pdf" },
      { id: "2", title: "Belajar Vue JS 3", level: "Intermediate", pdf_url: "/certificate/codepolitan/Belajar VueJS 3.pdf" },
      { id: "3", title: "Pengembangan Web Fullstack dengan Laravel 11", level: "Advanced", pdf_url: "/certificate/codepolitan/Pengembangan Web Fullstack dengan Laravel 11.pdf" },
      { id: "4", title: "Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12", level: "Advanced", pdf_url: "/certificate/codepolitan/Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12.pdf" },
      { id: "5", title: "Membangun Aplikasi E-Wallet", level: "Advanced", pdf_url: "/certificate/codepolitan/Membangun Aplikasi E-Wallet.pdf" },
      { id: "6", title: "Belajar Membuat Project Express.js Dengan MongoDB", level: "Advanced", pdf_url: "/certificate/codepolitan/Belajar Membuat Project Express.js Dengan MongoDB.pdf" },
      { id: "7", title: "Belajar Relasi Data di MongoDB", level: "Intermediate", pdf_url: "/certificate/codepolitan/Belajar Relasi Data di MongoDB (Database Relationship).pdf" },
      { id: "8", title: "React.js State Management", level: "Intermediate", pdf_url: "/certificate/codepolitan/React.js State Management - Panduan Menggunakan State yg Baik.pdf" },
      { id: "9", title: "JavaScript Asynchronous", level: "Intermediate", pdf_url: "/certificate/codepolitan/JavaScript Asynchronous.pdf" },
      { id: "10", title: "Belajar Dasar HTML", level: "Beginner", pdf_url: "/certificate/codepolitan/Belajar Dasar HTML.pdf" },
    ],
  },
  dicoding: {
    name: "Dicoding",
    category_type: "Programming",
    list: [
      { id: "1", title: "Belajar Dasar Git dengan GitHub", level: "Beginner", pdf_url: "/certificate/dicoding/Sertifikat-Dicoding-Belajar-Dasar-Git-dengan-Github.pdf" },
      { id: "2", title: "Belajar Dasar Pemrograman Web", level: "Beginner", pdf_url: "/certificate/dicoding/Belajar-Dasar-Pemrograman-Web.pdf" },
      { id: "3", title: "Memulai Pemrograman untuk Menjadi Pengembang Software", level: "Beginner", pdf_url: "/certificate/dicoding/Sertifikat-Dicoding-Memulai-Pemrograman-untuk-Menjadi-Pengembang-Software.pdf" },
      { id: "4", title: "Meniti Karier sebagai Software Developer", level: "Beginner", pdf_url: "/certificate/dicoding/Sertifikat-Dicoding-Meniti-Karier-sebagai-Software-Developer.pdf" },
      { id: "5", title: "Pengenalan Data pada Pemrograman Data 101", level: "Beginner", pdf_url: "/certificate/dicoding/Sertifikat-Dicoding-Pengenalan-Data-pada-Pemrograman-Data-101.pdf" },
    ],
  },
  bnsp: {
    name: "BNSP",
    category_type: "National Certification",
    list: [
      { id: "1", title: "Certificate of Competence BNSP", level: "Professional", pdf_url: "/certificate/bnsp/Certificate-Of-Competence-BNSP.pdf" },
    ],
  },
  "alibaba-cloud": {
    name: "Alibaba Cloud",
    category_type: "Cloud Technology",
    list: [
      { id: "1", title: "Alibaba Cloud Fundamental Training IDN", level: "Fundamental", pdf_url: "/certificate/alibaba-cloud/Alibaba-Cloud-Fundamental-Training-IDN.jpg" },
      { id: "2", title: "Dive Into Generative AI", level: "Intermediate", pdf_url: "/certificate/alibaba-cloud/Dive-Into-Generative-AI.jpg" },
      { id: "3", title: "Getting to Know Basic Services of Alibaba Cloud", level: "Beginner", pdf_url: "/certificate/alibaba-cloud/Getting-to-Know-Basic-Services-of-Alibaba-Cloud.jpg" },
      { id: "4", title: "Model Studio Fundamentals", level: "Intermediate", pdf_url: "/certificate/alibaba-cloud/Model-Studio-Fundamentals.jpg" },
    ],
  },
  gdsc: {
    name: "Google Developer Student Club",
    category_type: "Community",
    list: [
      { id: "1", title: "Sertifikat Web Dev GDSC UIN JKT", level: "Member", pdf_url: "/certificate/gdsc/Sertifikat-Web-Dev-GDSC-UIN-JKT.pdf" },
      { id: "2", title: "Sertifikat UI UX GDSC UIN JKT", level: "Member", pdf_url: "/certificate/gdsc/Serifikat-UI-UX-GDSC-UIN-JKT.pdf" },
    ],
  },
  prakerja: {
    name: "Prakerja",
    category_type: "Government Program",
    list: [
      { id: "1", title: "Fundamental UI Design dengan Figma", level: "Skills Training", pdf_url: "/certificate/prakerja/Sertifikat-Prakerja-Fundamental-UI-Design-dengan-Figma.pdf" },
      { id: "2", title: "Langkah untuk Berbisnis E-Commerce", level: "Business Training", pdf_url: "/certificate/prakerja/Sertifikat-Prakerja-Langkah-untuk-Berbisnis-E-Commerce.pdf" },
    ],
  },
  unpam: {
    name: "Universitas Pamulang",
    category_type: "Education",
    list: [
      { id: "1", title: "AI dan Blockchain Pilar Utama Personal Branding", level: "Seminar", pdf_url: "/certificate/unpam/AI-dan-Blockchain-Pilar-Utama-Personal-Branding-Mahasiswa.pdf" },
      { id: "2", title: "Masa Depan Web Development", level: "Seminar", pdf_url: "/certificate/unpam/Masa-Depan-Web-Development.pdf" },
    ],
  },
};

const ITEMS_PER_PAGE = 5;

export default function CertificatePage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [category, setCategory] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      if (isSupabaseConfigured) {
        try {
          // Fetch kategori berdasarkan slug
          const { data: catData, error: catError } = await supabase
            .from("certificate_categories")
            .select("*")
            .eq("slug", slug)
            .single();

          if (catError || !catData) {
            // Fallback ke hardcoded jika tidak ditemukan di DB
            const fallback = fallbackDataMap[slug];
            if (fallback) {
              setCategory({ name: fallback.name, category_type: fallback.category_type, slug });
              setCerts(fallback.list);
            }
          } else {
            setCategory(catData);

            // Fetch sertifikat berdasarkan category_id
            const { data: certsData, error: certsError } = await supabase
              .from("certificates")
              .select("*")
              .eq("category_id", catData.id)
              .order("order_index", { ascending: true });

            if (!certsError && certsData && certsData.length > 0) {
              setCerts(certsData);
            } else {
              // Fallback ke hardcoded
              const fallback = fallbackDataMap[slug];
              if (fallback) setCerts(fallback.list);
            }
          }
        } catch (err) {
          console.error(err);
          const fallback = fallbackDataMap[slug];
          if (fallback) {
            setCategory({ name: fallback.name, category_type: fallback.category_type, slug });
            setCerts(fallback.list);
          }
        }
      } else {
        // Gunakan hardcoded fallback
        const fallback = fallbackDataMap[slug];
        if (fallback) {
          setCategory({ name: fallback.name, category_type: fallback.category_type, slug });
          setCerts(fallback.list);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [slug]);

  const totalPages = Math.ceil(certs.length / ITEMS_PER_PAGE);
  const currentItems = certs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    const valid = listRef.current.filter(Boolean);
    if (valid.length > 0) {
      gsap.fromTo(valid, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
    }
  }, [currentPage, certs.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Loading certificates...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-20 px-5 sm:px-10 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Kategori tidak ditemukan</h1>
        <Link href="/#certificate" className="text-[var(--color-accent)] hover:underline text-sm">
          ← Kembali ke Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-20 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/#certificate"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mb-12">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)] block mb-2">
            {category.category_type}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2">
            Showing {certs.length} certified accomplishments
          </p>
        </div>

        {/* Items List */}
        <div className="divide-y divide-white/5 border-t border-b border-white/5 mb-12">
          {currentItems.map((cert, idx) => (
            <a
              key={cert.id}
              href={cert.pdf_url || "#"}
              target={cert.pdf_url ? "_blank" : "_self"}
              rel="noopener noreferrer"
              ref={(el) => (listRef.current[idx] = el)}
              className={`cert-item group flex items-center justify-between py-5 ${cert.pdf_url ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-zinc-500 font-mono text-sm">
                  {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={`text-base sm:text-lg font-semibold text-white transition-colors ${cert.pdf_url ? "group-hover:text-[var(--color-accent)]" : ""}`}>
                    {cert.title}
                  </h3>
                  <span className="text-xs text-zinc-500">{cert.level}</span>
                </div>
              </div>

              {cert.pdf_url && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400 group-hover:text-white hidden sm:block">
                    View Document
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-black transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page ? "bg-[#e4e4e7] text-black" : "glass-subtle text-zinc-400 hover:text-white"
                }`}>
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
