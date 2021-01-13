//사용자의 프로필을 변경/생성 할 수 있게 해주는 폼

import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { CHANGE_PROFILE_REQUEST } from "../../reducers/user";

import { Col, Button, Form, Row } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();

  const { id, email, nickname, introduce, ShareLink, where } = useSelector(
    (state) => state.user.user
  );

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [introduceValue, setIntroduceValue] = useState(introduce);
  const [shereLinkValue, setShereLinkValue] = useState(ShareLink);
  const [whereValue, setWhereValue] = useState(where);

  return (
    <div>
      <Form style={{ marginBottom: "50px" }}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            닉네임
          </Form.Label>

          <Col sm={10}>
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
                setNicknameValue(e.target.value);
              }}
            />
          </Col>

          <Form.Label column sm={2}>
            이메일
          </Form.Label>

          <Col sm={10}>
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

          <Form.Label column sm={2}>
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
              value={introduceValue}
              placeholder="소개를 입력하세요."
              onChange={(e) => {
                setIntroduceValue(e.target.value);
              }}
            />
          </Col>

          <Form.Label column sm={2}>
            공개 링크
          </Form.Label>

          <Col sm={10}>
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
              value={shereLinkValue}
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
              value={whereValue}
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
    </div>
  );
};
export default Profile;
