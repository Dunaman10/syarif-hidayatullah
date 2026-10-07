"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  // Initial animation - load semua item bersamaan dengan transisi halus
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );
    }
    
    const validLinks = linksRef.current.filter(Boolean);
    if (validLinks.length > 0) {
      tl.fromTo(
        validLinks,
        { opacity: 0, y: -15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.05, 
          ease: "power3.out" 
        },
        "-=0.4"
      );
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Dynamic Scroll Detection untuk active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Jika masih di paling atas
      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      // Cek apakah sudah mendekati dasar halaman (footer/contact)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection("footer");
        return;
      }

      const sections = ["home", "skills", "portfolio", "certificate", "footer"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Jalankan sekali saat mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Portfolio" },
    { id: "certificate", label: "Certificate" },
    { id: "footer", label: "Contact" },
  ];

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, isOpen ? 150 : 0);
  };

  const cvLink = profile?.cv_url || "/cv.pdf";

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-50 p-4 sm:p-6 pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto w-full max-w-5xl flex justify-between items-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl sm:rounded-full transition-all duration-500 ${
            scrolled 
              ? "bg-[rgba(20,20,20,0.85)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
              : "bg-[rgba(20,20,20,0.4)] backdrop-blur-md border border-[rgba(255,255,255,0.03)]"
          }`}
        >
          {/* Mobile Header / Logo */}
          <div className="flex sm:hidden items-center justify-between w-full">
            <a
              ref={logoRef}
              href="#home"
              onClick={(e) => handleNavClick(e, "home")}
              className="font-bold text-xl tracking-tighter text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Syarif<span className="text-[var(--color-accent)] ml-0.5">.</span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl glass-subtle z-[60]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 items-center justify-center w-5">
                <span
                  className={`block h-0.5 w-full bg-[var(--color-text-primary)] rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[var(--color-text-primary)] rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[var(--color-text-primary)] rounded-full transition-all duration-300 origin-center ${
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex flex-1 items-center gap-8">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  ref={(el) => (linksRef.current[index] = el)}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`nav-link ${
                    activeSection === item.id ? "active" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            
            {/* CTA Button */}
            <li ref={(el) => (linksRef.current[5] = el)} className="ml-auto">
              <a
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-sm py-2 px-6"
              >
                <span>Download CV</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay sm:hidden ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`mobile-menu sm:hidden ${isOpen ? 'active' : ''}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10 pt-2">
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
              Navigation
            </span>
          </div>

          <ul className="flex flex-col gap-2 flex-1">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className="text-xs font-medium text-[var(--color-accent)] opacity-60 w-6">
                    0{index + 1}
                  </span>
                  <span className="text-lg font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <a
              href={cvLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              <span>Download CV</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
