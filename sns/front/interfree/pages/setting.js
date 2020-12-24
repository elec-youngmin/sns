import React, { useState, useMemo } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Title from "../components/layout/Title";
import EditProfilePictureModal from "../components/setting/EditProfilePictureModal";
import EditProfileSettingModal from "../components/setting/EditProfileSettingModal";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionRow,
} from "../styledComponents/layout/Session";

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
    <div>
      <EditProfilePictureModal
        show={editProfilePictureShow}
        onHide={() => setEditProfilePictureShow(false)}
      />
      <EditProfileSettingModal
        show={editProfileSettingShow}
        onHide={() => setEditProfileSettingShow(false)}
      />

      <SessionRow>
        <Col md={7}>
          <Title title={"설정"} />

          <SessionDiv>
            <SessionTitle>
              <ImProfile />
              프로필 사진 편집
            </SessionTitle>
            <SessionP>공개되는 프로필 사진을 편집하세요.</SessionP>
            <SessionButton
              onClick={() => {
                setEditProfilePictureShow(true);
              }}
            >
              프로필 사진 편집하기
            </SessionButton>
          </SessionDiv>

          <SessionDiv>
            <SessionTitle>
              <ImProfile />
              프로필 편집
            </SessionTitle>
            <SessionP>공개되는 프로필을 편집하세요.</SessionP>
            <SessionButton
              onClick={() => {
                setEditProfileSettingShow(true);
              }}
            >
              프로필 편집하기
            </SessionButton>
          </SessionDiv>

          <SessionDiv>
            <SessionTitle>
              <BiBlock />
              {disabled ? "모든 글 공개" : "모든 글 비공개"}
            </SessionTitle>
            <SessionP>
              {disabled ? "전체 글에 공개되요." : "전체 글에 공개되지 않아요."}
            </SessionP>
            <SessionButton
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
            >
              {disabled ? "활성화" : "비활성화"}
            </SessionButton>
          </SessionDiv>

          <SessionDiv>
            <SessionTitle>
              <RiLockPasswordFill />
              패스워드 변경
            </SessionTitle>
            <SessionP>
              회원가입 시 등록한 메일주소로 인증메일을 보냅니다.
            </SessionP>
            <SessionButton
              onClick={() => {
                dispatch({
                  type: FIND_PASSWORD_REQUEST,
                  data: { email: user.email },
                });
              }}
            >
              인증메일 요청
            </SessionButton>
          </SessionDiv>

          <SessionDiv>
            <SessionTitle>
              <FaUserSlash />
              회원탈퇴
            </SessionTitle>
            <SessionP>비밀번호가 일치하면 회원탈퇴가 완료됩니다.</SessionP>
            <SessionP>
              회원탈퇴를 하시면 지금까지 작성한 포스트가 모두 삭제됩니다.
            </SessionP>
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
              <SessionButton type="submit">회원탈퇴</SessionButton>
            </form>
          </SessionDiv>
        </Col>
      </SessionRow>
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
