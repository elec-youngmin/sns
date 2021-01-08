//로그인이 필요하면 생성되는 알림창

import React, { useState } from "react";

import Login from "./Login";

import {
  SessionRow,
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
} from "../../styledComponents/layout/Session";

import { Col } from "react-bootstrap";

const NeedLoginAlert = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);

  return (
    <>
      <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />

      <SessionRow>
        <Col md={5}>
          <SessionDiv>
            <SessionTitle>로그인 필요</SessionTitle>
            <SessionP>이 페이지의 내용을 보려면 로그인이 필요합니다. </SessionP>
            <SessionButton
              onClick={() => {
                setLoginModalShow(true);
              }}
            >
              로그인 및 회원가입
            </SessionButton>
          </SessionDiv>
        </Col>
      </SessionRow>
    </>
  );
};

export default NeedLoginAlert;
