import React, { useState } from "react";
import PropTypes from "prop-types";

import HorizontalNav from "../layout/HorizontalNav";

// import TestMenu from "./TestMenu";
import BottomTabs from "../layout/BottomTabs";

import WelcomeBoard from "./WelcomeBoard";
import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

const LayOut = () => {
  const { postLoadLoading } = useSelector((state) => state.post);

  return (
    <div>
      <BottomTabs />
      <HorizontalNav />
      <WelcomeBoard />
      {postLoadLoading && (
        <>
          <Spinner
            animation="border"
            style={{
              position: "fixed",
              bottom: "70px",
              right: "70px",
              zIndex: "100",
            }}
          />
        </>
      )}
    </div>
  );
};

export default LayOut;
