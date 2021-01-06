//사용자가 타임라인 내용을 입력할 수 있게 해주는 모달

import React, { useState, useMemo } from "react";

import { ADD_TIMELINE_CONTENTS_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form } from "react-bootstrap";

const AddTimelineContentsModal = (props) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.post.timelineId);
  const { addTimelineSubjectError, addTimelineContentsDone } = useSelector(
    (state) => state.post
  );

  const [modaltitle, setModalTitle] = useState("타임라인 박스 추가하기");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [moment, setMoment] = useState("");
  const [timelineId, setTimelineId] = useState("");

  useMemo(() => {
    if (addTimelineContentsDone) {
      setContent("");
      setMoment("");
      setTitle("");
      setModalTitle("계속 타임라인 박스 추가하기");
    }
  }, [addTimelineContentsDone]);
  //한 타임라인 박스가 업로드되면 폼의 모든 텍스트가 비워짐.

  useMemo(() => {
    if (addTimelineSubjectError) {
      alert(addTimelineSubjectError);
    }
  }, [addTimelineSubjectError]);
  //타임라인 주제가 중복되면 에러 발생

  useMemo(() => {
    if (id) {
      setTimelineId(id);
    } else {
      setTimelineId(props.id);
    }
  }, [id, props]);

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
            {modaltitle}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form style={{ marginBottom: "50px" }}>
            <Form.Group>
              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                placeholder="타임아웃의 제목을 입력"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                value={content}
                placeholder="타임아웃의 내용을 입력"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />

              <Form.Control
                as="input"
                style={{
                  resize: "none",
                  boxShadow: "1px 1px 3px 3px #F8F8FF",
                  borderRadius: "12px",
                  marginBottom: "10px",
                }}
                rows={1}
                multiple
                value={moment}
                placeholder="시기를 입력"
                onChange={(e) => {
                  setMoment(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{ marginRight: "15px" }}
          >
            닫기
          </Button>

          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{}}
            onClick={() => {
              dispatch({
                type: ADD_TIMELINE_CONTENTS_REQUEST,
                data: {
                  title,
                  content,
                  moment,
                  timelineId, //타임라인 id
                },
              });
            }}
          >
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTimelineContentsModal;
