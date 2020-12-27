import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import HorizontalNav from "../layout/HorizontalNav";

// import TestMenu from "./TestMenu";
import BottomTabs from "../layout/BottomTabs";

import WelcomeBoard from "./WelcomeBoard";
import { useSelector } from "react-redux";

import { frontUrl } from "../../config/config";

const LayOut = () => {
  return (
    <div>
      <BottomTabs />
      <HorizontalNav />
      <WelcomeBoard />
    </div>
  );
};

export default LayOut;
