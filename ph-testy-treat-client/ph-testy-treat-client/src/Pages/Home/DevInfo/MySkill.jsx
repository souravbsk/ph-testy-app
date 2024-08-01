import React, { useEffect, useState } from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";
import Skill from "../../../components/Skill/Skill";

const MySkill = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("/skill.json")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);
  return (
    <div className="mt-20 container">
      <TitleSection className="text-center mb-20">My Skills</TitleSection>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 mt-7 md:mt-14">
        {skills.map((skill) => (
          <Skill key={skill.id} skill={skill}></Skill>
        ))}
      </div>
    </div>
  );
};

export default MySkill;
