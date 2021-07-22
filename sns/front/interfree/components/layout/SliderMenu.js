import React, { useState, useMemo } from "react";

import { Container, Div } from "../../styledComponents/layout/SliderMenu";
import SearchModal from "./SearchModal";
import Login from "../login/Login";

import Router from "next/router";

import { useDispatch } from "react-redux";

import { USER_LOGOUT_REQUEST } from "../../reducers/user";

import { Button } from "react-bootstrap";

import { frontUrl } from "../../config/config";

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


const SliderMenu = ({ id }) => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [menubarShow, setMenubarShow] = useState(false);
  const [searchModalShow, setSearchModalShow] = useState(false);

  const dispatch = useDispatch();


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
    <>
      <Container>
        <SearchModal
          show={searchModalShow}
          onHide={() => setSearchModalShow(false)}
        />

        <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />

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

        <Div onClick={() => {
          Router.push(`${frontUrl}/allPostsBoard`);
          setMenubarShow(true);
        }}>
          <AiFillDribbbleCircle />
          모든 글</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/me`);
          setMenubarShow(true);
        }}>
          <FaUserCircle />
        마이페이지</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/post`);
          setMenubarShow(true);
        }}> <AiFillEdit />내가 쓴글</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/timeline`);
          setMenubarShow(true);
        }}><GiTimeBomb />타임라인</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/friend`);
          setMenubarShow(true);
        }}><GoOrganization />친구</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/bookmark`);
          setMenubarShow(true);
        }}> <BsBookmarksFill /> 북마크</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/trash`);
          setMenubarShow(true);
        }}> <BsTrashFill />휴지통</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/activityChart`);
          setMenubarShow(true);
        }}> <AiOutlineLineChart />활동차트</Div>

        <Div onClick={() => {
          Router.push(`${frontUrl}/setting`);
          setMenubarShow(true);
        }}><AiFillSetting /> 설정</Div>

        <Div onClick={() => {
          setSearchModalShow(true);
          setMenubarShow(true);
        }}> <AiOutlineSearch />검색</Div>

      </Container>
    </>
  );
};

export default SliderMenu;
