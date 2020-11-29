import React, { useState } from "react";
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

const TrashAlert = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="primary" onClose={() => setShow(false)} dismissible>
        <Alert.Heading class="row-md-12">
          휴지통에서 포스트를 삭제 및 복원 하실 수 있어요.
        </Alert.Heading>
      </Alert>
    );
  }
};

export default TrashAlert;
