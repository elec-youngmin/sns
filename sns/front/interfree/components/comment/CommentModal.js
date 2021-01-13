//포스트에서 댓글을 클릭하면 나타나는 댓글 창

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentBoard from "./CommentBoard";
import Loading from "../loading/Loading";

import { ADD_COMMENT_REQUEST } from "../../reducers/post";

import { Modal, Button, Form } from "react-bootstrap";

//props.postId,props.onHide
const CommentModal = (props) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);
  const { comments, loadCommentLoading } = useSelector((state) => state.post);
  const postOneId = props.postId;
  const [comment, SetComment] = useState();

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">댓글</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loadCommentLoading ? (
            <Loading />
          ) : (
            comments.length == 0 && <p>작성된 댓글이 없습니다.</p>
          )}

          <div style={{ maxheight: "50px", overflow: "auto" }}>
            {comments.map((element, index) => (
              <CommentBoard
                key={index}
                id={element.id}
                comments={element.comment}
                nickname={element.Post.User.nickname}
                date={element.createdAt}
                writeUserId={element.writeUserId}
                postId={props.postId}
              />
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer class="col-lg-12">
          <Form.Group>
            <Form.Label style={{ width: "100%" }}></Form.Label>
            <Form.Control
              class="col-lg-12"
              as="textarea"
              rows={2}
              placeholder="댓글 추가..."
              style={{
                resize: "none",
                marginTop: "1px",
                marginBottom: "12px",
              }}
              onChange={(e) => {
                SetComment(e.target.value);
              }}
            />
          </Form.Group>

          <Button onClick={props.onHide}>닫기</Button>

          <Button
            className="float-right"
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              dispatch({
                type: ADD_COMMENT_REQUEST,
                data: { comment, postOneId, id },
              });
            }}
            style={{
              marginTop: "1px",
              marginBottom: "12px",
            }}
          >
            추가
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentModal;
