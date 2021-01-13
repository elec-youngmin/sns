//사용자가 타임라인 주제를 추가할 수 있게 해주는 모달

import React, { useState } from "react";

import AddTimelineContentsModal from "./AddTimelineContentsModal";

import { useDispatch, useSelector } from "react-redux";
import { ADD_TIMELINE_SUBJECT_REQUEST } from "../../reducers/post";

import { Modal, Button, Form } from "react-bootstrap";

const AddTimelineModal = (props) => {
  const dispatch = useDispatch();

  const [timelineSubject, setTimelineSubject] = useState("");
  const [addTimelineContentsShow, setAddTimelineContentsShow] = useState(false);
  const show = props.show;

  return (
    <div>
      <AddTimelineContentsModal
        show={addTimelineContentsShow}
        onHide={() => setAddTimelineContentsShow(false)}
      />

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => props.onHide()}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            타임라인 주제 정하기
          </Modal.Title>
        </Modal.Header>

        <Modal.Body class="text-center" style={{ margin: "20px" }}>
          <Form style={{ marginBottom: "50px" }}>
            <Form.Group>
              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                }}
                rows={1}
                multiple
                placeholder="타임아웃의 주제를 정해보세요."
                onChange={(e) => {
                  setTimelineSubject(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => {
              props.onHide();
            }}
          >
            닫기
          </Button>

          <Button
            onClick={() => {
              if (timelineSubject === "") {
                alert("타임라인 주제를 정하고 생성버튼을 누르세요.");
                return;
              }
              dispatch({
                type: ADD_TIMELINE_SUBJECT_REQUEST,
                data: { timelineSubject },
              });
              setAddTimelineContentsShow(true);
              props.onHide();
            }}
          >
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTimelineModal;
