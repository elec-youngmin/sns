import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast, ToastContainer } from "react-toastify";

import { Modal, Button } from "react-bootstrap";

import { AiFillCaretRight } from "react-icons/ai";
import { BsFillSquareFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

const AudioWirtePostModal = (props) => {
  const [stopIcon, setStopIcon] = useState(<AiFillCaretRight />);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const ToastSuccess = (text) => {
    toast.dark(text, {
      position: "top-center",
      progress: undefined,
      hideProgressBar: true,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            음성으로 간단하게 올리기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            onClick={SpeechRecognition.startListening}
            style={{ marginRight: "20px" }}
          >
            {stopIcon}
          </Button>
          <Button
            onClick={SpeechRecognition.stopListening}
            style={{ marginRight: "20px" }}
          >
            <BsFillSquareFill />
          </Button>
          <Button onClick={resetTranscript}>
            <BiReset />
          </Button>
          <p>{transcript}</p>
        </Modal.Body>
        <Button>저장</Button>
      </Modal>
    </>
  );
};

export default AudioWirtePostModal;
