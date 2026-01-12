import Profil from "../assets/profil.png";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CV from "../assets/cv.pdf";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Home = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const roles = ["Fullstack Web Developer", "Front-End Web Developer", "Back-End Web Developer", "UI/UX Designer"];
    let i = 0;

    const loopText = () => {
      const tl = gsap.timeline();

      // Type text
      tl.to(textRef.current, {
        duration: 1.2,
        text: roles[i],
        ease: "none",
      });

      // Pause, then delete
      tl.to({}, { duration: 2 });

      tl.to(textRef.current, {
        duration: 0.6,
        text: "",
        ease: "none",
        onComplete: () => {
          i = (i + 1) % roles.length;
          loopText();
        },
      });
    };

    // Cursor blink animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power2.inOut",
    });

    loopText();
  }, []);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Profile image reveal
    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    // Subtitle reveal
    tl.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Description reveal
    tl.fromTo(
      descRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // Buttons reveal with stagger
    tl.fromTo(
      buttonsRef.current?.children || [],
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Floating animation for profile
    gsap.to(imageRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-5 sm:px-10 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[var(--color-accent)] opacity-5 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-[var(--color-accent)] opacity-5 blur-3xl" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div ref={imageRef} className="flex-shrink-0">
            <div className="profile-container w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <img
                src={Profil}
                alt="Syarif Hidayatullah"
                className="profile-img w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div
              ref={subtitleRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-sm text-[var(--color-text-secondary)]">
                Available for freelance work
              </span>
            </div>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="heading-display text-3xl sm:text-4xl lg:text-6xl text-[var(--color-text-primary)] leading-tight mb-4">
                <span ref={textRef} className="text-gradient"></span>
                <span
                  ref={cursorRef}
                  className="inline-block w-[3px] h-[1em] bg-[var(--color-accent)] ml-1 align-middle"
                />
              </h1>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-[var(--color-text-secondary)] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0 mb-8"
            >
              A passionate <span className="text-[var(--color-text-primary)] font-medium">Informatics Engineering</span> student
              with hands-on experience in web development and UI/UX design. 
              Crafting digital experiences that blend{" "}
              <span className="text-[var(--color-accent)]">creativity</span> with{" "}
              <span className="text-[var(--color-accent)]">functionality</span>.
            </p>

            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:-translate-y-1"
                >
                  <path
                    d="M12 2V16M12 16L7 11M12 16L17 11M3 20H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Download CV</span>
              </a>

              <a
                href="https://wa.me/6282133223201"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                <span>Say Hello</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M7.25361 18.9944L7.97834 19.417C9.18909 20.123 10.5651 20.5 12.001 20.5C16.4193 20.5 20.001 16.9183 20.001 12.5C20.001 8.08172 16.4193 4.5 12.001 4.5C7.5827 4.5 4.00098 8.08172 4.00098 12.5C4.00098 13.9363 4.37821 15.3128 5.08466 16.5238L5.50704 17.2478L4.85355 19.6494L7.25361 18.9944Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-12">
                <div className="text-center">
                  <div className="heading-display text-2xl sm:text-3xl text-gradient font-bold">
                    3+
                  </div>
                  <div className="text-[var(--color-text-muted)] text-sm mt-1">
                    Years Exp
                  </div>
                </div>
                <div className="w-px h-12 bg-[rgba(255,255,255,0.1)]" />
                <div className="text-center">
                  <div className="heading-display text-2xl sm:text-3xl text-gradient font-bold">
                    10+
                  </div>
                  <div className="text-[var(--color-text-muted)] text-sm mt-1">
                    Projects
                  </div>
                </div>
                <div className="w-px h-12 bg-[rgba(255,255,255,0.1)]" />
                <div className="text-center">
                  <div className="heading-display text-2xl sm:text-3xl text-gradient font-bold">
                    7+
                  </div>
                  <div className="text-[var(--color-text-muted)] text-sm mt-1">
                    Certificates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-[2px] h-8 bg-gradient-to-b from-[var(--color-accent)] to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default Home;
