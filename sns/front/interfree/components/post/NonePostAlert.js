import React, { useState } from "react";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

// 아직 작성한 포스트가 1개도 없다면 나타나는 알림창

const NonePostAlert = () => {
  return (
    <div>
      <Alert
        variant="info"
        style={{
          textAlign: "center",
          margin: "2px",
        }}
      >
        <p
          style={{
            margin: "2px",
          }}
        >
          포스트 리스트가 없습니다.
        </p>
        <p
          style={{
            margin: "1px",
          }}
        >
          첫번째 포스트를 작성해 보세요.
        </p>
      </Alert>
    </div>
  );
};

export default NonePostAlert;
