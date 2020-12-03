import React, { useState } from "react";
import PropTypes from "prop-types";

import Loading from "../components/loading/Loading";
import Menu from "../components/firstSeePage/Menu";

import { useDispatch, useSelector } from "react-redux";
import { FIND_PASSWORD_REQUEST } from "../reducers/user";

import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FindPassword = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const {
    findPasswordError,
    findPasswordLoading,
    findPasswordDone,
  } = useSelector((state) => state.user);

  return (
    <div>
      <div
        className="col-md-8 container justify-content-center"
        style={{ paddingTop: "75px" }}
      >
        <Row>
          <Col md={10}>
            {/* <Menu /> */}
            <Form>
              <Form.Group>
                <Form.Label className="text-center" style={{ width: "100%" }}>
                  이메일 주소를 입력하세요.
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="이메일 입력"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  해당 이메일 주소로 인증메일을 보내겠습니다.
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="btn float-right"
                onClick={(e) => {
                  if (!email) {
                    alert("이메일주소를 입력하세요.");
                    e.preventDefault();
                    return;
                  }
                  dispatch({
                    type: FIND_PASSWORD_REQUEST,
                    data: { email: email },
                  });
                  e.preventDefault();
                }}
              >
                보내기 {findPasswordLoading && <Loading />}
              </Button>
              {findPasswordDone && (
                <p>해당 이메일 주소로 인증메일을 보냈습니다.</p>
              )}
              {findPasswordError && (
                <p>
                  이메일 주소가 가입된 주소가 아니거나 기타 에러가 발생
                  했습니다.
                </p>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FindPassword;
