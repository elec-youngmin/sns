import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import Login from "./Login";

import styled from "styled-components";
import { OverlayTrigger, Tooltip, Jumbotron, Col, Row } from "react-bootstrap";
import { BsQuestion } from "react-icons/bs";

// import { Styledh1, Styledh4, Styleddiv } from "./style/welcomeBoardStyle";

const Styledh1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  font-family: "Fredoka One", cursive;
  color: blue;
  font-size: 50px;
  display: block;
`;
// @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");

const Styledh4 = styled.h4`
  font-size: 25px;
  @media (max-width: 992px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 368px) {
    font-size: 12px;
  }
`;

const Styleddiv = styled.div`
  font-size: 25px;
  @media (max-width: 992px) {
    width: 250px;
    height: 440px;
  }
  @media (max-width: 768px) {
    width: 440px;
    height: 440px;
  }
  @media (max-width: 576px) {
    width: 380px;
    height: 400px;
  }
  @media (max-width: 410px) {
    width: 300px;
    height: 440px;
  }
  @media (max-width: 410px) {
    width: 250px;
    height: 440px;
  }
`;

const NotReviseAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            이 과정으로 진행되는 회원가입 정보는 interfree 서버에 저장됩니다.
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

const welcomeBoard = () => {
  return (
    <div style={{ paddingTop: "75px" }}>
      <Jumbotron
        className="container justify-content-center"
        style={{ borderRadius: "0px 0px 15px 15px" }}
      >
        <Row>
          <Col
            md={8}
            className=" col align-self-center row justify-content-center"
          >
            <div>
              <Styledh1>interfree</Styledh1>
            </div>
            <div>
              <Styledh4>세상만사를 SNS형식으로 공유, 자유롭게 수정 </Styledh4>
            </div>
          </Col>
          <Col md={4}>
            <Login />
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default welcomeBoard;
