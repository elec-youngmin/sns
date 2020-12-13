import React from "react";

import setting from "../../pages/setting";

import { Modal } from "react-bootstrap";

const SettingModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <setting />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SettingModal;
