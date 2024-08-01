import React from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";
import heroImg from "../../../assets/heroImg.png";
const AboutMe = () => {
  return (
    <div className="container mt-20">
      <div className="text-center">
        <TitleSection>About Me</TitleSection>
      </div>
   

      <div className=" ">
        <div className="hero-content p-0 card flex-col lg:flex-row">
          <img className="card" src={heroImg} alt="" />
          <div>
            <p className="text-[#111827]">
              <span className="text-xl mb-4 font-semibold">My name is Sourav Basak </span>, <br /> i am a web developer and also a
              lerner, iam study in Honors 4th year (Management), at National
              University,
              <br />
              <br />
              Over the past two years, I have been working efficiently in the
              web development sector, culminating in the successful completion
              of web development course at Programming Hero. I earned a web
              developer certificate and have undertaken numerous Front-End
              projects, utilizing technologies such as React, React Router,
              Firebase Auth, Tailwind CSS, Express, MongoDB, Rest API, and JWT
              in the process. My expertise lies in JavaScript, React, Next.js,
              Redux toolkit, HTML, CSS, Tailwind CSS, Daisy UI, Bootstrap, React
              Bootstrap, GitHub, Firebase, and MongoDB. passport js, My sql,
              Wordpress , Currently, I am working as a Full Stack Software
              Developer at sabhyasha.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
