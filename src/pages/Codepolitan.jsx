import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ITEMS_PER_PAGE = 5;

const Codepolitan = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Certificates ordered by difficulty (hardest to easiest)
  // Using path strings to avoid import issues with long filenames
  const certificates = [
    { title: "Devhandal 2026", file: "Devhandal 2026.pdf", level: "Advanced", highlight: true, badge: "Tencent Collaboration" },
    { title: "Belajar Vue JS 3", file: "Belajar VueJS 3.pdf", level: "Intermediate" },
    { title: "Pengembangan Web Fullstack dengan Laravel 11", file: "Pengembangan-Web-Fullstack-dengan-Laravel-11.pdf", level: "Advanced" },
    { title: "Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12", file: "Mengembangkan-Sistem-HRIS-Seperti-Talenta-Menggunakan-Laravel-12.pdf", level: "Advanced" },
    { title: "Membangun Aplikasi E-Wallet", file: "Membangun-Aplikasi-E-Wallet.pdf", level: "Advanced" },
    { title: "Belajar Membuat Project Express.js Dengan MongoDB", file: "Belajar-Membuat-Project-Express.js-Dengan-MongoDB.pdf", level: "Advanced" },
    { title: "Belajar Relasi Data di MongoDB (Database Relationship)", file: "Belajar-Relasi-Data-di-MongoDB-(Database-Relationship).pdf", level: "Intermediate" },
    { title: "React.js State Management - Panduan Menggunakan State yg Baik", file: "React.js-State-Management---Panduan-Menggunakan-State-yg-Baik.pdf", level: "Intermediate" },
    { title: "React.js State - Mengelola Perubahan Tampilan dengan Data bersama Event Handler", file: "React.js-State---Mengelola-Perubahan-Tampilan-dengan-Data-bersama-Event-Handler.pdf", level: "Intermediate" },
    { title: "React.js - Bagaimana React.js Bekerja di Balik Layar", file: "React.js---Bagaimana-React.js-Bekerja-di-Balik-Layar.pdf", level: "Intermediate" },
    { title: "React.js - Belajar Lebih Dalam Tentang Component dan Jenisnya", file: "React.js---Belajar-Lebih-Dalam-Tentang-Component-dan-Jenisnya.pdf", level: "Intermediate" },
    { title: "Belajar React.js dengan Membuat Aplikasi Split Bill", file: "Belajar-React.js-dengan-Membuat-Aplikasi-Split-Bill.pdf", level: "Intermediate" },
    { title: "React.js 101 - Membuat dan Menggunakan Komponen dalam Aplikasi Berbasis React", file: "React.js-101---Membuat-dan-Menggunakan-Komponen-dalam-Aplikasi-Berbasis-React.pdf", level: "Intermediate" },
    { title: "Belajar Cepat Vue.js", file: "Belajar-Cepat-Vue.js.pdf", level: "Intermediate" },
    { title: "Membuat UI UX Modern menggunakan AlpineJs", file: "Membuat-UI-UX-Modern-menggunakan-AlpineJs.pdf", level: "Intermediate" },
    { title: "Belajar Membuat Halaman Web Dinamis dengan Express.js dan EJS", file: "Belajar-Membuat-Halaman-Web-Dinamis-dengan-Express.js-dan-EJS.pdf", level: "Intermediate" },
    { title: "Konsep OOP di JavaScript", file: "Konsep-OOP-di-JavaScript.pdf", level: "Intermediate" },
    { title: "JavaScript Asynchronous", file: "JavaScript-Asynchronous.pdf", level: "Intermediate" },
    { title: "Belajar Menggunakan MongoDB di JavaScript", file: "Belajar-Menggunakan-MongoDB-di-JavaScript.pdf", level: "Intermediate" },
    { title: "Belajar MongoDB", file: "Belajar-MongoDB.pdf", level: "Intermediate" },
    { title: "PHP 8 dan MySQL Panduan CRUD Lengkap untuk Pemula", file: "PHP-8-dan-MySQL-Panduan-CRUD-Lengkap-untuk-Pemula.pdf", level: "Intermediate" },
    { title: "Belajar Pemrograman PHP", file: "Belajar-Pemrograman-PHP.pdf", level: "Beginner" },
    { title: "Belajar Dasar Express js", file: "Belajar-Dasar-Express-js.pdf", level: "Beginner" },
    { title: "Belajar Dasar Node.js dan NPM", file: "Belajar-Dasar-Node.js-dan-NPM.pdf", level: "Beginner" },
    { title: "Belajar ReactJS", file: "Belajar-ReactJS.pdf", level: "Beginner" },
    { title: "Belajar AJAX dan Web API", file: "Belajar-AJAX-dan-Web-API.pdf", level: "Beginner" },
    { title: "Belajar JavaScript DOM", file: "Belajar-JavaScript-DOM.pdf", level: "Beginner" },
    { title: "Belajar JQuery Dasar", file: "Belajar-JQuery-Dasar.pdf", level: "Beginner" },
    { title: "Belajar Dasar JavaScript", file: "Belajar-Dasar-JavaScript.pdf", level: "Beginner" },
    { title: "Membuat Halaman Website Portofolio Menggunakan Tailwind CSS", file: "Membuat-Halaman-Website-Portofolio-Menggunakan-Tailwind-CSS.pdf", level: "Beginner" },
    { title: "Membuat Landing Page Website dengan Bootstrap 4", file: "Membuat-Landing-Page-Website-dengan-Bootstrap-4.pdf", level: "Beginner" },
    { title: "Belajar Bootstrap CSS Framework", file: "Belajar-Bootstrap-CSS-Framework.pdf", level: "Beginner" },
    { title: "Pengenalan SASS Pada CSS", file: "Pengenalan-SASS-Pada-CSS.pdf", level: "Beginner" },
    { title: "Belajar Dasar CSS", file: "Belajar-Dasar-CSS.pdf", level: "Beginner" },
    { title: "Belajar Dasar HTML", file: "Belajar-Dasar-HTML.pdf", level: "Beginner" },
    { title: "Developer dan Desain Membangun Dasar UI UX yang Solid", file: "Developer-dan-Desain-Membangun-Dasar-UI-UX-yang-Solid.pdf", level: "Beginner" },
    { title: "Belajar GIT Lanjutan", file: "Belajar-GIT-Lanjutan.pdf", level: "Intermediate" },
    { title: "Belajar Git Pemula", file: "Belajar-Git-Pemula.pdf", level: "Beginner" },
    { title: "Revolusi Deployment, Bangun Website dengan AI Assist dan Deploy Instan dan Secure di EdgeOne", file: "Revolusi-Deployment,-Bangun-Website-dengan-AI-Assist-dan-Deploy-Instan-dan-Secure-di-EdgeOne.pdf", level: "Beginner" },
    { title: "Belajar Menggunakan Terminal atau CMD untuk Development", file: "Belajar-Menggunakan-Terminal-atau-CMD-untuk-Development.pdf", level: "Beginner" },
    { title: "Mahir menggunakan Text Editor buat Pemula", file: "Mahir-menggunakan-Text-Editor-buat-Pemula.pdf", level: "Beginner" },
    { title: "Awal Menjadi Fullstack Web Developer", file: "Awal-Menjadi-Fullstack-Web-Developer.pdf", level: "Beginner" },
    { title: "Algoritma dan Pemrograman Dasar", file: "Algoritma-dan-Pemrograman-Dasar.pdf", level: "Beginner" },
    { title: "Mengenal Pemrograman Komputer", file: "Mengenal-Pemrograman-Komputer.pdf", level: "Beginner" },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCertificates = certificates.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of certificates list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get level badge color
  const getLevelColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-red-500/20 text-red-400";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "Beginner":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-[var(--color-accent-muted)] text-[var(--color-accent)]";
    }
  };

  // Get certificate file path
  const getCertificatePath = (filename) => {
    return `/src/assets/certificate/codepolitan/${filename}`;
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // List items stagger animation
    gsap.fromTo(
      listRef.current.filter(Boolean),
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, [currentPage]);

  return (
    <div ref={pageRef} className="min-h-screen py-12 px-5 sm:px-10">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-[var(--color-cyan)] opacity-[0.03] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors mb-8 group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase">
              Certificates
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
          </div>
          <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            <span className="text-gradient">Codepolitan</span>
          </h1>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {certificates.length} certificates earned from Codepolitan learning platform, sorted by difficulty level.
          </p>
        </div>

        {/* Certificate List */}
        <div className="space-y-4 mb-8">
          {paginatedCertificates.map((cert, index) => (
            <a
              key={cert.file}
              ref={(el) => (listRef.current[index] = el)}
              href={getCertificatePath(cert.file)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 p-5 rounded-2xl glass-subtle hover:bg-[var(--color-bg-tertiary)] transition-all duration-300 relative overflow-hidden ${
                cert.highlight ? "border border-yellow-500/50 bg-yellow-500/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]" : ""
              }`}
            >
              {cert.highlight && (
                 <div className="absolute -top-2 -right-2 p-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                     <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                         <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                     </svg>
                 </div>
              )}

              {/* Number Badge */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                cert.highlight ? "bg-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]" : "bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
              }`}>
                <span className="font-semibold">{startIndex + index + 1}</span>
              </div>

              {/* Title and Level */}
              <div className="flex-1 min-w-0 z-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className={`font-medium transition-colors ${cert.highlight ? "text-yellow-100 group-hover:text-yellow-200" : "text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-light)]"}`}>
                      {cert.title}
                    </h3>
                    {cert.badge && (
                       <span className="bg-yellow-500/20 text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-medium border border-yellow-500/30 uppercase tracking-wide">
                         {cert.badge}
                       </span>
                    )}
                </div>
                <span className={`inline-block text-xs px-2 py-1 rounded-md ${getLevelColor(cert.level)}`}>
                  {cert.level}
                </span>
              </div>

              {/* Arrow Icon */}
              <div className={`flex-shrink-0 transition-all group-hover:translate-x-1 ${cert.highlight ? "text-yellow-500" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]"}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed glass-subtle"
                  : "glass-subtle hover:bg-[var(--color-accent)] hover:text-white"
              }`}
              aria-label="Previous page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30"
                    : "glass-subtle text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed glass-subtle"
                  : "glass-subtle hover:bg-[var(--color-accent)] hover:text-white"
              }`}
              aria-label="Next page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center text-[var(--color-text-muted)] text-sm mt-4">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, certificates.length)} of {certificates.length} certificates
          </p>
        )}
      </div>
    </div>
  );
};

export default Codepolitan;
