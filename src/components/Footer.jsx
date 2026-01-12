import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/_dunaman",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Dunaman10",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/Dunaman",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm7.94 5.63a10.2 10.2 0 012.1 6.13c-.31-.06-3.39-.69-6.5-.3-.07-.15-.13-.3-.2-.46a24.57 24.57 0 00-.66-1.44c3.45-1.41 5.02-3.43 5.26-3.93zM12 1.88c2.51 0 4.82.89 6.63 2.38-.2.46-1.63 2.33-4.92 3.54a46.26 46.26 0 00-3.6-5.64c.61-.18 1.25-.28 1.89-.28zm-3.8.7a55.64 55.64 0 013.56 5.56c-4.48 1.19-8.44 1.17-8.88 1.17a10.19 10.19 0 015.32-6.73zM1.88 12v-.32c.43.01 5.08.08 9.85-1.38.28.54.54 1.09.78 1.64l-.35.1c-5.02 1.62-7.68 6.05-7.93 6.46A10.17 10.17 0 011.88 12zm10.12 10.12c-2.3 0-4.43-.76-6.14-2.05.19-.39 2.18-4.17 7.64-6.09l.06-.02a40.99 40.99 0 012.1 7.46 10.09 10.09 0 01-3.66.7zm5.45-1.63a41.23 41.23 0 00-1.91-6.98c2.9-.46 5.43.3 5.76.41a10.18 10.18 0 01-3.85 6.57z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/syarif-hidayatullah",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11-.01-4.13 2.07 2.07 0 01.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
        </svg>
      ),
    },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Certificate", href: "#certificate" },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: sectionId, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

  return (
    <footer ref={footerRef} className="footer relative pt-20 pb-8 px-5 sm:px-10">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 max-w-4xl rounded-full bg-[var(--color-accent)] opacity-[0.02] blur-[100px]" />

      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="heading-display text-3xl sm:text-4xl text-[var(--color-text-primary)] mb-4">
              Syarif <span className="text-gradient">.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Crafting digital experiences that blend creativity with functionality. 
              Let's build something amazing together.
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-[var(--color-text-primary)] font-semibold mb-6">
              Let's Connect
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            © {currentYear} Syarif Hidayatullah. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-bg-primary)] transition-all duration-300 group z-50"
        aria-label="Scroll to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform group-hover:-translate-y-1"
        >
          <path d="M18 15L12 9L6 15" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
