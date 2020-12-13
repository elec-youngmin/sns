import React from "react";

import { Modal, Button } from "react-bootstrap";

import FollowPage from "../follow/FollowPage";

const FollowModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            팔로우한 유저 프로필 및 유저 페이지
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FollowPage />
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
    </>
  );
};

export default FollowModal;
