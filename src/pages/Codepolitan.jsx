import React from "react";
import { Link } from "react-router-dom";
import Certi_1 from "../assets/certificate/codepolitan/Pengembangan-Web-Fullstack-dengan-Laravel-11.pdf";
import Certi_2 from "../assets/certificate/codepolitan/Belajar-React.js-dengan-Membuat-Aplikasi-Split-Bill.pdf";
import Certi_3 from "../assets/certificate/codepolitan/Membuat-UI-UX-Modern-menggunakan-AlpineJs.pdf";
import Certi_4 from "../assets/certificate/codepolitan/React.js-Bagaimana-React.js-Bekerja-di-Balik-Layar.pdf";
import Certi_5 from "../assets/certificate/codepolitan/React.js-Belajar-Lebih-Dalam-Tentang-Component-dan-Jenisnya.pdf";

const Codepolitan = () => {
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
          Codepolitan
        </h1>

        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>1</p>
          <a href={Certi_1} target="_blank" className="sm:text-xl">
            Pengembangan Web Fullstack dengan Laravel 11
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>2</p>
          <a href={Certi_2} target="_blank" className="sm:text-xl">
            Belajar React.js dengan Membuat Aplikasi Split Bill
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>3</p>
          <a href={Certi_3} target="_blank" className="sm:text-xl">
            Membuat UI UX Modern menggunakan AlpineJs
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>4</p>
          <a href={Certi_4} target="_blank" className="sm:text-xl">
            React.js - Bagaimana React.js Bekerja di Balik Layar
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>5</p>
          <a href={Certi_5} target="_blank" className="sm:text-xl">
            React.js - Belajar Lebih Dalam Tentang Component dan Jenisnya
          </a>
        </div>
      </div>
    </>
  );
};

export default Codepolitan;
