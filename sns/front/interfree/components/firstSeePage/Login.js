import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import SignUp from "../signUp/SignUp";

import { useDispatch, useSelector } from "react-redux";
import { USER_LOGIN_REQUEST } from "../../reducers/user";
import Loading from "../loading/Loading";
import { OverlayTrigger, Tooltip, Nav } from "react-bootstrap";
import { BsQuestion } from "react-icons/bs";

import { frontUrl } from "../../config/config";

const NotReviseAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            interfree에 처음으로 사용하는 경우 카카오 로그인 전 가입절차가
            진행됩니다.
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <BsQuestion />
        </span>
      </OverlayTrigger>
    </>
  );
};

const Login = () => {
  const { register, errors, handleSubmit } = useForm();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalShow, setModalShow] = useState(false);

  const [show, setShow] = useState(true);
  const { logInDone, logInLoading, logInError, signUpDone } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const onSubmit = () => {
    dispatch({
      type: USER_LOGIN_REQUEST,
      data: { email, password },
    });
  };

  useMemo(() => {
    if (logInDone) {
      Router.push(`${frontUrl}/PersonalPostBoard`);
    }
  }, [logInDone]);

  useMemo(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  useMemo(() => {
    if (signUpDone) {
      setModalShow(false);
    }
  }, [signUpDone]);

  return (
    <div>
      <div className="container">
        <SignUp show={modalShow} onHide={() => setModalShow(false)} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              placeholder="이메일 입력"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              ref={register({
                required: "이메일 주소를 입력하세요.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "올바른 이메일 형식이 아니에요.",
                },
              })}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ErrorMessage
              className="invalid-feedback"
              name="email"
              as="div"
              errors={errors}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
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
            <Nav.Item style={{ marginTop: "15px" }}>
              <Link href="/FindPassword">패스워드를 잊으셨나요?</Link>
            </Nav.Item>
          </div>
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            로그인
            {logInLoading && <Loading />}
          </button>
          <button
            className="btn btn-warning btn-block"
            type="submit"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            카카오 로그인
            {logInLoading && <Loading />}
          </button>
          {/* <NotReviseAlert /> */}
          {/* 모바일에서 디자인적인 문제발생으로 주석처리 */}
          <button
            className="btn btn-primary btn-block"
            type="submit"
            style={{ width: "100%", marginBottom: "10px" }}
            onClick={() => {
              setModalShow(true);
            }}
          >
            회원가입
          </button>
          {/* <NotReviseAlert /> */}
          {/* 모바일에서 디자인적인 문제발생으로 주석처리 */}
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  props: PropTypes.object,
};

export default Login;
