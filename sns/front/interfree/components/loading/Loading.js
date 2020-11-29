import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div>
      <Spinner animation="border" size="sm" />
    </div>
  );
};

export default Loading;
