import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const CardContainter = styled(Container)`
  border: 1px solid #f0ffff;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 2px #ccc;
  background-color: white;
  margin: 20px 0px;
  text-align: center;
`;

export const CardRow = styled(Row)`
  margin: 10px 0px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 50%;
`;

export const ProfileAvata = styled.div`
  width: 100px;
  height: 100px;
  background-color: #dcdcdc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 19px;
  border-radius: 50%;
`;

export const CountRow = styled(Row)`
  margin-bottom: 10px;
  font-size: 20px;
`;

export const CountCol = styled(Col)`
  box-sizing: content-box;
  tex-align: center;
  padding: 0px;
`;
