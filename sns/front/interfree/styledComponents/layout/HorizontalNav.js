import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

export const Logo = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #4169e1;
  font-size: 40px;
  text-align: center;
  cursor: "pointer";
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 430px) {
    font-size: 30px;
    .cols {
      width: 100%;
      text-align: center;
      margin-right: 100px;
      font-size: 300px;
    }
  }
  @media (max-width: 290px) {
    font-size: 25px;
  }
`;

export const LogoContainer = styled.div`
  background: #f3f5f7;
  border-bottom: 1px solid #d9d9d9;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileContainer = styled.div`
  text-align: center;
  font-size: 23px;
  color: #6495ed;
  background: #f3f5f7;
  border-bottom: 1px solid #d9d9d9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 90px;
`;

export const MobileLink = styled.a`
  color: black;
`;
