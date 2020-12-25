import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Row } from "react-bootstrap";

export const BoardHeader = styled.div`
  background-color: white;
  border-bottom: 1px solid #d3d3d3;
  padding: 5px;
  width: 100%;
`;

export const BoardBody = styled.div`
  min-height: 240px;
  background-color: white;
  cursor: pointer;
`;

export const BoardFooter = styled.div`
  background-color: white;
  text-align: center;
  padding: 5px;
`;

export const ProfileImg = styled.img`
  width: 65px;
  height: 65px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 50%;
`;

export const ProfileImgDiv = styled.div`
  width: 65px;
  height: 65px;
  weight: 50px;
  background-color: #dcdcdc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  border-radius: 50%;
  cursor: pointer;
`;

export const IconTitle = styled.p`
  font-weight: 600;
  margin: 0px;
`;
