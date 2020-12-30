import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Menu, { SubMenu, MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";

import SearchModal from "./SearchModal";
import SignUP from "./SignUp";
import Login from "../firstSeePage/Login";
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

  console.log(id);

  useMemo(() => {
    if (logOutDone) {
      Router.push(`${frontUrl}`);
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

      <Menu mode="horizontal">
        <MenuItem>
          <Logo
            onClick={() => {
              Router.push(`${frontUrl}/allPostsBoard`);
            }}
          >
            <a>interfree</a>
          </Logo>
        </MenuItem>
        <>
          <MenuItem
            onClick={() => {
              Router.push(`${frontUrl}/allPostsBoard`);
            }}
          >
            <a>
              <AiFillDribbbleCircle />
              모든 포스트
            </a>
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/me`);
            }}
          >
            <a>
              <FaUserCircle /> 나
            </a>
          </MenuItem>

          <MenuItem
            onClick={() => {
              setSearchModalShow(true);
            }}
          >
            <a>
              <AiOutlineSearch /> 검색
            </a>
          </MenuItem>

          {id === "guest" ? (
            <>
              <MenuItem>
                <Button
                  onClick={() => {
                    setLoginModalShow(true);
                  }}
                >
                  계정 활동
                </Button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  dispatch({
                    type: USER_LOGOUT_REQUEST,
                  });
                }}
              >
                <Button>로그아웃</Button>
              </MenuItem>
            </>
          )}
        </>
      </Menu>
    </DesktopNavContainer>
  );
};

export default DesktopHorizontalNav;
