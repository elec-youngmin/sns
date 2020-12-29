import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { slide as MenuBar } from "react-burger-menu";

import SearchModal from "./SearchModal";
import Login from "../firstSeePage/Login";

import {
  MobileContainer,
  MobileLink,
  Logo,
  LogoContainer,
} from "../../styledComponents/layout/HorizontalNav";

import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import { AiFillSetting, AiFillEdit } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import { GiTimeBomb } from "react-icons/gi";

import { BsTrashFill, BsBookmarksFill } from "react-icons/bs";

import {
  AiFillDribbbleCircle,
  AiOutlineLineChart,
  AiOutlineSearch,
} from "react-icons/ai";

import { FaUserCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";

import { frontUrl } from "../../config/config";

const Menu = () => {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "8px",
      top: "20px",
    },
    bmBurgerBars: {
      background: "#1E90FF",
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
      padding: "15px 0em 0",
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
  const { id } = useSelector((state) => state.user.user);

  const [searchModalShow, setSearchModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const [menubarShow, setMenubarShow] = useState(false);

  useMemo(() => {
    if (logInDone) {
      setMenubarShow(false);
    }
  }, [logInDone]);

  useMemo(() => {
    if (logOutDone) {
      Router.push(`${frontUrl}`);
    }
  }, [logOutDone]);

  useMemo(() => {
    Router.events.on("routeChangeStart", () => {
      setMenubarShow(false);
    });
    Router.events.on("routeChangeComplete", () => {
      setMenubarShow(false);
    });

    Router.events.on("routeChangeError", () => {
      setMenubarShow(false);
    });
  }, [Router]);

  return (
    <MobileContainer>
      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />

      <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />

      <MenuBar styles={styles} isOpen={menubarShow}>
        <a>
          {id === "guest" ? (
            <>
              <Button
                onClick={() => {
                  setLoginModalShow(true);
                  setMenubarShow(true);
                }}
              >
                계정 활동
              </Button>
            </>
          ) : (
            <>
              <Button
                className="float-right"
                onClick={() => {
                  dispatch({
                    type: USER_LOGOUT_REQUEST,
                  });
                  setMenubarShow(true);
                }}
              >
                로그아웃
              </Button>
            </>
          )}
        </a>
        <br />

        <MobileLink
          id="home"
          className="menu-item"
          onClick={() => {
            Router.push(`${frontUrl}/allPostsBoard`);
            setMenubarShow(true);
          }}
        >
          <AiFillDribbbleCircle />
          모든 포스트
        </MobileLink>
        <br />
        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/me`);
            setMenubarShow(true);
          }}
        >
          <FaUserCircle /> 나
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/post`);
            setMenubarShow(true);
          }}
        >
          <AiFillEdit /> 내 포스트
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/timeline`);
            setMenubarShow(true);
          }}
        >
          <GiTimeBomb /> 타임라인
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/friend`);
            setMenubarShow(true);
          }}
        >
          <GoOrganization /> 친구
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/bookmark`);
            setMenubarShow(true);
          }}
        >
          <BsBookmarksFill /> 북마크
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/trash`);
            setMenubarShow(true);
          }}
        >
          <BsTrashFill /> 휴지통
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/activityChart`);
            setMenubarShow(true);
          }}
        >
          <AiOutlineLineChart /> 활동차트
        </MobileLink>
        <br />

        <MobileLink
          id="about"
          className="menu-item"
          onClick={() => {
            if (id === "guest") {
              return alert("로그인 후 이용하실 수 있어요.");
            }
            Router.push(`${frontUrl}/setting`);
            setMenubarShow(true);
          }}
        >
          <AiFillSetting /> 설정
        </MobileLink>
        <br />

        <MobileLink
          className="menu-item--small"
          onClick={() => {
            setSearchModalShow(true);
            setMenubarShow(true);
          }}
        >
          <AiOutlineSearch /> 검색
        </MobileLink>
      </MenuBar>

      <LogoContainer>
        <Logo
          onClick={() => {
            Router.push(`${frontUrl}/allPostsBoard`);
          }}
        >
          interfree
        </Logo>
      </LogoContainer>
    </MobileContainer>
  );
};

export default Menu;
