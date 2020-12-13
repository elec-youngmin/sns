import React from "react";
import * as Scroll from "react-scroll";

import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

import { Button } from "react-bootstrap";

const ScrollButton = () => {
  const scroll = Scroll.animateScroll;

  return (
    <>
      <Button
        variant="info"
        onClick={() => {
          scroll.scrollToTop();
        }}
        style={{
          position: "fixed",
          bottom: "0px",
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
          bottom: "0px",
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
