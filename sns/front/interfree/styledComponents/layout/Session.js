import styled from "styled-components";
import { Button, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const SessionDiv = styled.div`
  border: 1px solid #f0ffff;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 2px #ccc;
  background-color: white;
  margin: 20px 0px;
  text-align: center;
`;

export const SessionP = styled.p`
  font-weight: 500;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 430px) {
    font-size: 14px;
  }
  @media (max-width: 290px) {
    font-size: 12px;
  }
`;

export const SessionTitle = styled.p`
  font-weight: 600;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 430px) {
    font-size: 22px;
  }
  @media (max-width: 290px) {
    font-size: 20px;
  }
`;

export const SessionInput = styled.input`
  border: none;
  border-bottom: 3px solid black;
  border-radius: 5px;
  width: 80%;
  height: 50px;
  margin: 20px 0px;
`;

export const SessionButton = styled(Button)`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 15px;
`;

export const SessionRow = styled(Row)`
  padding-top: 65px;
  padding-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
`;
