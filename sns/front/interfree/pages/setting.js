import React, { useState, useMemo } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Title from "../components/layout/Title";
import NeedLoginAlert from "../components/login/NeedLoginAlert";
import EditProfilePictureModal from "../components/setting/EditProfilePictureModal";
import EditProfileSettingModal from "../components/setting/EditProfileSettingModal";
import FindPasswordModal from "../components/layout/FindPasswordModal";

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
} from "../reducers/user";

import { BiBlock, BiUser } from "react-icons/bi";
import { ImProfile } from "react-icons/im";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserSlash } from "react-icons/fa";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

const setting = () => {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({});

  const [editProfilePictureShow, setEditProfilePictureShow] = useState(false);
  const [editProfileSettingShow, setEditProfileSettingShow] = useState(false);
  const [findPasswordModalshow, setFindPasswordModalshow] = useState(false);

  const [password, setPassword] = useState("");

  const { loadUserInfomationDone } = useSelector((state) => state.user);
  const { disabled } = useSelector((state) => state.user.user);
  const {
    user,
    resettingPasswordDone,
    destroyUserDone,
    logInDone,
  } = useSelector((state) => state.user);

  const onSubmit = () => {
    dispatch({
      type: DESTROY_USER_REQUEST,
      data: { userId: user.id, password },
    });
  };

  useMemo(() => {
    if (destroyUserDone) {
      Router.push(`${frontUrl}`);
    }
  }, [destroyUserDone]);

  useMemo(() => {
    {
      if (resettingPasswordDone) {
        setFindPasswordModalshow(false);
      }
    }
  }, [resettingPasswordDone]);

  return (
    <div>
      {user.id === "guest" && <NeedLoginAlert />}
      {(loadUserInfomationDone || logInDone) && user.id !== "guest" && (
        <>
          <EditProfilePictureModal
            show={editProfilePictureShow}
            onHide={() => setEditProfilePictureShow(false)}
          />

          <EditProfileSettingModal
            show={editProfileSettingShow}
            onHide={() => setEditProfileSettingShow(false)}
          />

          <FindPasswordModal
            show={findPasswordModalshow}
            onHide={() => setFindPasswordModalshow(false)}
          />

          <div className="container justify-content-center">
            <SessionRow>
              <Col md={7}>
                <Title title={"설정"} />

                <SessionDiv>
                  <SessionTitle>
                    <BiUser />
                    프로필 사진 변경
                  </SessionTitle>
                  <SessionP>공개되는 프로필 사진을 변경하세요.</SessionP>
                  <SessionButton
                    onClick={() => {
                      setEditProfilePictureShow(true);
                    }}
                  >
                    프로필 사진 변경하기
                  </SessionButton>
                </SessionDiv>

                <SessionDiv>
                  <SessionTitle>
                    <ImProfile />
                    프로필 변경
                  </SessionTitle>
                  <SessionP>공개되는 프로필을 변경하세요.</SessionP>
                  <SessionButton
                    onClick={() => {
                      setEditProfileSettingShow(true);
                    }}
                  >
                    프로필 변경하기
                  </SessionButton>
                </SessionDiv>

                <SessionDiv>
                  <SessionTitle>
                    <BiBlock />
                    {disabled ? "전체 포스트에 공개" : "모든 포스트 비공개"}
                  </SessionTitle>
                  <SessionP>
                    {disabled
                      ? "전체 포스트에 공개되요."
                      : "전체 포스트에 공개되지 않아요."}
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
                  <SessionP>비밀번호를 주기적으로 변경하세요.</SessionP>

                  <SessionButton
                    onClick={() => {
                      setFindPasswordModalshow(true);
                    }}
                  >
                    비밀번호 변경
                  </SessionButton>
                </SessionDiv>

                <SessionDiv>
                  <SessionTitle>
                    <FaUserSlash />
                    회원탈퇴
                  </SessionTitle>
                  <SessionP>
                    카카오 계정으로 가입하신 경우, 이기능을 사용하지 마세요.
                  </SessionP>
                  <SessionP>
                    비밀번호가 일치하면 회원탈퇴가 완료됩니다.
                  </SessionP>
                  <SessionP>
                    회원탈퇴를 하시면 지금까지 작성한 포스트가 모두 삭제됩니다.
                  </SessionP>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="password"
                      name="inputPassword"
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
                      style={{
                        borderRadius: "15px",
                        width: "60%",
                        margin: "0px auto",
                        marginBottom: "20px",
                      }}
                    />

                    <ErrorMessage
                      className="invalid-feedback"
                      name="inputPassword"
                      as="div"
                      errors={errors}
                    />
                    <SessionButton type="submit">회원탈퇴</SessionButton>
                  </form>
                </SessionDiv>
              </Col>
            </SessionRow>
          </div>
        </>
      )}
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
