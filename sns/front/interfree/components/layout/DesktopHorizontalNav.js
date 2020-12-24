import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Menu, { SubMenu, MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";

import SearchModal from "./SearchModal";

import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import {
  AiFillDribbbleCircle,
  AiOutlineLogout,
  AiOutlineLineChart,
  AiOutlineSearch,
} from "react-icons/ai";

import { FaUserCircle } from "react-icons/fa";

// import Styledh1 from "./style/menuStyle";
import styled from "styled-components";

import { frontUrl } from "../../config/config";

const Styledh1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #8a2be2;
  font-size: 40px;
  text-align: center;
  cursor: "pointer";
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 430px) {
    font-size: 30px;
    .cols {
      width: 100%;
      text-align: center;
      margin-right: 100px;
      font-size: 300px;
    }
  }
  @media (max-width: 290px) {
    font-size: 20px;
  }
`;

const Styleddiv = styled.div`
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 430px) {
    font-size: 25px;
  }
  @media (max-width: 290px) {
    font-size: 15px;
  }
`;

const DesktopHorizontalNav = () => {
  const dispatch = useDispatch();
  const { logInDone, logOutDone, loadUserInfomationDone } = useSelector(
    (state) => state.user
  );
  const { search } = useSelector((state) => state.post);
  const [searchModalShow, setSearchModalShow] = useState(false);

  useMemo(() => {
    if (logOutDone) {
      Router.push(`${frontUrl}`);
    }
  }, [logOutDone]);

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "30px",
        color: "#6495ED",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "100",
      }}
    >
      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />
      <Menu mode="horizontal">
        <MenuItem>
          <Styledh1
            onClick={() => {
              Router.push(`${frontUrl}/me`);
            }}
          >
            <a>interfree</a>
          </Styledh1>
        </MenuItem>
        {logInDone ||
          (loadUserInfomationDone && !logOutDone && (
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

              <MenuItem
                onClick={() => {
                  dispatch({
                    type: USER_LOGOUT_REQUEST,
                  });
                }}
              >
                <a>
                  <AiOutlineLogout />
                </a>
              </MenuItem>
            </>
          ))}
      </Menu>
    </div>
  );
};

export default DesktopHorizontalNav;
