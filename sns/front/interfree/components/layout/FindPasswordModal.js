// 설정페이지에서 생성되는 패스워드 모달

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useDispatch, useSelector } from "react-redux";

import { RESETTING_PASSWORD_REQUEST } from "../../reducers/user";

import { Modal, Button } from "react-bootstrap";

const FindPasswordModal = (props) => {
  const dispatch = useDispatch();
  const { resettingPasswordError } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const { register, errors, handleSubmit, watch } = useForm({});

  useMemo(() => {
    if (resettingPasswordError) {
      alert(resettingPasswordError);
    }
  }, [resettingPasswordError]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            패스워드 변경
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          class="container justify-content-center"
          style={{ margin: "20px" }}
        >
          <form
            onSubmit={handleSubmit(() => {
              dispatch({
                type: RESETTING_PASSWORD_REQUEST,
                data: { password, rePassword },
              });
              props.onHide;
            })}
            style={{ margin: "20px" }}
          >
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              현재 패스워드
            </label>
            <input
              type="password"
              name="password"
              placeholder="현재 패스워드 입력"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              ref={register({
                required: "패스워드를 입력하세요.",
                validate: (value) =>
                  value.length > 9 || "패스워드 길이를 9자 이상 입력하세요.",
              })}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{
                borderRadius: "15px",
                margin: "0px auto",
                marginBottom: "20px",
              }}
            />
            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              변경할 패스워드
            </label>

            <input
              type="password"
              name="password"
              placeholder="변경할 패스워드 입력"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              ref={register({
                required: "패스워드를 입력하세요.",
                validate: (value) =>
                  value.length > 9 || "패스워드 길이를 9자 이상 입력하세요.",
              })}
              style={{
                borderRadius: "15px",
                margin: "0px auto",
                marginBottom: "20px",
              }}
            />

            <label style={{ fontSize: "15px", fontWeight: "600" }}>
              변경할 패스워드 다시입력
            </label>

            <input
              type="password"
              name="rePassword"
              placeholder="패스워드 다시 입력"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              ref={register({
                required: "패스워드를 다시 입력하세요.",
                validate: (value) =>
                  value === watch("password") ||
                  "변경할 패스워드가 일치하지 않아요.",
              })}
              onChange={(e) => {
                setRePassword(e.target.value);
              }}
              style={{
                borderRadius: "15px",
                margin: "0px auto",
                marginBottom: "20px",
              }}
            />

            <ErrorMessage
              className="invalid-feedback"
              name="password"
              as="div"
              errors={errors}
            />

            <ErrorMessage
              className="invalid-feedback"
              name="rePassword"
              as="div"
              errors={errors}
            />
            <Button type="submit" className="btn float-right">
              확인
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FindPasswordModal;
