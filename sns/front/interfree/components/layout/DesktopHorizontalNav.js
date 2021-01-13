// 데스크탑에서만 생성되는 상단 가로 네비게이션 바

import React, { useState } from "react";
import Router from "next/router";
import "rc-menu/assets/index.css";

import SearchModal from "./SearchModal";
import SignUP from "./SignUp";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import {
  DesktopNavContainer,
  Logo,
  AllPostLink,
  MeLink,
  SearchLink,
} from "../../styledComponents/layout/HorizontalNav";

import { Button } from "react-bootstrap";

import { AiFillDribbbleCircle, AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import { frontUrl } from "../../config/config";

const DesktopHorizontalNav = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);
  const [searchModalShow, setSearchModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

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

          <AllPostLink
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
          </AllPostLink>

          <MeLink
            onClick={() => {
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
          </MeLink>

          <SearchLink
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
          </SearchLink>

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
