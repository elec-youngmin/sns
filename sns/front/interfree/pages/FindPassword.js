//이메일을 입력하면 해당 이메일 주소로 임시 비밀번호를 발급하는 페이지

import React, { useState } from "react";

import Loading from "../components/loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import { FIND_PASSWORD_REQUEST } from "../reducers/user";

import { SessionRow } from "../styledComponents/layout/Session";

import { Col, Form, Button } from "react-bootstrap";

const findPassword = () => {
  const [email, setEmail] = useState();
  const dispatch = useDispatch();
  const {
    findPasswordError,
    findPasswordLoading,
    findPasswordDone,
  } = useSelector((state) => state.user);

  return (
    <div>
      <div className=" container justify-content-center">
        <SessionRow>
          <Col md={10}>
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
                  해당 이메일 주소로 임시 비밀번호를 보냅니다.
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
                <p>해당 이메일 주소로 임시 비밀번호를 보냈습니다.</p>
              )}
              {findPasswordError && (
                <p>
                  이메일 주소가 가입된 주소가 아니거나 기타 에러가 발생
                  했습니다.
                </p>
              )}
            </Form>
          </Col>
        </SessionRow>
      </div>
    </div>
  );
};

export default findPassword;
