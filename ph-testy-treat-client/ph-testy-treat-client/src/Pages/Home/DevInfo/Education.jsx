import React from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";

const Education = () => {
  return (
    <div className="container mt-20">
      <div className="text-center">
        <TitleSection>Educational Background</TitleSection>
      </div>
      <>
        <div className="overflow-x-auto mt-12 ">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Class</th>
                <th>Year</th>
                <th>School/Collage/University</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <th>BBA Honours</th>
                <th>2019-Present</th>
                <th>National University</th>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default Education;
