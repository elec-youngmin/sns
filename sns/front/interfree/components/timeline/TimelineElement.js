//사용자가 작성한 타임라인을 보여주는 타임라인 엘러먼트

import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
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
  key,
  title,
  content,
  date,
  TimelineSubId, //타임라인 주제의 id
  TimelineSub, //타임라인 주제 이름
}) => {
  const ramdomNum = Math.floor(Math.random() * 15);

  return (
    <>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{
          background: colors[ramdomNum],
          color: "#fff",
        }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
        date={date}
        iconStyle={{ background: colors[ramdomNum], color: "#fff" }}
        icon={icons[ramdomNum]}
      >
        <h3 className="vertical-timeline-element-title">{title}</h3>
        <h4 className="vertical-timeline-element-subtitle">{content}</h4>
      </VerticalTimelineElement>
    </>
  );
};

export default TimelineElement;
