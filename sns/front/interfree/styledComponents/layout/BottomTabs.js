import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const TabRow = styled(Row)`
  text-align: center;
  padding: 0px;
  text-align: center;
  font-size: 39px;
  background-color: #fffafa;
  color: #666666;
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const TabCol = styled(Col)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0px;
`;
