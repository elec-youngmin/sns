import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      <Spinner animation="border" size="sm" />
    </>
  );
};

export default Loading;
