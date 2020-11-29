import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { COUNT_REPORT_REQUEST } from "../../reducers/post";

import { Modal, Button, Form } from "react-bootstrap";

const PostReport = (props) => {
  const { postId } = props;
  const [report, setReport] = useState();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setReport(e.target.value);
  };

  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            부적절한 글 신고
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                style={{ resize: "none" }}
                rows={5}
                placeholder={"신고할 내용입력"}
                onChange={handleChange}
                style={{ width: "100%", resize: "none" }}
              />
            </Form.Group>
          </Form>

          <p>10회 이상 게시물이 신고된 경우 게시물이 블라인드 처리됩니다.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>닫기</Button>
          <Button
            onClick={() => {
              dispatch({
                type: COUNT_REPORT_REQUEST,
                data: { report, postId },
              });
            }}
          >
            신고
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostReport;
