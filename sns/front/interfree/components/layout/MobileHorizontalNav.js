import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { slide as MenuBar } from "react-burger-menu";

import SearchModal from "./SearchModal";

import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import { AiFillSetting, AiFillEdit } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import { GiTimeBomb } from "react-icons/gi";

import {
  BsTrashFill,
  BsBookmarksFill,
  BsFillBarChartFill,
} from "react-icons/bs";

import {
  AiFillDribbbleCircle,
  AiOutlineLogout,
  AiOutlineLineChart,
  AiOutlineSearch,
} from "react-icons/ai";

import { FaUserCircle } from "react-icons/fa";

import styled from "styled-components";

import { frontUrl } from "../../config/config";

const Styledspan = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #8a2be2;
  font-size: 40px;
  text-align: center;
  cursor: "pointer";
  display: "flex",
  align-items: "center",
  justify-content: "center",
  margin-top:'20px',
  zindex:"100px",
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 430px) {
    font-size: 33px;
    .cols {
      width: 100%;
      text-align: center;
      margin-right: 100px;
      font-size: 300px;
    }
  }
  @media (max-width: 290px) {
    font-size: 33px;
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
    font-size: 10px;
  }
`;

const Menu = () => {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "8px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#f3f5f7", // 백그라운드
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      // background: "rgba(0, 0, 0, 0.3)",
    },
  };
  const dispatch = useDispatch();
  const { logInDone, logOutDone, loadUserInfomationDone } = useSelector(
    (state) => state.user
  );
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
        fontSize: "23px",
        color: "#6495ED",
        backgroundColor: "#f3f5f7",
        borderBottom: "1px solid #d9d9d9",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "100",
        height: "90px",
      }}
    >
      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />

      <MenuBar styles={styles}>
        <a
          id="home"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/allPostsBoard`);
          }}
          style={{
            color: "black",
          }}
        >
          <AiFillDribbbleCircle />
          모든 포스트
        </a>
        <br />
        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/me`);
          }}
          style={{
            color: "black",
          }}
        >
          <FaUserCircle /> 나
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/post`);
          }}
          style={{
            color: "black",
          }}
        >
          <AiFillEdit /> 내 포스트
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/timeline`);
          }}
          style={{
            color: "black",
          }}
        >
          <GiTimeBomb /> 타임라인
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/friend`);
          }}
          style={{
            color: "black",
          }}
        >
          <GoOrganization /> 친구
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/bookmark`);
          }}
          style={{
            color: "black",
          }}
        >
          <BsBookmarksFill /> 북마크
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/trash`);
          }}
          style={{
            color: "black",
          }}
        >
          <BsTrashFill /> 휴지통
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/activityChart`);
          }}
          style={{
            color: "black",
          }}
        >
          <AiOutlineLineChart /> 활동차트
        </a>

        <a
          id="about"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/setting`);
          }}
          style={{
            color: "black",
          }}
        >
          <AiFillSetting /> 설정
        </a>
        <br />

        <a
          className="menu-item--small"
          style={{
            color: "black",
          }}
          onClick={() => {
            setSearchModalShow(true);
          }}
        >
          <AiOutlineSearch /> 검색
        </a>
        <a
          className="menu-item--small"
          onClick={() => {
            dispatch({
              type: USER_LOGOUT_REQUEST,
            });
          }}
          style={{
            color: "black",
          }}
        >
          <AiOutlineLogout /> 로그아웃
        </a>
      </MenuBar>

      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Styledspan
          onClick={() => {
            Router.push(`${frontUrl}/me`);
          }}
        >
          interfree
        </Styledspan>
      </div>
    </div>
  );
};

export default Menu;
