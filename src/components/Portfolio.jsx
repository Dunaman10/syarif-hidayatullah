import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import UI/UX portfolio images
import AtTasawuq from "../assets/portfolio/at-tasawuq.jpg";
import CuteTopup from "../assets/portfolio/cute-topup.jpg";
import HouseSpace from "../assets/portfolio/housespace.jpg";
import KopiAnakSenja from "../assets/portfolio/kopi-anak-senja.jpg";
import CekCrypto from "../assets/portfolio/cekcrypto.jpg";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 6;

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
      title: "Movientory",
      description:
        "A movie discovery platform that allows users to search through thousands of movies and explore trending titles.",
      image: "/movientory.png",
      category: "web",
      tech: ["React", "Tailwind CSS", "TMDB API"],
      link: "https://movientory.vercel.app/",
    },
    {
      id: 2,
      title: "Trendy Wear",
      description:
        "A modern and stylish e-commerce landing page for a clothing brand with premium aesthetics.",
      image: "/trendy-wear.png",
      category: "web",
      tech: ["React", "Tailwind CSS"],
      link: "https://trendy-wear.vercel.app/",
    },
    {
      id: 3,
      title: "Wedding Invitation",
      description:
        "A digital wedding invitation template featuring interactive elements and elegant design.",
      image: "/wedding-invitation.png",
      category: "web",
      tech: ["HTML", "Tailwind CSS", "JavaScript"],
      link: "https://wedding-invitation-six-mu.vercel.app/",
    },
    {
      id: 4,
      title: "Company Profile",
      description:
        "A professional corporate landing page showcasing services, portfolio, and contact sections.",
      image: "/company-profile.png",
      category: "web",
      tech: ["HTML", "Materialize CSS", "JavaScript"],
      link: "https://company-profile-dusky.vercel.app/",
    },
    {
      id: 5,
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
      id: 6,
      title: "At-Tasawuq",
      description:
        "E-Commerce mobile app UI design for a shoes marketplace with modern product display and seamless shopping experience.",
      image: AtTasawuq,
      category: "uiux",
      tech: ["Figma", "UI Design", "Mobile App"],
      link: null,
    },
    {
      id: 7,
      title: "Cute Top Up",
      description:
        "Gaming top-up mobile app design featuring popular games like Mobile Legends, PUBG, Free Fire, and Honor of Kings.",
      image: CuteTopup,
      category: "uiux",
      tech: ["Figma", "UI Design", "Mobile App"],
      link: null,
    },
    {
      id: 8,
      title: "HouseSpace",
      description:
        "Real estate website design with property search functionality for finding homes, apartments, and residential properties.",
      image: HouseSpace,
      category: "uiux",
      tech: ["Figma", "Web Design", "UI/UX"],
      link: null,
    },
    {
      id: 9,
      title: "Kopi Anak Senja",
      description:
        "Coffee shop website with warm aesthetics, featuring menu showcase and beautiful landing page.",
      image: KopiAnakSenja,
      category: "web",
      tech: ["HTML", "CSS", "JavaScript"],
      link: null,
    },
    {
      id: 10,
      title: "CekCrypto",
      description:
        "Cryptocurrency market platform for tracking Bitcoin, Ethereum and other crypto prices with real-time data.",
      image: CekCrypto,
      category: "web",
      tech: ["HTML", "CSS", "JavaScript"],
      link: null,
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
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase">
              My Work
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
          </div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text-primary)]">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl">
            A showcase of my recent work, personal projects, and creative
            experiments.
          </p>
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="flex flex-wrap gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30"
                  : "glass-subtle text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)]/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              ref={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
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
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length} projects
          </p>
        )}
      </div>

      {/* Section divider */}
      <div className="section-divider mt-12" />
    </section>
  );
};

// Project Card Component
const ProjectCard = React.forwardRef(({ project }, ref) => {
  const cardRef = useRef(null);

  // 3D tilt effect on hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
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
      className={`portfolio-card group block ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="portfolio-card-img"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            project.category === 'uiux' 
              ? 'bg-[var(--color-cyan)]/20 text-[var(--color-cyan)]' 
              : 'bg-[var(--color-accent)]/20 text-[var(--color-accent-light)]'
          }`}>
            {project.category === 'uiux' ? 'UI/UX' : 'Web Dev'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-light)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-[var(--color-accent-muted)] text-[var(--color-accent-light)] font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.link ? (
          <div className="flex items-center gap-2 text-sm text-[var(--color-accent)] font-medium group-hover:gap-3 transition-all">
            <span>View Project</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] font-medium">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L9 7l1.5 7.5L18 13z" />
              <path d="M2 21l-1-8.5L11 2l8 1 1 9-7 11-4-2z" />
            </svg>
            <span>Design Only</span>
          </div>
        )}
      </div>
    </Wrapper>
  );
});

ProjectCard.displayName = "ProjectCard";

export default Portfolio;
