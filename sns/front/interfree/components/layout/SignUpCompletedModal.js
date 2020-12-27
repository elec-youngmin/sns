import { useState, useMemo } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { Modal, Button } from "react-bootstrap";

const SignUpCompletedModal = () => {
  const [show, setShow] = useState(true);
  const [signUpTitleConfirm, SetsignUpTitleConfirm] = useState("회원가입 완료");
  const [signUpBodyConfirm, SetsignUpBodyConfirm] = useState(
    "축하합니다! 이제 인터프리의 모든 서비스를 이용하실 수 있어요."
  );

  const { signUpError } = useSelector((state) => state.user);

  const handleClose = () => {
    setShow(false);
  };
  if (signUpError) {
    console.log(signUpError);
    useMemo(() => {
      SetsignUpTitleConfirm("회원가입 실패");
    }, [signUpError]);
    useMemo(() => {
      SetsignUpBodyConfirm(signUpError);
    }, [signUpError]);
  }
  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {signUpTitleConfirm}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{signUpBodyConfirm}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUpCompletedModal;
