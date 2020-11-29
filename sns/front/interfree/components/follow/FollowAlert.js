import React from "react";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

const FollowAlert = () => {
  return (
    <div>
      <Alert variant="light">
        <Alert.Heading>
          이 탭에서 팔로우한 유저의 프로파일이 나타나요.
        </Alert.Heading>
        <p> 아직 팔로우한 사람이 없어요.</p>
      </Alert>
    </div>
  );
};

export default FollowAlert;
