import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Tutup sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed w-full flex justify-between items-center p-5 sm:p-10 transition-colors duration-300 z-50 ${
          scrolled ? "bg-[#111111] shadow-md" : "bg-transparent"
        } text-[#EEEEEE]`}
      >
        <a href="#" className="font-bold text-xl sm:text-3xl">
          Syarif Hidayatullah
        </a>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sm:hidden cursor-pointer hover:scale-90 hover:transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.39998 4.8C1.95815 4.8 1.59998 5.15818 1.59998 5.6C1.59998 6.04183 1.95815 6.4 2.39998 6.4H21.6C22.0417 6.4 22.4 6.04183 22.4 5.6C22.4 5.15818 22.0417 4.8 21.6 4.8H2.39998ZM1.59998 12C1.59998 11.5582 1.95815 11.2 2.39998 11.2H21.6C22.0417 11.2 22.4 11.5582 22.4 12C22.4 12.4418 22.0417 12.8 21.6 12.8H2.39998C1.95815 12.8 1.59998 12.4418 1.59998 12ZM1.59998 18.4C1.59998 17.9582 1.95815 17.6 2.39998 17.6H21.6C22.0417 17.6 22.4 17.9582 22.4 18.4C22.4 18.8418 22.0417 19.2 21.6 19.2H2.39998C1.95815 19.2 1.59998 18.8418 1.59998 18.4Z"
            fill="#EEEEEE"
          />
        </svg>

        <ul
          ref={menuRef}
          className={`flex flex-col sm:flex-row gap-5 sm:text-md fixed sm:static top-0 right-0 h-screen sm:h-auto w-2/3 sm:w-auto bg-[#111222] sm:bg-transparent p-10 sm:p-0 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full sm:translate-x-0"
          }`}
        >
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: { y: "#home", offsetY: 75 },
                  ease: "power",
                });
                setIsOpen(false);
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: { y: "#skills", offsetY: 75 },
                  ease: "power",
                });
                setIsOpen(false);
              }}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: { y: "#portfolio", offsetY: 75 },
                  ease: "power",
                });
                setIsOpen(false);
              }}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#certificate"
              onClick={(e) => {
                e.preventDefault();
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: { y: "#certificate", offsetY: 75 },
                  ease: "power",
                });
                setIsOpen(false);
              }}
            >
              Certificate
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
