import React, { useMemo } from "react";
import * as Scroll from "react-scroll";

import {
  TopScrollButton,
  BottomScrollButton,
} from "../../styledComponents/layout/ScrollButton";

import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

const ScrollButton = () => {
  const scroll = Scroll.animateScroll;

  return (
    <>
      <TopScrollButton
        variant="info"
        onClick={() => {
          scroll.scrollToTop();
        }}
      >
        <AiOutlineUp />
      </TopScrollButton>
      <BottomScrollButton
        variant="info"
        onClick={() => {
          scroll.scrollToBottom();
        }}
      >
        <AiOutlineDown />
      </BottomScrollButton>
    </>
  );
};

export default ScrollButton;
