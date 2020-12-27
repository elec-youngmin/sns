import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  ContainerAlert,
  TitleP,
  ContentP,
} from "../../styledComponents/layout/AlertTab";

// 각 탭마다 리스트가 1개도 없다면 나타나는 알림창

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
