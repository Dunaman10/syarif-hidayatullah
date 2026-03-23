import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import UI/UX portfolio images
import AtTasawuq from "../assets/portfolio/at-tasawuq.jpg";
import CuteTopup from "../assets/portfolio/cute-topup.jpg";
import HouseSpace from "../assets/portfolio/housespace.jpg";
import KopiAnakSenja from "../assets/portfolio/kopi-anak-senja.jpg";
import CekCrypto from "../assets/portfolio/cekcrypto.jpg";
import Daruttafsir from "../assets/portfolio/daruttafsir.png";
import CateringMama from "../assets/portfolio/catering-mama.png";
import AmirElixir from "../assets/portfolio/amir-elixir.png";
import Zentury from "../assets/portfolio/zentury.png";
import VMS from "../assets/portfolio/vms.png";
import NanoConnect from "../assets/portfolio/nanoconnect.png";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 3;

const Portfolio = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const filtersRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Projects data - ordered by most advanced technology first
  const projects = [
    // Web Development Projects
    {
      id: 1,
      title: "Zentury",
      subtitle: "Front-End Web Development",
      description:
        "Modern landing page with high-performance animations and sleek UI, built with React 19, Tailwind CSS v4, and GSAP for smooth scroll-driven interactions.",
      image: Zentury,
      category: "web",
      tech: ["React", "Tailwind CSS", "GSAP"],
      link: "https://zenturyy.vercel.app/",
    },
    {
      id: 2,
      title: "Cute Top Up",
      description:
        "Gaming top-up mobile app design featuring popular games like Mobile Legends, PUBG, Free Fire, and Honor of Kings.",
      image: CuteTopup,
      category: "uiux",
      tech: ["Figma", "UI Design", "Mobile App"],
      link: null,
    },
    {
      id: 3,
      title: "Daruttafsir",
      description:
        "Modern Islamic education website for Pondok Pesantren Darut Tafsir featuring Quranic studies, facilities showcase, and student enrollment system.",
      image: Daruttafsir,
      category: "web",
      tech: ["Laravel", "Tailwind CSS", "MySQL"],
      link: "https://daruttafsir.santriqu.id/",
    },
    {
      id: 4,
      title: "VMS",
      description:
        "Full-featured Vehicle Management System built on TALL Stack with Filament v5 admin panel, Livewire v3 real-time components, and MySQL database.",
      image: VMS,
      category: "web",
      tech: ["Laravel 12", "Filament", "Livewire"],
      link: "https://vms.laravel.cloud/",
    },
    {
      id: 16,
      title: "NanoConnect",
      description:
        "Nano influencer marketplace platform connecting Indonesian SMEs (UMKM) with nano creators (1K-20K followers) for affordable, authentic, and effective local marketing campaigns.",
      image: NanoConnect,
      category: "web",
      tech: ["React", "Tailwind CSS", "EdgeOne"],
      link: "https://nanoconnect.edgeone.dev/",
    },
    {
      id: 5,
      title: "Catering Mama",
      description:
        "Professional catering service website offering authentic Indonesian home-cooked meals with online ordering and delivery service.",
      image: CateringMama,
      category: "web",
      tech: ["WordPress", "Elementor", "CSS"],
      link: "https://catering-mama.netlify.app/",
    },
    {
      id: 6,
      title: "Amir Elixir",
      description:
        "Luxury perfume e-commerce platform with premium design, featuring product catalog from Contentful CMS and elegant user experience.",
      image: AmirElixir,
      category: "web",
      tech: ["React", "Vite", "Contentful CMS"],
      link: "https://amirperfume.edgeone.dev/",
    },
    {
      id: 7,
      title: "Movientory",
      description:
        "A movie discovery platform that allows users to search through thousands of movies and explore trending titles.",
      image: "/movientory.png",
      category: "web",
      tech: ["React", "Tailwind CSS", "TMDB API"],
      link: "https://movientory.vercel.app/",
    },
    {
      id: 8,
      title: "Trendy Wear",
      description:
        "A modern and stylish e-commerce landing page for a clothing brand with premium aesthetics.",
      image: "/trendy-wear.png",
      category: "web",
      tech: ["React", "Tailwind CSS"],
      link: "https://trendy-wear.vercel.app/",
    },
    {
      id: 9,
      title: "Wedding Invitation",
      description:
        "A digital wedding invitation template featuring interactive elements and elegant design.",
      image: "/wedding-invitation.png",
      category: "web",
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      link: "https://wedding-invitation-six-mu.vercel.app/",
    },
    {
      id: 10,
      title: "Company Profile",
      description:
        "A professional corporate landing page showcasing services, portfolio, and contact sections.",
      image: "/company-profile.png",
      category: "web",
      tech: ["HTML", "Materialize CSS", "JavaScript"],
      link: "https://company-profile-dusky.vercel.app/",
    },
    {
      id: 11,
      title: "Flappy Bird Game",
      description:
        "A web-based recreation of the classic Flappy Bird game with additional cheat features.",
      image: "/flappy-bird.png",
      category: "web",
      tech: ["JavaScript", "HTML5 Canvas"],
      link: "https://flappy-bird-five-flame.vercel.app/",
    },
    // UI/UX Design Projects
    {
      id: 12,
      title: "At-Tasawuq",
      description:
        "E-Commerce mobile app UI design for a shoes marketplace with modern product display and seamless shopping experience.",
      image: AtTasawuq,
      category: "uiux",
      tech: ["Figma", "UI Design", "Mobile App"],
      link: null,
    },
    {
      id: 13,
      title: "HouseSpace",
      description:
        "Real estate website design with property search functionality for finding homes, apartments, and residential properties.",
      image: HouseSpace,
      category: "uiux",
      tech: ["Figma", "Web Design", "UI/UX"],
      link: null,
    },
    {
      id: 14,
      title: "Kopi Anak Senja",
      description:
        "Coffee shop website with warm aesthetics, featuring menu showcase and beautiful landing page.",
      image: KopiAnakSenja,
      category: "web",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://kedai-kopi-anak-senja-hrvo.vercel.app/",
    },
    {
      id: 15,
      title: "CekCrypto",
      description:
        "Cryptocurrency market platform for tracking Bitcoin, Ethereum and other crypto prices with real-time data.",
      image: CekCrypto,
      category: "web",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://cekcrypto.vercel.app/",
    },
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "uiux", label: "UI/UX Design" },
  ];

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to portfolio section
    const section = document.getElementById('portfolio');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

    // Filters animation
    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    // Re-animate cards when filter or page changes
    const validCards = cardsRef.current.filter(Boolean);
    if (!validCards.length) {
      // Even with no cards, refresh ScrollTrigger for layout recalculation
      ScrollTrigger.refresh();
      return;
    }

    gsap.fromTo(
      validCards,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        overwrite: true,
        onComplete: () => {
          // Recalculate scroll positions after content height changes
          ScrollTrigger.refresh();
        },
      }
    );
  }, [activeFilter, currentPage, paginatedProjects.length]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 px-5 sm:px-10 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[var(--color-cyan)] opacity-[0.02] blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase">
              My Work
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] tracking-tight">
            My <span className="text-[var(--color-accent)]">Portfolio</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl">
            A showcase of my recent work, personal projects, and creative
            experiments.
          </p>
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="flex flex-nowrap sm:flex-wrap items-center gap-1 sm:gap-2 mb-12 p-1.5 sm:p-2 rounded-full border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] w-full sm:w-max max-w-full overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-[15px] font-semibold transition-all duration-500 whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-transparent border border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "bg-transparent border border-transparent text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" style={{ perspective: "1500px" }}>
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              ref={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>

        {/* Pagination & Details */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-16 gap-6 w-full">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)]"
                    : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                }`}
                aria-label="Previous page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-[15px] font-bold transition-all duration-300 ${
                    currentPage === page
                      ? "bg-[#e4e4e7] text-black shadow-[0_0_20px_rgba(228,228,231,0.2)]"
                      : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-muted)]"
                    : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                }`}
                aria-label="Next page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            
            {/* Page info */}
            <p className="text-[var(--color-text-secondary)] font-medium text-[15px]">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
            </p>
          </div>
        )}
      </div>

      {/* Section divider */}
      <div className="section-divider mt-12" />
    </section>
  );
};

