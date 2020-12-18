import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  BsFillCalendarFill,
  BsFillArchiveFill,
  BsFillBucketFill,
  BsFillAwardFill,
  BsFillClockFill,
  BsFillCloudFill,
  BsFillDisplayFill,
  BsFillDropletFill,
  BsFillLightningFill,
  BsFillPentagonFill,
  BsFillPieChartFill,
  BsFillShieldFill,
  BsFillSquareFill,
  BsArchiveFill,
  BsBrightnessHighFill,
  BsChatFill,
} from "react-icons/bs";
const icons = [
  <BsFillCalendarFill />,
  <BsFillArchiveFill />,
  <BsFillBucketFill />,
  <BsFillAwardFill />,
  <BsFillClockFill />,
  <BsFillCloudFill />,
  <BsFillDisplayFill />,
  <BsFillDropletFill />,
  <BsFillLightningFill />,
  <BsFillPentagonFill />,
  <BsFillPieChartFill />,
  <BsFillShieldFill />,
  <BsFillSquareFill />,
  <BsArchiveFill />,
  <BsBrightnessHighFill />,
  <BsChatFill />,
];
const colors = [
  "#8A2BE2",
  "#6495ED",
  "#008B8B",
  "#BDB76B",
  "#FF8C00",
  "#E9967A",
  "#8FBC8F",
  "#FF1493",
  "#00CED1",
  "#1E90FF",
  "#B22222",
  "#FFD700",
  "#ADFF2F",
  "#CD5C5C",
  "#4B0082",
  "#FF6347",
];
const TimelineElement = ({
  content,
  date,
  icon,
  TimelineSubId,
  TimelineSub,
}) => {
  const ramdomNum = Math.floor(Math.random() * 15);
  console.log(ramdomNum);
  return (
    <>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: colors[ramdomNum], color: "#fff" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date={date}
        iconStyle={{ background: colors[ramdomNum], color: "#fff" }}
        icon={icons[ramdomNum]}
        onClick={() => {
          console.log("dsaffffff");
        }}
      >
        <h3 className="vertical-timeline-element-title">{content}</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project
          Management, Team Leading
        </p>
      </VerticalTimelineElement>
    </>
  );
};

export default TimelineElement;
