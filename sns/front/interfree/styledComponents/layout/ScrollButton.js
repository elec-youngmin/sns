import styled from "styled-components";
import { Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const TopScrollButton = styled(Button)`
  position: fixed;
  bottom: 0px;
  right: 10px;
  z-index: 1000;
  @media (max-width: 985px) {
    position: fixed;
    bottom: 55px;
    right: 10px;
    z-index: 1000;
  }
`;

export const BottomScrollButton = styled(Button)`
  position: fixed;
  bottom: 0px;
  right: 60px;
  z-index: 1000;
  @media (max-width: 985px) {
    position: fixed;
    bottom: 55px;
    right: 60px;
    z-index: 1000;
  }
`;
