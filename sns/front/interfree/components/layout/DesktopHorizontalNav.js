// 데스크탑에서만 생성되는 상단 가로 네비게이션 바

import React, { useState } from "react";
import Router from "next/router";
import "rc-menu/assets/index.css";

import SearchModal from "./SearchModal";
import SignUP from "./SignUp";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";

import {
  DesktopNavContainer,
  Logo,
  AllPostLink,
  MeLink,
  SearchInput
} from "../../styledComponents/layout/HorizontalNav";

import { Button } from "react-bootstrap";

import { SiDatadog } from "react-icons/si";
import { AiOutlineUser } from "react-icons/ai";



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
            <Logo><SiDatadog />interfree</Logo>
          </li>

          <AiOutlineUser />
        </ul>
      </nav>
    </DesktopNavContainer>
  );
};

export default DesktopHorizontalNav;
