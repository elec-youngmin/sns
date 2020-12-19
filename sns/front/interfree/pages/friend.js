import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import HorizontalNav from "../components/layout/HorizontalNav";

import FollowAlert from "../components/follow/FollowAlert";
import FollowPage from "../components/follow/FollowPage";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import BottomTabs from "../components/layout/BottomTabs";
import SearchFriendModal from "../components/follow/SearchFriendModal";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_FOLLOWS_POST_REQUEST } from "../reducers/post";

import { BsPlusCircle } from "react-icons/bs";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const friend = () => {
  const { user } = useSelector((state) => state.user);

  const { followPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [SearchFriendModalShow, setSearchFriendModalShow] = useState(false);

  return (
    <div style={{ paddingTop: "100px" }}>
      <HorizontalNav />
      <BottomTabs />
      <SearchFriendModal
        show={SearchFriendModalShow}
        onHide={() => setSearchFriendModalShow(false)}
      />

      <div className="container justify-content-center">
        <Row>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={9}>
            {followPosts.length === 0 && <FollowAlert />}
            <Row
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "5px",
                boxShadow: "1px 1px 3px 3px #ccc",
                backgroundColor: "white",
                margin: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setSearchFriendModalShow(true);
              }}
            >
              <Col
                md={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsPlusCircle size={30} />
              </Col>
              <Col md={9}>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  친구 검색
                </p>
                친구를 검색해 팔로우 하세요.
              </Col>
            </Row>
          </Col>

          <PostBoardLoading />
          <FollowPage />
        </Row>
      </div>

      <FloatingButton />
      <ScrollButton />
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
    context.store.dispatch({
      type: LOAD_FOLLOWS_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default friend;