// Project Card Component
const ProjectCard = React.forwardRef(({ project, index }, ref) => {
  const cardRef = useRef(null);
  
  // Premium Staggered Layout Logic
  // Indexes 0, 3, 6 will span full width (2 columns). Others will be 1 column squares.
  const isFullWidth = index % 3 === 0;
  // Indexes 3, 9 will push the image to the left side instead of right, alternating the layout heavily!
  const isReversed = index % 6 === 3;

  // 3D tilt effect on hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;

    gsap.to(cardRef.current, {
      rotateY: xPct * 5,
      rotateX: -yPct * 5,
      transformPerspective: 1200,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  // Wrapper component - use anchor if link exists, div otherwise
  const Wrapper = project.link ? 'a' : 'div';
  const wrapperProps = project.link ? {
    href: project.link,
    target: "_blank",
    rel: "noopener noreferrer",
  } : {};

  return (
    <Wrapper
      {...wrapperProps}
      ref={(el) => {
        cardRef.current = el;
        if (ref) {
          if (typeof ref === "function") {
            ref(el);
          } else {
            ref.current = el;
          }
        }
      }}
      className={`glass-card p-0 relative overflow-hidden group block transition-colors duration-500 hover:border-[rgba(255,255,255,0.15)] hover:shadow-2xl flex ${
        isFullWidth ? `flex-col md:col-span-2 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}` : 'flex-col col-span-1'
      } ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Content Area */}
      <div 
        className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 z-10 ${isFullWidth ? 'md:w-1/2' : 'w-full order-last'} ${isReversed ? 'md:pl-12' : ''}`} 
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="text-[var(--color-text-secondary)] text-xs font-semibold tracking-wider mb-2 uppercase">
          {project.subtitle ? project.subtitle : isFullWidth ? "Portfolio" : project.category === 'uiux' ? "UI/UX Design" : "Web Development"}
        </span>
        
        <h3 className={`font-bold text-[var(--color-text-primary)] tracking-tight mb-4 group-hover:text-[var(--color-accent-light)] transition-colors ${
          isFullWidth ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
        }`}>
          {project.title}
        </h3>
        
        <p className="text-[var(--color-text-secondary)] text-[15px] sm:text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[var(--color-text-secondary)] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.link ? (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-primary)] font-semibold group-hover:gap-3 transition-all mt-auto w-max">
            <span className="border-b border-transparent group-hover:border-[var(--color-text-primary)] transition-colors pb-0.5">Explore Project</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-medium mt-auto w-max">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Design Concept</span>
          </div>
        )}
      </div>

      {/* Image Area */}
      <div 
        className={`relative overflow-hidden flex items-center justify-center bg-[var(--color-bg-tertiary)] ${
          isFullWidth ? `md:w-1/2 min-h-[220px] sm:min-h-[280px] md:min-h-0 md:self-stretch ${isReversed ? 'border-r' : 'border-l'} border-[rgba(255,255,255,0.05)]` : 'w-full aspect-video order-first border-b border-[rgba(255,255,255,0.05)]'
        }`}
        style={{ transform: "translateZ(10px)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </Wrapper>
  );
});

ProjectCard.displayName = "ProjectCard";

export default Portfolio;
