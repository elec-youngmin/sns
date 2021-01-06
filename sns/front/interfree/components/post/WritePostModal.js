//사용자가 포스트를 작성할 수 있는 포스트 모달

import React, { useMemo } from "react";

import WritePostForm from "./WritePostForm";

import { useSelector } from "react-redux";

import { Modal } from "react-bootstrap";

const WritePostModal = (props) => {
  const { savePostDone } = useSelector((state) => state.post);

  useMemo(() => {
    if (savePostDone) {
      props.onHide();
    }
  }, [savePostDone]);

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
