import React from "react";
import Experience from "./Experience";
import MySkill from "./MySkill";
import AboutMe from "./AboutMe";
import Education from "./Education";

const DevInfo = () => {
  return (
    <div>
      <AboutMe></AboutMe>
      <MySkill></MySkill>
      <Experience></Experience>
      <Education></Education>
    </div>
  );
};

export default DevInfo;
