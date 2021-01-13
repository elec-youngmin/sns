// 휴지통 페이지에서 휴지통 포스트 수, 전부 완전 삭제 버튼, 전부 다시 포스트로 이동 버튼 생성

import React, { useState, useMemo } from "react";

import TrashconfirmModal from "./TrashconfirmModal";

import { useDispatch, useSelector } from "react-redux";
import { RESTORE_ALLTRASH_REQUEST } from "../../reducers/post";

import { Button } from "react-bootstrap";
import styled from "styled-components";

const Styledp = styled.p`
  font-size: 32x;

  @media (max-width: 992px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 425px) {
    font-size: 15px;
  }
`;

const Styledbutton = styled.button`
  font-size: 15px;
  border: none;
  border-radius: 10px;
  color: #2ebbc1;

  @media (max-width: 992px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 425px) {
    font-size: 15px;
  }
`;

const TrashPostAlert = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const { trashPosts, deleteAlltrashDone } = useSelector((state) => state.post);
  const { id } = useSelector((state) => state.user.user);

  useMemo(() => {
    if (deleteAlltrashDone) {
      setModalShow(false);
    }
  }, [deleteAlltrashDone]);

  return (
    <div class="text-center" style={{ marginTop: "25px" }}>
      <TrashconfirmModal show={modalShow} onHide={() => setModalShow(false)} />
      <Styledp>휴지통 포스트 수 {trashPosts.length}개</Styledp>

      <div style={{ marginBottom: "20px" }}>
        <Button
          variant="primary"
          style={{ marginRight: "20px" }}
          onClick={() => {
            if (trashPosts.length === 0) {
              alert("완전삭제할 포스트가 없어요.");
              return;
            }
            setModalShow(true);
          }}
          style={{
            fontSize: "15px",
            fontWeight: "600",
            marginRight: "15px",
          }}
        >
          전부 완전 삭제
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            if (trashPosts.length === 0) {
              alert("포스트로 보낼 포스트가 없어요.");
            }
            dispatch({
              type: RESTORE_ALLTRASH_REQUEST,
              data: { id },
            });
          }}
          style={{
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          전부 다시 포스트로 이동
        </Button>
      </div>
    </div>
  );
};

export default TrashPostAlert;
