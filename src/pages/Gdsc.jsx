import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import Certi_1 from "../assets/certificate/gdsc/Serifikat-UI-UX-GDSC-UIN-JKT.pdf";
import Certi_2 from "../assets/certificate/gdsc/Sertifikat-Web-Dev-GDSC-UIN-JKT.pdf";

const Gdsc = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef([]);

  const certificates = [
    { id: 1, title: "Sertifikat UI/UX GDSC UIN JKT", file: Certi_1 },
    { id: 2, title: "Sertifikat Web Dev GDSC UIN JKT", file: Certi_2 },
  ];

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
  }, []);

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
            <span className="text-gradient">GDSC</span>
          </h1>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {certificates.length} certificates earned from Google Developer Student Clubs UIN Jakarta.
          </p>
        </div>

        {/* Certificate List */}
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <a
              key={cert.id}
              ref={(el) => (listRef.current[index] = el)}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-2xl glass-subtle hover:bg-[var(--color-bg-tertiary)] transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-accent-muted)] flex items-center justify-center">
                <span className="text-[var(--color-accent)] font-semibold">{cert.id}</span>
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-accent-light)] transition-colors truncate">
                  {cert.title}
                </h3>
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
      </div>
    </div>
  );
};

export default Gdsc;
