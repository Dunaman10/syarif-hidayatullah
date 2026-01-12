import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certificate = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  const certificates = [
    {
      id: 1,
      name: "Codepolitan",
      path: "/certificate/codepolitan",
      count: "5+ Certificates",
      category: "Web Development",
    },
    {
      id: 2,
      name: "Dicoding",
      path: "/certificate/dicoding",
      count: "3+ Certificates",
      category: "Programming",
    },
    {
      id: 3,
      name: "BNSP",
      path: "/certificate/bnsp",
      count: "Professional",
      category: "National Certification",
    },
    {
      id: 4,
      name: "Alibaba Cloud",
      path: "/certificate/alibaba-cloud",
      count: "Cloud Computing",
      category: "Cloud Technology",
    },
    {
      id: 5,
      name: "Google Developer Student Club",
      path: "/certificate/gdsc",
      count: "Member",
      category: "Community",
    },
    {
      id: 6,
      name: "Prakerja",
      path: "/certificate/prakerja",
      count: "Skills Training",
      category: "Government Program",
    },
    {
      id: 7,
      name: "Universitas Pamulang",
      path: "/certificate/unpam",
      count: "Academic",
      category: "Education",
    },
  ];

  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Items stagger animation
    gsap.fromTo(
      itemsRef.current.filter(Boolean),
      {
        opacity: 0,
        x: -60,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id="certificate"
      ref={sectionRef}
      className="relative py-24 px-5 sm:px-10 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase">
              Achievements
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
          </div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            Certificates & <span className="text-gradient">Awards</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl">
            Professional certifications and achievements that validate my expertise and continuous learning.
          </p>
        </div>

        {/* Certificates List */}
        <div className="space-y-1">
          {certificates.map((cert, index) => (
            <Link
              key={cert.id}
              to={cert.path}
              ref={(el) => (itemsRef.current[index] = el)}
              className="cert-item group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-6 sm:gap-10">
                {/* Number */}
                <span className="cert-number w-8 text-right font-light">
                  {String(cert.id).padStart(2, "0")}
                </span>

                {/* Name */}
                <div>
                  <h3 className="cert-title font-medium">{cert.name}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm mt-0.5 hidden sm:block">
                    {cert.category}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-[var(--color-text-muted)] text-sm">
                  {cert.count}
                </span>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-tertiary)] group-hover:bg-[var(--color-accent)] transition-all duration-300 transform group-hover:translate-x-2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-bg-primary)] transition-colors"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 p-8 glass-card rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="heading-display text-3xl sm:text-4xl text-gradient font-bold mb-2">
                7+
              </div>
              <div className="text-[var(--color-text-muted)] text-sm">
                Institutions
              </div>
            </div>
            <div className="text-center">
              <div className="heading-display text-3xl sm:text-4xl text-gradient font-bold mb-2">
                15+
              </div>
              <div className="text-[var(--color-text-muted)] text-sm">
                Certificates
              </div>
            </div>
            <div className="text-center">
              <div className="heading-display text-3xl sm:text-4xl text-gradient font-bold mb-2">
                5+
              </div>
              <div className="text-[var(--color-text-muted)] text-sm">
                Categories
              </div>
            </div>
            <div className="text-center">
              <div className="heading-display text-3xl sm:text-4xl text-gradient font-bold mb-2">
                3+
              </div>
              <div className="text-[var(--color-text-muted)] text-sm">
                Years Learning
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
