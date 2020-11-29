import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Loading from "../loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import { DESTROY_USER_REQUEST } from "../../reducers/user";

const DestroyUser = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {
    user,
    destroyUserDone,
    destroyUserLoding,
    destroyUserError,
  } = useSelector((state) => state.user);
  const { register, errors, handleSubmit } = useForm({});

  const onSubmit = () => {
    dispatch({
      type: DESTROY_USER_REQUEST,
      data: { password, userId: user.id },
    });
  };

  useMemo(() => {
    if (destroyUserDone) {
      Router.push("AlertDestroyUser");
    }
  }, [destroyUserDone]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h6>회원탈퇴를 하시면 지금까지 작성한 포스트가 모두 삭제됩니다.</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="password">
            비밀번호가 일치하면 회원탈퇴가 완료됩니다.
          </label>
          <input
            name="password"
            placeholder="패스워드 입력"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            ref={register({
              required: "패스워드를 입력하세요.",
              validate: (value) =>
                value.length > 9 || "패스워드 길이를 9자 이상 입력하세요.",
            })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <ErrorMessage
            className="invalid-feedback"
            name="password"
            as="div"
            errors={errors}
          />
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ width: "100%", marginBottom: "15px", marginTop: "15px" }}
          >
            회원탈퇴
          </button>
          {destroyUserLoding && <Loading />}
        </div>
      </form>
    </div>
  );
};

export default DestroyUser;
