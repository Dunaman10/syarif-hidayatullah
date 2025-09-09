import React from "react";
import Portfolio_img_1 from "../assets/portfolio/cekcrypto.jpg";
import Portfolio_img_2 from "../assets/portfolio/myflix.jpg";
import Portfolio_img_3 from "../assets/portfolio/kopi-anak-senja.jpg";
import Portfolio_img_4 from "../assets/portfolio/at-tasawuq.jpg";
import Portfolio_img_5 from "../assets/portfolio/cute-topup.jpg";
import Portfolio_img_6 from "../assets/portfolio/housespace.jpg";

import Portfolio_file_1 from "../assets/portfolio/at-tasawuq.pdf";
import Portfolio_file_2 from "../assets/portfolio/cute-topup.pdf";
import Portfolio_file_3 from "../assets/portfolio/housespace.pdf";

const Portfolio = () => {
  return (
    <>
      <div id="portfolio" className="text-[#EEEEEE] p-5 sm:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold">
          Portfolio
        </h1>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <a href="https://cekcrypto.vercel.app/" target="_blank">
              <img src={Portfolio_img_1} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                Cekcrypto
              </p>
            </a>
          </div>
          <div>
            <a href="https://myflix-tan.vercel.app/" target="_blank">
              <img src={Portfolio_img_2} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                Myflix - Clone Netflix
              </p>
            </a>
          </div>
          <div>
            <a href="https://kedai-kopi-anak-senja.vercel.app/" target="_blank">
              <img src={Portfolio_img_3} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                KopiAnakSenja
              </p>
            </a>
          </div>
          <div>
            <a href={Portfolio_file_1} target="_blank">
              <img src={Portfolio_img_4} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                At-Tasawuq
              </p>
            </a>
          </div>
          <div>
            <a href={Portfolio_file_2} target="_blank">
              <img src={Portfolio_img_5} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                Cute TopUp
              </p>
            </a>
          </div>
          <div>
            <a href={Portfolio_file_3} target="_blank">
              <img src={Portfolio_img_6} alt="" className="rounded-md" />
              <p className="mt-2 hover:opacity-50 transition duration-300">
                HouseSpace
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
