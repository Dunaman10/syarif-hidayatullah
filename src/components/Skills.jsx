import React from "react";

const Skills = () => {
  return (
    <>
      <div id="skills" className="text-[#EEEEEE] p-5 sm:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold">Skills</h1>
        <div className="grid grid-cols-3 text-md lg:text-xl mt-4 gap-3 sm:w-1/2 lg:w-1/3">
          <div className="space-y-2">
            <p>HTML</p>
            <p>CSS</p>
            <p>Javascript</p>
          </div>
          <div className="space-y-2">
            <p>React</p>
            <p>Laravel</p>
            <p>Tailwind CSS</p>
          </div>
          <div className="space-y-2">
            <p>Alpinejs</p>
            <p>Figma</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
