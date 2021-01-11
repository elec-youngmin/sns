import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

export const BoxContainter = styled.div`
  width: 210px;
  height: 210px;
  margin: 5px;
  cursor: pointer;

  @media (max-width: 1210px) {
    width: 180px;
    height: 180px;
  }
  @media (max-width: 1010px) {
    margin: 3px;
    width: 150px;
    height: 150px;
  }
  @media (max-width: 995px) {
    width: 120px;
    height: 120px;
  }
  @media (max-width: 500px) {
    margin: 2px;
    width: 110px;
    height: 110px;
  }
  @media (max-width: 413px) {
    margin: 2px;
    width: 80px;
    height: 80px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
