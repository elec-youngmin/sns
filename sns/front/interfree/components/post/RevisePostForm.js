//포스트를 수정할 수 있는 수정 포스트 모달

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { UPDATE_POST_REQUEST } from "../../reducers/post";

import { Modal, Button, Form } from "react-bootstrap";

//props에 posts, postId 포함
const RevisePostForm = (props) => {
  const dispatch = useDispatch();
  const { postId, posts } = props;
  const [post, setPost] = useState(posts);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          포스트 내용 수정
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              as="textarea"
              style={{ resize: "none" }}
              rows={5}
              multiple
              onChange={(e) => {
                setPost(e.target.value);
              }}
            >
              {posts}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>닫기</Button>

        <Button
          onClick={() => {
            dispatch({
              type: UPDATE_POST_REQUEST,
              data: { post, postId },
            });
          }}
        >
          반영
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RevisePostForm;
