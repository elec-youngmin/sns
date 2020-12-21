import React, { useState } from "react";
import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Loading from "../loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import { FIND_PASSWORD_REQUEST } from "../../reducers/user";

import { Button } from "react-bootstrap";

const ChangePasswordForm = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user.user);
  const {
    findPasswordLoading,
    findPasswordDone,
    findPasswordError,
  } = useSelector((state) => state.user);
  const onSubmit = () => {
    dispatch({
      type: FIND_PASSWORD_REQUEST,
      data: { email },
    });
  };
  return (
    <div>
      <p
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          fontSize: "25px",
          marginBottom: "5px",
        }}
      >
        회원가입 시 등록한 메일주소로 인증메일을 보냅니다.{" "}
      </p>
      <Button
        onClick={onSubmit}
        style={{
          fontWeight: "600",
          fontSize: "25px",
        }}
      >
        인증메일 요청
      </Button>
      {findPasswordLoading && <Loading />}
      {findPasswordDone && (
        <p
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "25px",
            marginBottom: "5px",
          }}
        >
          메일 요청이 완료되었습니다. 메일함을 확인해보세요.
        </p>
      )}
    </div>
  );
};

export default ChangePasswordForm;
