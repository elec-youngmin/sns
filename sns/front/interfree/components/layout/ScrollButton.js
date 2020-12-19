import React from "react";
import * as Scroll from "react-scroll";
import { useMediaQuery } from "react-responsive";

import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import { Button } from "react-bootstrap";

const ScrollButton = () => {
  const scroll = Scroll.animateScroll;
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 985px)",
  });
  return (
    <>
      <Button
        variant="info"
        onClick={() => {
          scroll.scrollToTop();
        }}
        style={{
          position: "fixed",
          bottom: isTabletOrMobileDevice ? "55px" : "0px",
          right: "10px",
          zIndex: "100",
        }}
      >
        <AiOutlineUp />
      </Button>
      <Button
        variant="info"
        onClick={() => {
          scroll.scrollToBottom();
        }}
        style={{
          position: "fixed",
          bottom: isTabletOrMobileDevice ? "55px" : "0px",
          right: "60px",
          zIndex: "100",
        }}
      >
        <AiOutlineDown />
      </Button>
    </>
  );
};

export default ScrollButton;
