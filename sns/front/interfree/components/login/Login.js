//사용자가 계정활동을 누르면 생성되는 로그인 모달

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import SignUp from "../layout/SignUp";

import { useDispatch, useSelector } from "react-redux";
import {
  USER_LOGIN_REQUEST,
  USER_KAKAO_LOGIN_REQUEST,
} from "../../reducers/user";

import { Button, Modal, Nav } from "react-bootstrap";

const Login = (props) => {
  const dispatch = useDispatch();
  const { logInDone, signUpDone } = useSelector((state) => state.user);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalShow, setModalShow] = useState(false);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = () => {
    dispatch({
      type: USER_LOGIN_REQUEST,
      data: { email, password },
    });
  };

  useMemo(() => {
    if (logInDone) {
      props.onHide();
    }
  }, [logInDone]);

  useMemo(() => {
    if (signUpDone) {
      setModalShow(false);
    }
  }, [signUpDone]);

  useMemo(() => {
    Router.events.on("routeChangeComplete", () => {
      props.onHide();
    });
  }, [Router]);

  return (
    <div>
      <div className="container">
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">로그인</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <SignUp show={modalShow} onHide={() => setModalShow(false)} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
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
                <label htmlFor="password">패스워드</label>
                <input
                  type="password"
                  name="password"
                  placeholder="패스워드 입력"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  ref={register({
                    required: "패스워드를 입력하세요.",
                    validate: (value) =>
                      value.length > 9 ||
                      "패스워드 길이를 9자 이상 입력하세요.",
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
                  <Link href="/findPassword">패스워드를 잊으셨나요?</Link>
                </Nav.Item>
              </div>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                로그인
              </button>
            </form>

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

            <a href="http://api.interfree.co.kr/user/auth/kakaoLogin">
              <button
                className="btn btn-warning btn-block"
                type="submit"
                style={{ width: "100%", marginBottom: "10px" }}
                onClick={() => {
                  dispatch({
                    type: USER_KAKAO_LOGIN_REQUEST,
                  });
                }}
              >
                카카오 로그인
              </button>
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={props.onHide}>닫기</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
