import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Row } from "react-bootstrap";

export const BoardContainer = styled.div`
  border-radius: 12px;
  margin-bottom: 15px;
  background-color: white;
  overflow-x: hidden;
`;

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

export const NicknameSpan = styled.span`
  font-weight: 600;
  font-size: 17px;
`;

export const ProfileNickname = styled.p`
  font-size: 25px;
  font-weight: 600;
  margin: 0px;
`;

export const AddMenu = styled.p`
  float: right;
  height: 100%;
  cursor: pointer;
`;
export const OnlyReadMy = styled.p`
  color: #2e86c1;
  margin-left: 10px;
  margin-bottom: 4px;
  text-align: center;
`;

export const ZoomImg = styled.img`
  margin: 10px;
  max-width: 38vw;
  max-height: auto;
`;

export const Video = styled.video`
  width: 33vw;
  height: 38vh;
  margin: 10px;
`;

export const LikeButton = styled.button`
  padding: 2px;
  margin-left: 12px;
  border: none;
  border-color: none;
  background-color: white;
`;
