import React, { useState } from "react";
import { IconPicker } from "react-fa-icon-picker";

import UserProfileCard from "../allPost/UserProfileCard";

import { useSelector } from "react-redux";

import { Modal, Button } from "react-bootstrap";

const AddIconModal = (props) => {
  const [icon, setIcon] = useState("");

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
            아이콘 추가
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <IconPicker value={icon} onChange={(v) => setIcon(v)} />
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

export default AddIconModal;
