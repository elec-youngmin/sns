import React, { useState, useMemo } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import EditProfilePictureModal from "../components/setting/EditProfilePictureModal";
import EditProfileSettingModal from "../components/setting/EditProfileSettingModal";

import { useSelector, useDispatch } from "react-redux";
import {
  LOAD_USER_INFOMATION_REQUEST,
  DESTROY_USER_REQUEST,
  DISABLED_ONEUSER_ALLPOST_REQUEST,
  ACTIVATE_ONEUSER_ALLPOST_REQUEST,
  FIND_PASSWORD_REQUEST,
} from "../reducers/user";

import { BiBlock } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserSlash } from "react-icons/fa";

import { Tab, Row, Col, Button } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

const ToastSuccess = (text) => {
  toast.dark(text, {
    position: "top-center",
  });
};

const ToastError = (text) => {
  toast.error(text);
};

const setting = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({});
  const [editProfilePictureShow, setEditProfilePictureShow] = useState(false);
  const [editProfileSettingShow, setEditProfileSettingShow] = useState(false);
  const [password, setPassword] = useState("");

  const { disabled } = useSelector((state) => state.user.user);
  const { user, destroyUserDone } = useSelector((state) => state.user);

  const onSubmit = () => {
    dispatch({
      type: DESTROY_USER_REQUEST,
      data: { password, userId: user.id },
    });
  };

  useMemo(() => {
    if (destroyUserDone) {
      Router.push(`${frontUrl}`);
    }
  }, [destroyUserDone]);
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <EditProfilePictureModal
        show={editProfilePictureShow}
        onHide={() => setEditProfilePictureShow(false)}
      />
      <EditProfileSettingModal
        show={editProfileSettingShow}
        onHide={() => setEditProfileSettingShow(false)}
      />

      <Row
        style={{
          paddingTop: "95px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0px auto",
        }}
      >
        <Col md={7}>
          <div
            style={{
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "500",
                fontSize: "45px",
                margin: "20px 0px",
              }}
            >
              설정
            </p>
          </div>
          <div
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <ImProfile />
              프로필 사진 편집
            </p>
            <p style={{ fontWeight: "600" }}>
              공개되는 프로필 사진을 편집하세요.
            </p>
            <Button
              onClick={() => {
                setEditProfilePictureShow(true);
              }}
              style={{
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              프로필 사진 편집하기
            </Button>
          </div>

          <div
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <ImProfile />
              프로필 편집
            </p>
            <p style={{ fontWeight: "600" }}>공개되는 프로필을 편집하세요.</p>
            <Button
              onClick={() => {
                setEditProfileSettingShow(true);
              }}
              style={{
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              프로필 편집하기
            </Button>
          </div>

          <div
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <BiBlock />
              {disabled ? "모든 글 공개" : "모든 글 비공개"}
            </p>
            <p style={{ fontWeight: "600" }}>
              {disabled ? "전체 글에 공개되요." : "전체 글에 공개되지 않아요."}
            </p>
            <Button
              onClick={() => {
                if (disabled) {
                  dispatch({
                    type: ACTIVATE_ONEUSER_ALLPOST_REQUEST,
                  });
                } else {
                  dispatch({
                    type: DISABLED_ONEUSER_ALLPOST_REQUEST,
                  });
                }
              }}
              style={{
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              {disabled ? "활성화" : "비활성화"}
            </Button>
          </div>

          <div
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <RiLockPasswordFill />
              패스워드 변경
            </p>
            <p style={{ fontWeight: "600" }}>
              회원가입 시 등록한 메일주소로 인증메일을 보냅니다.
            </p>
            <Button
              onClick={() => {
                dispatch({
                  type: FIND_PASSWORD_REQUEST,
                  data: { email: user.email },
                });
              }}
              style={{
                marginBottom: "20px",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              인증메일 요청
            </Button>
          </div>

          <div
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              <FaUserSlash />
              회원탈퇴
            </p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              비밀번호가 일치하면 회원탈퇴가 완료됩니다.
            </p>
            <p style={{ fontWeight: "600" }}>
              회원탈퇴를 하시면 지금까지 작성한 포스트가 모두 삭제됩니다.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="password"
                name="password"
                placeholder="패스워드 입력"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
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
                  width: "80%",
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
              <Button
                type="submit"
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                회원탈퇴
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
export default setting;
