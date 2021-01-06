//사용자의 프로필을 변경/생성 할 수 있게 해주는 모달

import React from "react";

import Profile from "./Profile";

import { Modal } from "react-bootstrap";

const EditProfileSettingModal = (props) => {
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
            프로필 변경
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Profile />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProfileSettingModal;
