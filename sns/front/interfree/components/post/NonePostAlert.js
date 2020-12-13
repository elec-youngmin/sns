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
          작성된 포스트가 없습니다.
        </p>
        <p
          style={{
            margin: "1px",
          }}
        >
          하단 아래의 플러스 버튼을 눌러 음성 또는 게시판으로 포스트를
          작성해보세요.
        </p>
      </Alert>
    </div>
  );
};

export default NonePostAlert;
