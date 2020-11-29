import React, { useState } from "react";
import PropTypes from "prop-types";

import Menu from "./Menu";
import WelcomeBoard from "./WelcomeBoard";

import { useSelector } from "react-redux";

import { Spinner } from "react-bootstrap";

const LayOut = () => {
  const { postLoadLoading } = useSelector((state) => state.post);

  return (
    <div>
      <Menu />
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
