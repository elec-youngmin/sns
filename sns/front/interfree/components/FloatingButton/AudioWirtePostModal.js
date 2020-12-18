import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { Modal, Button, Row, Col } from "react-bootstrap";

import { AiFillCaretRight } from "react-icons/ai";
import { BsFillSquareFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

import { SAVE_POST_REQUEST } from "../../reducers/post";

import { useDispatch } from "react-redux";

const AudioWirtePostModal = (props) => {
  const dispatch = useDispatch();
  const [listening, setlistening] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }
  const abc = () => {
    SpeechRecognition.startListening();
    setlistening("듣고있는 중.. 말씀하세요...");
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            음성으로 간단하게 올리기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={abc} style={{ marginRight: "20px" }}>
            <AiFillCaretRight />
          </Button>
          <Button
            onClick={() => {
              SpeechRecognition.stopListening();
              setlistening("");
            }}
            style={{ marginRight: "20px" }}
          >
            <BsFillSquareFill />
          </Button>
          <Button onClick={resetTranscript}>
            <BiReset />
          </Button>
          <br />
          <br />
          <p
            style={{
              textWeight: "1000",
            }}
          >
            {listening}
          </p>
          <p>{transcript}</p>
        </Modal.Body>
        <Button
          onClick={() => {
            dispatch({
              type: SAVE_POST_REQUEST,
              data: { audioPost: transcript },
            });
          }}
        >
          저장
        </Button>
        <Button
          onClick={() => {
            SpeechRecognition.stopListening();
            props.onHide();
          }}
        >
          닫기
        </Button>
      </Modal>
    </>
  );
};

export default AudioWirtePostModal;
