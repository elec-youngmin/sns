import styled from "styled-components";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export const Div = styled.div`
  border: 1px solid #f0ffff;
  border-radius: 20px;
  box-shadow: 1px 1px 2px 2px #ccc;
  background-color: white;
  margin: 20px 0px;
  text-align: center;
`;

export const SubjectP = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 25px;
  width: 100%;
`;

export const AddButton = styled(Button)`
  margin-bottom: 20px;
  margin-right: 20px;
  font-weight: 600;
  font-size: 15px;
`;
