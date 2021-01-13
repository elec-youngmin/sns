// 각 탭마다 리스트가 1개도 없다면 나타나는 알림창
// 예를 들어 친구가 없다면 이 탭이 나타남.

import React from "react";

import {
  ContainerAlert,
  TitleP,
  ContentP,
} from "../../styledComponents/layout/AlertTab";

const AlertTab = ({ title, content }) => {
  return (
    <div>
      <ContainerAlert variant="info">
        <TitleP>{title}</TitleP>
        <ContentP>{content}</ContentP>
      </ContainerAlert>
    </div>
  );
};

export default AlertTab;
