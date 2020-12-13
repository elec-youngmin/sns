import React from "react";

import WritePostForm from "../post/WritePostForm";

import { Modal } from "react-bootstrap";

const WritePostModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            포스트 작성
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WritePostForm modal={true} props={props} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WritePostModal;
