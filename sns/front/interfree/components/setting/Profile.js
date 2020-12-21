import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import Loading from "../loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PROFILE_REQUEST } from "../../reducers/user";
import {
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
  Row,
} from "react-bootstrap";

import { BsExclamationTriangle } from "react-icons/bs";
import styled from "styled-components";

const Styledp = styled.p`
  font-size: 25px;
  margin-bottom: 0px;
  @media (max-width: 992px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`;

const Styledinput = styled.input`
  width: 250px;
  @media (max-width: 992px) {
    width: 200px;
  }
  @media (max-width: 772px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 140px;
  }
`;

const NotReviseAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled">수정할 수 없어요.</Tooltip>}
      >
        <span className="d-inline-block">
          <BsExclamationTriangle />
        </span>
      </OverlayTrigger>
    </>
  );
};

const Profile = () => {
  const {
    id,
    email,
    nickname,
    introduce,
    ShareLink,
    where,
    createdAt,
  } = useSelector((state) => state.user.user);
  const {
    changeProfileDone,
    changeProfileError,
    changeProfileLoading,
  } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [introduceValue, setIntroduceValue] = useState(introduce);
  const [shereLinkValue, setShereLinkValue] = useState(ShareLink);
  const [whereValue, setWhereValue] = useState(where);

  const dispatch = useDispatch();
  const dateToFormat = createdAt;

  return (
    <div>
      <Form style={{ marginBottom: "50px" }}>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            닉네임
          </Form.Label>
          <Col sm="10">
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
              value={nicknameValue}
              placeholder="닉네임을 입력하세요."
              onChange={(e) => {
                setNicknameValue("e.target.value");
              }}
            />
          </Col>
          <Form.Label column sm="2">
            이메일
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="input"
              readOnly
              style={{
                resize: "none",
                boxShadow: "1px 1px 3px 3px #F8F8FF",
                borderRadius: "12px",
                marginBottom: "10px",
              }}
              rows={1}
              multiple
              value={email}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Col>

          <Form.Label column sm="2">
            소개
          </Form.Label>
          <Col sm="10">
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
              value={introduce}
              placeholder="소개를 입력하세요."
              onChange={(e) => {
                setIntroduceValue(e.target.value);
              }}
            />
          </Col>
          <Form.Label column sm="2">
            공개 링크
          </Form.Label>
          <Col sm="10">
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
              value={ShareLink}
              placeholder="공개링크를 입력하세요."
              onChange={(e) => {
                setShereLinkValue(e.target.value);
              }}
            />
          </Col>
          <Form.Label column sm="2">
            사는 곳
          </Form.Label>
          <Col sm="10">
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
              value={where}
              placeholder="사는 곳을 입력하세요. 예) 서울 중구"
              onChange={(e) => {
                setWhereValue(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
      </Form>

      <Button
        variant="primary"
        className=" float-right"
        onClick={() => {
          dispatch({
            type: CHANGE_PROFILE_REQUEST,
            data: {
              id,
              nicknameValue,
              introduceValue,
              shereLinkValue,
              whereValue,
            },
          });
        }}
      >
        반영
      </Button>
      {changeProfileLoading && <Loading />}
      {changeProfileDone && <p>반영이 완료되었습니다.</p>}
      {changeProfileError && <p>에러가 발생했습니다.</p>}
    </div>
  );
};
export default Profile;
