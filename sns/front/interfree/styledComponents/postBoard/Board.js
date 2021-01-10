import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
import { AiFillMessage, AiTwotoneAlert } from "react-icons/ai";
import { BsBrightnessHigh, BsFillBookmarksFill } from "react-icons/bs";

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

export const ImgContainter = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ZoomImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const TextPostContent = styled.p`
  margin: 18px 5px 5px 10px;
  word-break: break-all;
`;

export const IconRow = styled(Row)`
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`;

export const IconCol = styled(Col)`
  text-align: center;
  padding: 0px;
`;

export const IconAiFillMessage = styled(AiFillMessage)`
  font-size: 20px;
  color: #21b8a5;
  cursor: pointer;
`;

export const IconBsFillBookmarksFill = styled(BsFillBookmarksFill)`
  font-size: 20px;
  color: #21b8a5;
  cursor: pointer;
`;

export const IconActBsFillBookmarksFill = styled(BsFillBookmarksFill)`
  font-size: 20px;
  color: blue;
  cursor: pointer;
`;

export const IconAiTwotoneAlert = styled(AiTwotoneAlert)`
  font-size: 20px;
  color: #21b8a5;
  cursor: pointer;
`;

export const IconBsBrightnessHigh = styled(BsBrightnessHigh)`
  font-size: 20px;
  color: #21b8a5;
  margin-right: 12px;
`;
