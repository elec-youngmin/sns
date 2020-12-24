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
