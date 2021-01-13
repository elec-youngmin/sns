//계정활동 버튼을 누르면 생성되는 회원가입 모달

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useDispatch, useSelector } from "react-redux";

import { USER_SIGNUP_REQUEST } from "../../reducers/user";

import { Button, Modal } from "react-bootstrap";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();

  const { register, errors, handleSubmit, watch } = useForm({});

  const onSubmit = () => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
      data: { email, password, nickname },
    });
  };

  const { signUpLoading } = useSelector((state) => state.user);
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">회원가입</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    placeholder="이메일 입력"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    ref={register({
                      required: "이메일 주소를 입력하세요.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "올바른 이메일 형식이 아니에요.",
                      },
                    })}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <p>패스워드를 찾을 때 올바른 이메일 주소가 필요해요.</p>
                  <ErrorMessage
                    className="invalid-feedback"
                    name="email"
                    as="div"
                    errors={errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="패스워드 입력"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    ref={register({
                      required: "패스워드를 입력하세요.",
                      validate: (value) =>
                        value.length > 9 ||
                        "패스워드 길이를 9자 이상 입력하세요.",
                    })}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <ErrorMessage
                    className="invalid-feedback"
                    name="password"
                    as="div"
                    errors={errors}
                  />
                </div>

                <div className="form-group">
                  <input
                    name="rePassword"
                    type="password"
                    placeholder="패스워드 확인"
                    className={`form-control ${
                      errors.rePassword ? "is-invalid" : ""
                    }`}
                    ref={register({
                      required: "패스워드를 다시 입력하세요.",
                      validate: (value) =>
                        value === watch("password") ||
                        "패스워드가 일치하지 않아요.",
                    })}
                  />

                  <ErrorMessage
                    className="invalid-feedback"
                    name="rePassword"
                    as="div"
                    errors={errors}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Nickname</label>
                  <input
                    name="nickname"
                    placeholder="닉네임 입력"
                    className={`form-control ${
                      errors.nickname ? "is-invalid" : ""
                    }`}
                    ref={register({
                      required: "닉네임을 입력하세요.",
                    })}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  />

                  <ErrorMessage
                    className="invalid-feedback"
                    name="nickname"
                    as="div"
                    errors={errors}
                  />
                </div>

                <div className="form-group">
                  <label>
                    도덕적으로, 윤리적으로 어긋나는 글을 적지 않을 것을
                    맹세합니다.
                  </label>
                  <input
                    name="check"
                    type="checkbox"
                    className={`form-control ${
                      errors.check ? "is-invalid" : ""
                    }`}
                    ref={register({
                      required: "이곳을 체크해야 회원가입이 완료되요.",
                    })}
                  />

                  <ErrorMessage
                    className="invalid-feedback"
                    name="check"
                    as="div"
                    errors={errors}
                  />
                </div>

                <button
                  className="btn btn-primary btn-block"
                  type="submit"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  회원가입
                  {signUpLoading && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
