//댓글 수정 창

import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { UPDATE_COMMENT_REQUEST } from "../../reducers/post";

import { Modal, Button } from "react-bootstrap";

const ReviseCommentForm = (props) => {
  const dispatch = useDispatch();
  const { updatePostLoading } = useSelector((state) => state.post);
  const { comments } = props;
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
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <textarea
            placeholder="여기서 댓글 수정.."
            rows={3}
            autoFocus
            style={{
              width: "100%",
              border: "none",
            }}
            onChange={(e) => {
              SetComment(e.target.value);
            }}
          >
            {comments}
          </textarea>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>닫기</Button>

          <Button
            onClick={() => {
              dispatch({
                type: UPDATE_COMMENT_REQUEST,
                data: { commentId: props.id, comment, postId: props.postId },
              });
            }}
          >
            반영
            {updatePostLoading && <Loading />}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReviseCommentForm;
