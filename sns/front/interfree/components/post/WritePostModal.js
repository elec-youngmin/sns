import React from "react";

import WritePostForm from "./WritePostForm";

import { Modal, Button } from "react-bootstrap";

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
          <WritePostForm />
        </Modal.Body>
        <Modal.Footer class="col-lg-12">
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WritePostModal;
