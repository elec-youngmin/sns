// 더 이상 쓸모 없어진 컴포넌트, 운영에 이상이 없으면 삭제

import { useState, useMemo } from "react";

import { useSelector } from "react-redux";

import { Modal, Button } from "react-bootstrap";

const SignUpCompletedModal = (props) => {
  const { signUpError } = useSelector((state) => state.user);

  const [signUpTitleConfirm, SetsignUpTitleConfirm] = useState("회원가입 완료");
  const [signUpBodyConfirm, SetsignUpBodyConfirm] = useState(
    "축하합니다! 이제 인터프리의 모든 서비스를 이용하실 수 있어요."
  );

  useMemo(() => {
    if (signUpError) {
      SetsignUpTitleConfirm("회원가입 실패");
      SetsignUpBodyConfirm(signUpError);
    }
  }, [signUpError]);

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
            {signUpTitleConfirm}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{signUpBodyConfirm}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => props.onHide()}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUpCompletedModal;
