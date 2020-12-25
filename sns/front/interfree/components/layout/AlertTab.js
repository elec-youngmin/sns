import React, { useState } from "react";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

// 각 탭마다 리스트가 1개도 없다면 나타나는 알림창

const AlertTab = ({ title, content }) => {
  return (
    <div>
      <Alert
        variant="info"
        style={{
          textAlign: "center",
          margin: "2px",
          borderRadius: "15px",
        }}
      >
        <p
          style={{
            fontSize: "30px",
            fontWeight: "600",
            margin: "2px",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "500",
            margin: "1px",
          }}
        >
          {content}
        </p>
      </Alert>
    </div>
  );
};

export default AlertTab;
