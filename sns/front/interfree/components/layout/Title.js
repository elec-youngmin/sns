//각 페이지의 페이지 이름을 생성함

import React from "react";

import { TitleDiv, TitleP } from "../../styledComponents/layout/Title";

const Title = ({ title }) => {
  return (
    <TitleDiv>
      <TitleP>{title}</TitleP>
    </TitleDiv>
  );
};

export default Title;
