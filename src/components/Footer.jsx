import React from "react";

const Footer = () => {
  return (
    <>
      <div className="text-[#EEEEEE] p-5 sm:p-10 flex justify-between">
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold w">
          Syarif <br /> Hidayatullah
        </h1>
        <div className="flex gap-5 sm:gap-10">
          <div>
            <ul>
              <li>Home</li>
              <li>Skills</li>
              <li>Portfolio</li>
              <li>Certificate</li>
            </ul>
          </div>
          <div className="text-right">
            <ul>
              <li className="font-semibold">Social</li>
              <li>
                <a
                  href="https://www.instagram.com/_dunaman?igsh=MzU1ZGx0c290OW93"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://github.com/Dunaman10" target="_blank">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://dribbble.com/Dunaman" target="_blank">
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-[#EEEEEE] text-center py-8 text-xs font-light">
        © Copyright 2025 | Syarif Hidayatullah
      </p>
    </>
  );
};

export default Footer;
