import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";

export const BoxContainter = styled.div`
  width: 280px;
  height: 280px;
  margin: 3px;
  padding: 0px;
  cursor: pointer;

  @media (max-width: 1293px) {
    width: 240px;
    height: 240px;
  }

  @media (max-width: 1110px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 1021px) {
    width: 180px;
    height: 180px;
  }
  @media (max-width: 995px) {
    width: 170px;
    height: 170px;
  }
  @media (max-width: 792px) {
    width: 160px;
    height: 160px;
  }
  @media (max-width: 772px) {
    width: 240px;
    height: 240px;
  }
  @media (max-width: 752px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 625px) {
    width: 160px;
    height: 160px;
  }
  @media (max-width: 500px) {
    margin: 1px;
    width: 150px;
    height: 150px;
  }
  @media (max-width: 462px) {
    margin: 1px;
    width: 130px;
    height: 130px;
  }
  @media (max-width: 413px) {
    margin: 0.5px;
    width: 100px;
    height: 100px;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
