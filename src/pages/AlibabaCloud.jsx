import React from "react";
import { Link } from "react-router-dom";

import Certi_1 from "../assets/certificate/alibaba-cloud/Alibaba-Cloud-Fundamental-Training-IDN.jpg";
import Certi_2 from "../assets/certificate/alibaba-cloud/Build-your-own-personal-AI-chatbot-for-your-websites-in-60-mins.jpg";
import Certi_3 from "../assets/certificate/alibaba-cloud/Dive-Into-Generative-AI.jpg";
import Certi_4 from "../assets/certificate/alibaba-cloud/Getting-to-Know-Basic-Services-of-Alibaba-Cloud.jpg";
import Certi_5 from "../assets/certificate/alibaba-cloud/Getting-to-Know-Generative-AI-and-its-Concepts.jpg";

const AlibabaCloud = () => {
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
          Alibaba Cloud
        </h1>

        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>1</p>
          <a href={Certi_1} target="_blank" className="sm:text-xl">
            Alibaba Cloud Fundamental Training IDN
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>2</p>
          <a href={Certi_2} target="_blank" className="sm:text-xl">
            Build your own personal AI chatbot for your websites in 60 mins
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>3</p>
          <a href={Certi_3} target="_blank" className="sm:text-xl">
            Sertifikat Dicoding Memulai Pemrograman untuk Menjadi Pengembang
            Software
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>4</p>
          <a href={Certi_4} target="_blank" className="sm:text-xl">
            Getting to Know Basic Services of Alibaba Cloud
          </a>
        </div>
        <div className="flex gap-8 mt-6 text-lg sm:text-xl border-b space-y-3">
          <p>5</p>
          <a href={Certi_5} target="_blank" className="sm:text-xl">
            Getting to Know Generative AI and its Concepts
          </a>
        </div>
      </div>
    </>
  );
};

export default AlibabaCloud;
