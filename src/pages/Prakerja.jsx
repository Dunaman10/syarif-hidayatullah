import React from "react";
import { Link } from "react-router-dom";
import Certi_1 from "../assets/certificate/prakerja/Sertifikat-Prakerja-Langkah-untuk-Berbisnis-E-Commerce.pdf";
import Certi_2 from "../assets/certificate/prakerja/Sertifikat-Prakerja-Fundamental-UI-Design-dengan-Figma.pdf";

const Prakerja = () => {
  return (
    <>
      <div className="text-[#EEEEEE] p-5 sm:p-10">
        <div className="flex gap-2">
          <Link to={"/"}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.50885 11.5515H20.6804V13.5515H8.50885L13.8728 18.9154L12.4586 20.3296L4.68042 12.5515L12.4586 4.77332L13.8728 6.18753L8.50885 11.5515Z"
                fill="white"
              />
            </svg>
          </Link>
          <Link to={"/"} className=" hover:underline transition duration-300">
            Back
          </Link>
        </div>
        <h1 className="text-center mt-4 text-xl sm:text-2xl md:text-3xl">
          Prakerja
        </h1>

        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>1</p>
          <a href={Certi_1} target="_blank" className="sm:text-xl">
            Sertifikat Prakerja Langkah untuk Berbisnis E-Commerce
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>2</p>
          <a href={Certi_2} target="_blank" className="sm:text-xl">
            Sertifikat Prakerja Fundamental UI Design dengan Figma
          </a>
        </div>
      </div>
    </>
  );
};

export default Prakerja;
