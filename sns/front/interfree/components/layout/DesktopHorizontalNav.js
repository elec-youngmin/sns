// 데스크탑에서만 생성되는 상단 가로 네비게이션 바

import React, { useState, useMemo } from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import "rc-menu/assets/index.css";

import SearchModal from "./SearchModal";
import SignUP from "./SignUp";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import {
  DesktopNavContainer,
  Logo,
} from "../../styledComponents/layout/HorizontalNav";

import { Button } from "react-bootstrap";

import { AiFillDribbbleCircle, AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import { frontUrl } from "../../config/config";

const DesktopHorizontalNav = () => {
  const dispatch = useDispatch();
  const { logOutDone } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.user.user);
  const [searchModalShow, setSearchModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  useMemo(() => {
    if (logOutDone) {
      Router.push(`${frontUrl}/allPostsBoard`);
    }
  }, [logOutDone]);

  return (
    <DesktopNavContainer>
      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />

      <SignUP show={signUpModalShow} onHide={() => setSignUpModalShow(false)} />

      <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />

      <nav style={{ width: "100%", zIndex: "99999" }}>
        <ul style={{ listStyle: "none" }}>
          <li
            style={{ display: "inline" }}
            onClick={() => {
              Router.push(`${frontUrl}/allPostsBoard`);
            }}
          >
            <Logo>interfree</Logo>
          </li>

          <li
            style={{
              display: "inline",
              marginRight: "20px",
              marginLeft: "-80px",
            }}
            onClick={() => {
              Router.push(`${frontUrl}/allPostsBoard`);
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#666666",
              }}
            >
              <AiFillDribbbleCircle /> 모든포스트
            </a>
          </li>

          <li
            style={{ display: "inline", marginRight: "20px" }}
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/me`);
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#666666",
              }}
            >
              <FaUserCircle /> 나
            </a>
          </li>

          <li
            style={{ display: "inline" }}
            onClick={() => {
              setSearchModalShow(true);
            }}
          >
            <a
              style={{
                textDecoration: "none",
                color: "#666666",
              }}
            >
              <AiOutlineSearch /> 검색
            </a>
          </li>

          <li
            style={{ display: "inline", float: "right", marginRight: "10px" }}
          >
            {id === "guest" ? (
              <>
                <a>
                  <Button
                    onClick={() => {
                      setLoginModalShow(true);
                    }}
                  >
                    계정 활동
                  </Button>
                </a>
              </>
            ) : (
              <>
                <a
                  onClick={() => {
                    dispatch({
                      type: USER_LOGOUT_REQUEST,
                    });
                  }}
                >
                  <Button>로그아웃</Button>
                </a>
              </>
            )}
          </li>
        </ul>
      </nav>
    </DesktopNavContainer>
  );
};

export default DesktopHorizontalNav;
