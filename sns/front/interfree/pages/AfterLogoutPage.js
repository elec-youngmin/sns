import React from "react";
import Link from "next/link";

import Menu from "../components/firstSeePage/Menu";

import styled from "styled-components";
import { Jumbotron, Col, Row } from "react-bootstrap";

import { frontUrl } from "../config/config";

const Styledh1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: blue;
  font-size: 50px;
  display: block;
`;

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

const AfterLogoutPage = () => {
  return (
    <div style={{ paddingTop: "75px" }}>
      <Menu />
      <Jumbotron
        className="container justify-content-center"
        style={{ borderRadius: "0px 0px 15px 15px" }}
      >
        <Row>
          <Col className=" col align-self-center row justify-content-center">
            <div></div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Styledh4>정상적으로 로그아웃되었습니다.</Styledh4>
              <br />
              <Styledh4>interfree를 이용해 주셔서 감사합니다.</Styledh4>
              <br />
              <Styledh4>
                <Link>
                  <a>로그인 화면으로 이동</a>
                </Link>
              </Styledh4>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default AfterLogoutPage;
