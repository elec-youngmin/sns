import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

export const Logo = styled.a`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #4169e1;
  font-size: 40px;
  float: left;
  // margin-left: 15px;
  text-decoration: none;
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

export const DesktopNavContainer = styled.div`
  text-align: center;
  font-size: 30px;
  color: #6495ed;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  border-bottom: 1px solid #d9d9d9;
  height: 55px;
  background: #f3f5f7;
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
  height: 55px;
`;

export const LogoContainer = styled.div`
  background: #f3f5f7;
  border-bottom: 1px solid #d9d9d9;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileLink = styled.a`
  color: black;
`;
