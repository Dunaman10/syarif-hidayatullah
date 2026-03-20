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
  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.8,
      effects: true,
    });
  });

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: location.hash, offsetY: 80 },
          ease: "power2.out"
        });
        
        // Remove the hash from URL cleanly so refresh starts at the top
        window.history.replaceState(null, '', location.pathname);
      }, 100); // wait for layout and smoother init
    } else {
      // Always scroll to top when navigating to a new route without a hash
      window.scrollTo(0, 0);
    }
  }, [location]);

  const hideNavbar = location.pathname.startsWith("/certificate");

  return (
    <>

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
