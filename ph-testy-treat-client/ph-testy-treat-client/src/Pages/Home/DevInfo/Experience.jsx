import React from "react";
import TitleSection from "../../../components/TitleSection/TitleSection";
import { FaDatabase, FaReact, FaWordpress } from "react-icons/fa";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const Experience = () => {
  return (
    <div className=" mt-20">
      <TitleSection className="text-center mb-20">Experience</TitleSection>
      <VerticalTimeline className="py-0">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "#111827" }}
          contentArrowStyle={{ borderRight: "7px solid  #F97316" }}
          date="2022 - present"
          iconStyle={{ background: "#f97316", color: "#fff" }}
          icon={<FaWordpress className="text-5xl animate-bounce"></FaWordpress>}
        >
          <h3 className="text-2xl font-semibold ">Junior Web Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">Brand & Visual</h4>
          <p>
            Wordpress Developer, Woocomerece, CPanel Management, User
            Experience, Bug Fixing
          </p>
        </VerticalTimelineElement>

        {/* _________________________________ */}

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "#111827" }}
          contentArrowStyle={{ borderRight: "7px solid  #F97316" }}
          date="Jun 2023 - Aug 2023"
          iconStyle={{ background: "#f97316", color: "#fff" }}
          icon={<FaReact className="text-5xl animate-spin"></FaReact>}
        >
          <h3 className="text-2xl font-semibold ">
            MERN Stack Developer (intern)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Stackkaroo.com</h4>
          <p>
            React, next js, redux-toolkit, api instigation , Bug Fixing, convert
            figma to react, decision making
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "#111827" }}
          contentArrowStyle={{ borderRight: "7px solid  #F97316" }}
          date="Aug 2023 - Jan 2024"
          iconStyle={{ background: "#f97316", color: "#fff" }}
          icon={<FaDatabase className="text-5xl animate-pulse"></FaDatabase>}
        >
          <h3 className="text-2xl font-semibold ">Software Developer</h3>
          <h4 className="vertical-timeline-element-subtitle">Apna Byte</h4>
          <p>
            React, redux-toolkit, SQL, Node, Express api instigation , Bug
            Fixing, decision making, Team Lead, Trainer,
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "#111827" }}
          contentArrowStyle={{ borderRight: "7px solid  #F97316" }}
          date="Jan 2024 - Present"
          iconStyle={{ background: "#f97316", color: "#fff" }}
          icon={<FaDatabase className="text-5xl animate-pulse"></FaDatabase>}
        >
          <h3 className="text-2xl font-semibold ">
            Full Stack Software Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Sabhyasha Retail Tech
          </h4>
          <p>
            React, redux-toolkit, SQL, Node, Express api instigation , Bug
            Fixing, decision making, Team Lead, Trainer,
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          iconStyle={{ background: "#f97316", color: "#fff" }}
          icon={<FaReact className="text-5xl animate-spin"></FaReact>}
        />
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
