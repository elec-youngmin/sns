// 휴지통에 들어있는 포스트를 전부삭제 할지 여부 확인

import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { DELETE_ALLTRASH_REQUEST } from "../../reducers/post";

import { Modal, Button } from "react-bootstrap";

const TrashconfirmModal = (props) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);

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
            전부 삭제 의사 재 확인
          </Modal.Title>
        </Modal.Header>

        <Modal.Body class="text-center" style={{ margin: "20px" }}>
          전부 삭제 하려면 아래 버튼을 다시 누르세요.
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch({ type: DELETE_ALLTRASH_REQUEST, data: { id } });
            }}
            style={{ width: "100%" }}
          >
            전부 삭제 확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrashconfirmModal;
