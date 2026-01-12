import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Certificate from "./components/Certificate";
import Footer from "./components/Footer";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Codepolitan from "./pages/Codepolitan";
import Dicoding from "./pages/Dicoding";
import Bnsp from "./pages/Bnsp";
import AlibabaCloud from "./pages/AlibabaCloud";
import Gdsc from "./pages/Gdsc";
import Prakerja from "./pages/Prakerja";
import Unpam from "./pages/Unpam";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin);

const App = () => {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });
  });

  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = cursorFollowerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn-primary, .btn-secondary, .skill-badge, .portfolio-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/certificate");

  return (
    <>
      {/* Custom Cursor (hidden on mobile) */}
      <div
        ref={cursorRef}
        className="cursor hidden lg:block"
        style={{ pointerEvents: "none" }}
      />
      <div
        ref={cursorFollowerRef}
        className="cursor-follower hidden lg:block"
        style={{ pointerEvents: "none" }}
      />

      {!hideNavbar && <Navbar />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Home />
                  <Skills />
                  <Portfolio />
                  <Certificate />
                  <Footer />
                </main>
              }
            />

            <Route path="/certificate/codepolitan" element={<Codepolitan />} />
            <Route path="/certificate/dicoding" element={<Dicoding />} />
            <Route path="/certificate/bnsp" element={<Bnsp />} />
            <Route
              path="/certificate/alibaba-cloud"
              element={<AlibabaCloud />}
            />
            <Route path="/certificate/gdsc" element={<Gdsc />} />
            <Route path="/certificate/prakerja" element={<Prakerja />} />
            <Route path="/certificate/unpam" element={<Unpam />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
