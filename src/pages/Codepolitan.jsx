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
    { id: 1, title: "Pengembangan Web Fullstack dengan Laravel 11", file: "Pengembangan-Web-Fullstack-dengan-Laravel-11.pdf", level: "Advanced" },
    { id: 2, title: "Mengembangkan Sistem HRIS Seperti Talenta Menggunakan Laravel 12", file: "Mengembangkan-Sistem-HRIS-Seperti-Talenta-Menggunakan-Laravel-12.pdf", level: "Advanced" },
    { id: 3, title: "Membangun Aplikasi E-Wallet", file: "Membangun-Aplikasi-E-Wallet.pdf", level: "Advanced" },
    { id: 4, title: "Belajar Membuat Project Express.js Dengan MongoDB", file: "Belajar-Membuat-Project-Express.js-Dengan-MongoDB.pdf", level: "Advanced" },
    { id: 5, title: "Belajar Relasi Data di MongoDB (Database Relationship)", file: "Belajar-Relasi-Data-di-MongoDB-(Database-Relationship).pdf", level: "Intermediate" },
    { id: 6, title: "React.js State Management - Panduan Menggunakan State yg Baik", file: "React.js-State-Management---Panduan-Menggunakan-State-yg-Baik.pdf", level: "Intermediate" },
    { id: 7, title: "React.js State - Mengelola Perubahan Tampilan dengan Data bersama Event Handler", file: "React.js-State---Mengelola-Perubahan-Tampilan-dengan-Data-bersama-Event-Handler.pdf", level: "Intermediate" },
    { id: 8, title: "React.js - Bagaimana React.js Bekerja di Balik Layar", file: "React.js---Bagaimana-React.js-Bekerja-di-Balik-Layar.pdf", level: "Intermediate" },
    { id: 9, title: "React.js - Belajar Lebih Dalam Tentang Component dan Jenisnya", file: "React.js---Belajar-Lebih-Dalam-Tentang-Component-dan-Jenisnya.pdf", level: "Intermediate" },
    { id: 10, title: "Belajar React.js dengan Membuat Aplikasi Split Bill", file: "Belajar-React.js-dengan-Membuat-Aplikasi-Split-Bill.pdf", level: "Intermediate" },
    { id: 11, title: "React.js 101 - Membuat dan Menggunakan Komponen dalam Aplikasi Berbasis React", file: "React.js-101---Membuat-dan-Menggunakan-Komponen-dalam-Aplikasi-Berbasis-React.pdf", level: "Intermediate" },
    { id: 12, title: "Belajar Cepat Vue.js", file: "Belajar-Cepat-Vue.js.pdf", level: "Intermediate" },
    { id: 13, title: "Membuat UI UX Modern menggunakan AlpineJs", file: "Membuat-UI-UX-Modern-menggunakan-AlpineJs.pdf", level: "Intermediate" },
    { id: 14, title: "Belajar Membuat Halaman Web Dinamis dengan Express.js dan EJS", file: "Belajar-Membuat-Halaman-Web-Dinamis-dengan-Express.js-dan-EJS.pdf", level: "Intermediate" },
    { id: 15, title: "Konsep OOP di JavaScript", file: "Konsep-OOP-di-JavaScript.pdf", level: "Intermediate" },
    { id: 16, title: "JavaScript Asynchronous", file: "JavaScript-Asynchronous.pdf", level: "Intermediate" },
    { id: 17, title: "Belajar Menggunakan MongoDB di JavaScript", file: "Belajar-Menggunakan-MongoDB-di-JavaScript.pdf", level: "Intermediate" },
    { id: 18, title: "Belajar MongoDB", file: "Belajar-MongoDB.pdf", level: "Intermediate" },
    { id: 19, title: "PHP 8 dan MySQL Panduan CRUD Lengkap untuk Pemula", file: "PHP-8-dan-MySQL-Panduan-CRUD-Lengkap-untuk-Pemula.pdf", level: "Intermediate" },
    { id: 20, title: "Belajar Pemrograman PHP", file: "Belajar-Pemrograman-PHP.pdf", level: "Beginner" },
    { id: 21, title: "Belajar Dasar Express js", file: "Belajar-Dasar-Express-js.pdf", level: "Beginner" },
    { id: 22, title: "Belajar Dasar Node.js dan NPM", file: "Belajar-Dasar-Node.js-dan-NPM.pdf", level: "Beginner" },
    { id: 23, title: "Belajar ReactJS", file: "Belajar-ReactJS.pdf", level: "Beginner" },
    { id: 24, title: "Belajar AJAX dan Web API", file: "Belajar-AJAX-dan-Web-API.pdf", level: "Beginner" },
    { id: 25, title: "Belajar JavaScript DOM", file: "Belajar-JavaScript-DOM.pdf", level: "Beginner" },
    { id: 26, title: "Belajar JQuery Dasar", file: "Belajar-JQuery-Dasar.pdf", level: "Beginner" },
    { id: 27, title: "Belajar Dasar JavaScript", file: "Belajar-Dasar-JavaScript.pdf", level: "Beginner" },
    { id: 28, title: "Membuat Halaman Website Portofolio Menggunakan Tailwind CSS", file: "Membuat-Halaman-Website-Portofolio-Menggunakan-Tailwind-CSS.pdf", level: "Beginner" },
    { id: 29, title: "Membuat Landing Page Website dengan Bootstrap 4", file: "Membuat-Landing-Page-Website-dengan-Bootstrap-4.pdf", level: "Beginner" },
    { id: 30, title: "Belajar Bootstrap CSS Framework", file: "Belajar-Bootstrap-CSS-Framework.pdf", level: "Beginner" },
    { id: 31, title: "Pengenalan SASS Pada CSS", file: "Pengenalan-SASS-Pada-CSS.pdf", level: "Beginner" },
    { id: 32, title: "Belajar Dasar CSS", file: "Belajar-Dasar-CSS.pdf", level: "Beginner" },
    { id: 33, title: "Belajar Dasar HTML", file: "Belajar-Dasar-HTML.pdf", level: "Beginner" },
    { id: 34, title: "Developer dan Desain Membangun Dasar UI UX yang Solid", file: "Developer-dan-Desain-Membangun-Dasar-UI-UX-yang-Solid.pdf", level: "Beginner" },
    { id: 35, title: "Belajar GIT Lanjutan", file: "Belajar-GIT-Lanjutan.pdf", level: "Intermediate" },
    { id: 36, title: "Belajar Git Pemula", file: "Belajar-Git-Pemula.pdf", level: "Beginner" },
    { id: 37, title: "Revolusi Deployment, Bangun Website dengan AI Assist dan Deploy Instan dan Secure di EdgeOne", file: "Revolusi-Deployment,-Bangun-Website-dengan-AI-Assist-dan-Deploy-Instan-dan-Secure-di-EdgeOne.pdf", level: "Beginner" },
    { id: 38, title: "Belajar Menggunakan Terminal atau CMD untuk Development", file: "Belajar-Menggunakan-Terminal-atau-CMD-untuk-Development.pdf", level: "Beginner" },
    { id: 39, title: "Mahir menggunakan Text Editor buat Pemula", file: "Mahir-menggunakan-Text-Editor-buat-Pemula.pdf", level: "Beginner" },
    { id: 40, title: "Awal Menjadi Fullstack Web Developer", file: "Awal-Menjadi-Fullstack-Web-Developer.pdf", level: "Beginner" },
    { id: 41, title: "Algoritma dan Pemrograman Dasar", file: "Algoritma-dan-Pemrograman-Dasar.pdf", level: "Beginner" },
    { id: 42, title: "Mengenal Pemrograman Komputer", file: "Mengenal-Pemrograman-Komputer.pdf", level: "Beginner" },
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
              key={cert.id}
              ref={(el) => (listRef.current[index] = el)}
              href={getCertificatePath(cert.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl glass-subtle hover:bg-[var(--color-bg-tertiary)] transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-accent-muted)] flex items-center justify-center">
                <span className="text-[var(--color-accent)] font-semibold">{cert.id}</span>
              </div>

              {/* Title and Level */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-accent-light)] transition-colors mb-1">
                  {cert.title}
                </h3>
                <span className={`inline-block text-xs px-2 py-1 rounded-md ${getLevelColor(cert.level)}`}>
                  {cert.level}
                </span>
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-all group-hover:translate-x-1">
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
