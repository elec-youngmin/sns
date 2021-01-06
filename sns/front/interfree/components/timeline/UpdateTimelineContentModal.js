// 타임라인 엘러먼트를 수정할 수 있는 수정 모달

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { UPDATE_TIMELINE_CONTENTS_REQUEST } from "../../reducers/post";

import { Form, Button, Modal } from "react-bootstrap";

//props=>  id,title,content,date,show,onHide()
const UpdateTimelineContentModal = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [date, setDate] = useState(props.date);

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
            타임라인 박스 내용 수정
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
                value={title}
                placeholder="타임아웃의 제목을 입력하세요."
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
                placeholder="타임아웃의 내용을 입력하세요."
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
                value={date}
                placeholder="시기를 입력하세요. 예) 2018-2020,2018년 5월 28일"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
          >
            닫기
          </Button>

          <Button
            className="btn float-right"
            onClick={() => {
              dispatch({
                type: UPDATE_TIMELINE_CONTENTS_REQUEST,
                data: { id: props.id, title, content, date },
              });
              props.onHide();
            }}
            style={{
              margin: "15px",
            }}
          >
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateTimelineContentModal;
