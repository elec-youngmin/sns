//휴지통에 들어있는 포스트를 보여줄 포스트 보드

import React from "react";
import Moment from "react-moment";

import {
  DELETE_TRASHPOST_REQUEST,
  RESTORE_TRASHPOST_REQUEST,
} from "../../reducers/post";
import { useSelector, useDispatch } from "react-redux";

import { Card, Dropdown, DropdownButton } from "react-bootstrap";

import {
  AiFillDropboxSquare,
  AiFillCloseCircle,
  AiFillBackward,
} from "react-icons/ai";

const TrashPostForm = ({
  postContents,
  postId,
  PostImgSrcs,
  PostVideoSrcs,
  date,
}) => {
  const dispatch = useDispatch();
  const { nickname } = useSelector((state) => state.user.user);

  const dateSet = <Moment format="YYYY/MM/DD">{date}</Moment>;

  return (
    <div>
      <Card style={{ marginBottom: "15px" }}>
        <Card.Header
          style={{
            backgroundColor: "white",
            padding: "5px",
            lineHeight: "40px",
          }}
        >
          {nickname}

          <DropdownButton
            variant="light"
            className="float-right"
            title={<AiFillDropboxSquare />}
            drop="left"
            menuAlign="right"
          >
            <Dropdown.Item
              onClick={() => {
                dispatch({
                  type: RESTORE_TRASHPOST_REQUEST,
                  data: { postId },
                });
              }}
            >
              <AiFillBackward /> 복원
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch({
                  type: DELETE_TRASHPOST_REQUEST,
                  data: { postId },
                });
              }}
            >
              <AiFillCloseCircle /> 삭제
            </Dropdown.Item>
          </DropdownButton>
        </Card.Header>

        <Card.Body>
          <Card.Text>
            {PostImgSrcs && (
              <div
                style={{
                  paddingTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={PostImgSrcs}
                  alt={PostImgSrcs}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            )}
            {PostVideoSrcs && (
              <video
                controls
                alt={PostVideoSrcs}
                src={PostVideoSrcs}
                style={{
                  maxWidth: "100%",
                  maxHeight: "auto",
                  marginBottom: "20px",
                }}
              />
            )}
            <h2>{postContents}</h2>
          </Card.Text>
        </Card.Body>

        <Card.Footer
          style={{
            backgroundColor: "white",
            textAlign: "center",
            padding: "5px",
          }}
        >
          {dateSet}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TrashPostForm;
