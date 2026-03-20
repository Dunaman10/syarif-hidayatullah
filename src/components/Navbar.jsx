import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import CV from "../assets/cv.pdf";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );
    
    tl.fromTo(
      linksRef.current.filter(Boolean),
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power3.out" 
      },
      "-=0.4"
    );
  }, []);

  // Lock body scroll when menu is open
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["home", "skills", "portfolio", "certificate", "footer"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Special fallback for the last section (footer/contact)
          // If its bottom is fully visible in the viewport, make it active
          if (i === sections.length - 1 && rect.bottom <= window.innerHeight + 20 && rect.top < window.innerHeight) {
            setActiveSection(section);
            break;
          }

          // Normal section activation (top reaches 40% of screen height)
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
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
    
    // Small delay to allow menu to close first
    setTimeout(() => {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: `#${sectionId}`, offsetY: 80 },
        ease: "power2.out",
      });
    }, isOpen ? 150 : 0);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

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
        {/* Mobile Header / Logo (Hidden on Desktop to match design) */}
        <div className="flex sm:hidden items-center justify-between w-full">
          <a
            ref={logoRef}
            href="#"
            onClick={(e) => handleNavClick(e, "home")}
            className="font-bold text-xl tracking-tighter text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            Syarif<span className="text-[var(--color-accent)] ml-0.5">.</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
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
                  activeSection === item.id
                    ? "text-[var(--color-text-primary)]"
                    : ""
                }`}
              >
                {item.label}
                <span 
                  className={`absolute left-0 bottom-[-4px] w-full h-0.5 bg-[var(--color-accent)] rounded-full transition-transform duration-300 ease-out origin-left ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0"
                  }`} 
                />
              </a>
            </li>
          ))}
          
          {/* CTA Button */}
          <li ref={(el) => (linksRef.current[4] = el)} className="ml-auto">
            <a
              href={CV}
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
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`mobile-menu sm:hidden ${isOpen ? 'active' : ''}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-10 pt-2">
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
              Navigation
            </span>
          </div>

          {/* Menu Items */}
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

          {/* Mobile CTA */}
          <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center"
              onClick={closeMenu}
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
            
            {/* Social Links in Mobile */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <a
                href="https://github.com/Dunaman10"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/_dunaman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://dribbble.com/Dunaman"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm7.94 5.63a10.2 10.2 0 012.1 6.13c-.31-.06-3.39-.69-6.5-.3-.07-.15-.13-.3-.2-.46a24.57 24.57 0 00-.66-1.44c3.45-1.41 5.02-3.43 5.26-3.93zM12 1.88c2.51 0 4.82.89 6.63 2.38-.2.46-1.63 2.33-4.92 3.54a46.26 46.26 0 00-3.6-5.64c.61-.18 1.25-.28 1.89-.28zm-3.8.7a55.64 55.64 0 013.56 5.56c-4.48 1.19-8.44 1.17-8.88 1.17a10.19 10.19 0 015.32-6.73zM1.88 12v-.32c.43.01 5.08.08 9.85-1.38.28.54.54 1.09.78 1.64l-.35.1c-5.02 1.62-7.68 6.05-7.93 6.46A10.17 10.17 0 011.88 12zm10.12 10.12c-2.3 0-4.43-.76-6.14-2.05.19-.39 2.18-4.17 7.64-6.09l.06-.02a40.99 40.99 0 012.1 7.46 10.09 10.09 0 01-3.66.7zm5.45-1.63a41.23 41.23 0 00-1.91-6.98c2.9-.46 5.43.3 5.76.41a10.18 10.18 0 01-3.85 6.57z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll-to-Top Button */}
      <button
        onClick={(e) => handleNavClick(e, "home")}
        className={`sm:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] text-[var(--color-text-secondary)] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          scrolled
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
};

export default Navbar;
