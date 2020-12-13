import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
  DISABLED_ONEUSER_ALLPOST_REQUEST,
  ACTIVATE_ONEUSER_ALLPOST_REQUEST,
} from "../../reducers/user";

import { Button } from "react-bootstrap";

const DisabledUser = () => {
  const dispatch = useDispatch();
  const { disabled } = useSelector((state) => state.user.user);
  const {
    disabledOneuserAllpostDone,
    activateOneuserAllpostDone,
  } = useSelector((state) => state.user);

  const onSubmit = () => {
    if (disabled) {
      dispatch({
        type: ACTIVATE_ONEUSER_ALLPOST_REQUEST,
      });
    } else {
      dispatch({
        type: DISABLED_ONEUSER_ALLPOST_REQUEST,
      });
    }
  };

  return (
    <div>
      <p style={{ marginTop: "20px" }}>
        {disabled
          ? "모든 글이 공개로 바뀝니다."
          : "모든 글이 비공개로 바뀝니다."}
      </p>
      <Button onClick={onSubmit}>{disabled ? "활성화" : "비활성화"}</Button>
    </div>
  );
};

export default DisabledUser;
