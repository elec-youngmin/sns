import styled from "styled-components";
import { Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const ContainerAlert = styled(Alert)`
  text-align: center;
  margin: 2px;
  border-radius: 15px;
`;

export const TitleP = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin: 2px;

  @media (max-width: 768px) {
    font-size: 25px;
  }
  @media (max-width: 430px) {
    font-size: 20px;
  }
  @media (max-width: 290px) {
    font-size: 15px;
  }
`;

export const ContentP = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 1px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 430px) {
    font-size: 13px;
    font-weight: 500;
  }
  @media (max-width: 290px) {
    font-size: 12px;
    font-weight: 500;
  }
`;
