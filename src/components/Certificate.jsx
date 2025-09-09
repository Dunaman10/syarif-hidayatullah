import React from "react";
import { Link } from "react-router-dom";

const Certificate = () => {
  return (
    <>
      <div id="certificate" className="text-[#EEEEEE] p-5 sm:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold">
          Certificate
        </h1>
        <Link to="/certificate/codepolitan">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>1</p>
            <p>Codepolitan</p>
          </div>
        </Link>
        <Link to="/certificate/dicoding">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>2</p>
            <p>Dicoding</p>
          </div>
        </Link>
        <Link to="/certificate/bnsp">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>3</p>
            <p>BNSP</p>
          </div>
        </Link>
        <Link to="/certificate/alibaba-cloud">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>4</p>
            <p>Alibaba Cloud</p>
          </div>
        </Link>
        <Link to="/certificate/gdsc">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>5</p>
            <p>Google Developer Student Club</p>
          </div>
        </Link>
        <Link to="/certificate/prakerja">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>6</p>
            <p>Prakerja</p>
          </div>
        </Link>
        <Link to="/certificate/unpam">
          <div className="flex gap-8 mt-4 text-lg sm:text-xl border-b space-y-3">
            <p>7</p>
            <p>Universitas Pamulang</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Certificate;
