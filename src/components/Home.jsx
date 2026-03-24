import Profil from "../assets/profil.png";
import LogoFiverr from "../assets/logo-fiverr.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Reveal animation for the bento card
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  // 3D Tilt Effect Handlers
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate cursor position percentage relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    // Subtle max rotation (e.g., 4 degrees)
    gsap.to(card, {
      rotateY: xPct * 6,
      rotateX: -yPct * 6,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 1,
    });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-24 px-5 sm:px-10 flex items-center justify-center"
    >
      <div
        className="max-w-5xl mx-auto w-full relative z-10"
        style={{ perspective: "1500px" }}
      >
        {/* Main Bento Hero Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glass-card p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 lg:gap-24"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Decorative Starburst Lines SVG (Abstract background for the card) */}
          <svg
            className="absolute top-0 right-0 w-full h-full object-cover opacity-20 pointer-events-none"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "translateZ(-10px)" }}
          >
            <line
              x1="800"
              y1="0"
              x2="400"
              y2="600"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="800"
              y1="300"
              x2="0"
              y2="300"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="400"
              y1="0"
              x2="600"
              y2="600"
              stroke="white"
              strokeWidth="1"
            />
          </svg>

          {/* Left Column: Profile Info */}
          <div
            className="flex flex-col items-start gap-4 z-10 md:w-1/3"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[var(--color-bg-tertiary)] border border-[rgba(255,255,255,0.05)] shadow-lg mb-2">
              <img
                src={Profil}
                alt="Syarif Hidayatullah"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
                Syarif Hidayatullah
              </h1>
              <p className="text-[var(--color-text-secondary)] mt-1">
                Web Developer & UI/UX Designer
              </p>
            </div>

            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md w-max shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#1dbf73] shadow-[0_0_8px_rgba(29,191,115,0.6)] animate-pulse" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                Available for work
              </span>
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div
            className="flex flex-col items-start justify-center z-10 md:w-2/3"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Social Icons Mini List */}
            <div className="flex items-center gap-5 mb-6">
              <a
                href="https://github.com/Dunaman10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/_dunaman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://dribbble.com/Dunaman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="Dribbble"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm7.94 5.63a10.2 10.2 0 012.1 6.13c-.31-.06-3.39-.69-6.5-.3-.07-.15-.13-.3-.2-.46a24.57 24.57 0 00-.66-1.44c3.45-1.41 5.02-3.43 5.26-3.93zM12 1.88c2.51 0 4.82.89 6.63 2.38-.2.46-1.63 2.33-4.92 3.54a46.26 46.26 0 00-3.6-5.64c.61-.18 1.25-.28 1.89-.28zm-3.8.7a55.64 55.64 0 013.56 5.56c-4.48 1.19-8.44 1.17-8.88 1.17a10.19 10.19 0 015.32-6.73zM1.88 12v-.32c.43.01 5.08.08 9.85-1.38.28.54.54 1.09.78 1.64l-.35.1c-5.02 1.62-7.68 6.05-7.93 6.46A10.17 10.17 0 011.88 12zm10.12 10.12c-2.3 0-4.43-.76-6.14-2.05.19-.39 2.18-4.17 7.64-6.09l.06-.02a40.99 40.99 0 012.1 7.46 10.09 10.09 0 01-3.66.7zm5.45-1.63a41.23 41.23 0 00-1.91-6.98c2.9-.46 5.43.3 5.76.41a10.18 10.18 0 01-3.85 6.57z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/syarif-h-0b5069236/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11-.01-4.13 2.07 2.07 0 01.01 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                </svg>
              </a>
              <a
                href="https://www.fiverr.com/s/jjzVY3m"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity flex items-center justify-center p-0"
                title="Fiverr"
              >
                <img src={LogoFiverr} alt="Fiverr" className="w-[26px] h-[26px] object-contain brightness-0 invert" />
              </a>
            </div>

            <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8 max-w-xl text-justify">
              Detail-oriented{" "}
              <span className="font-medium text-[var(--color-text-primary)]">
              Web Developer
              </span>{" "}
              with hands-on experience building scalable applications. Skilled in end-to-end
              development, from database architecture to{" "}
              <span className="text-white">UI/UX implementation</span>, with a
              strong focus on delivering efficient solutions for business and
              academic needs.
            </p>

            <a
              href="#portfolio"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#portfolio", offsetY: 80 },
                  ease: "power3.inOut",
                });
              }}
            >
              <span>View My Work</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <div className="mt-12 text-sm text-[var(--color-text-muted)] tracking-wide">
              Where code meets craft — scroll to explore 🚀
            </div>
          </div>
        </div>

        {/* LinkedIn Activity */}
        <div className="mt-20 w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--color-accent)] text-sm font-medium tracking-wider uppercase">
              Latest Update
            </span>
            <div className="h-px w-24 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight mb-8">
            My <span className="text-[var(--color-accent)]">LinkedIn</span> Post
          </h2>
          <div className="w-full max-w-[504px] overflow-hidden rounded-2xl bg-white border border-[rgba(255,255,255,0.05)] shadow-[0_0_40px_rgba(0,0,0,0.2)] mx-auto flex justify-center">
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7442127826738360320" 
              height="663" 
              width="504" 
              frameBorder="0" 
              allowFullScreen="" 
              title="Posting tersemat"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
