import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useDispatch, useSelector } from "react-redux";
import { RESETTING_PASSWORD_REQUEST } from "../../reducers/user";

const RePasswordSettingForm = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();

  const [password, setPassword] = useState();

  const onSubmit = () => {
    dispatch({
      type: RESETTING_PASSWORD_REQUEST,
      data: { password },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="form-group"
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px auto",
          }}
        >
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
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
          <br />
          <ErrorMessage
            className="invalid-feedback"
            name="password"
            as="div"
            errors={errors}
          />
          <input
            type="password"
            name="rePassword"
            placeholder="패스워드 확인"
            className={`form-control ${errors.rePassword ? "is-invalid" : ""}`}
            ref={register({
              required: "패스워드를 다시 입력하세요.",
              validate: (value) =>
                value === watch("password") || "패스워드가 일치하지 않아요.",
            })}
          />

          <ErrorMessage
            className="invalid-feedback"
            name="rePassword"
            as="div"
            errors={errors}
          />
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            패스워드 반영
          </button>
        </div>
      </form>
    </div>
  );
};

export default RePasswordSettingForm;
