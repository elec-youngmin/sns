import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Avatar from "react-avatar";
import Router from "next/router";

import HorizontalNav from "../components/layout/HorizontalNav";

import NonePostAlert from "../components/post/NonePostAlert";
import PostBoard from "../components/post/PostBoard";

import PostBoardLoading from "../components/loading/PostBoardLoading";
import PreviewProfileModal from "../components/post/PreviewProfileModal";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import BottomTabs from "../components/layout/BottomTabs";
import MyProfile from "../components/layout/MyProfile";
import WritePostModal from "../components/FloatingButton/WritePostModal";
import AddTimelineModal from "../components/timeline/AddTimelineModal";
import AddTimelineTitleModal from "../components/timeline/AddTimelineContentsModal";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

import { Row, Col, Tabs, TabContainer, Button, Nav } from "react-bootstrap";

import { AiFillEdit } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const home = () => {
  const { user } = useSelector((state) => state.user);
  const { loadPostDone } = useSelector((state) => state.post);

  const { posts, loadOneuserChartdataDone } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [writePostShow, setWritePostShow] = useState(false);
  const [timelineModalShow, setTimelineModalShow] = useState(false);
  const [timelineModalTitleShow, setTimelineTitleModalShow] = useState(false);

  const [timelineModalShowCounter, setTimelineModalShowCounter] = useState(
    false
  );

  // useMemo(() => {
  //   if (timelineModalShowCounter === true) {
  //     setTimelineModalShow(false);
  //   }
  // }, [timelineModalShow]);
  return (
    <div>
      <AddTimelineModal
        show={timelineModalShow}
        onHide={() => setTimelineModalShow(false)}
      />
      <AddTimelineTitleModal
        show={timelineModalTitleShow}
        onHide={() => setTimelineTitleModalShow(false)}
      />

      <HorizontalNav />
      <BottomTabs />
      <PreviewProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // toggle={}
      />
      <div className="container justify-content-center">
        <Row style={{ paddingTop: "95px" }}>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={8}>
            <MyProfile />
            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "5px",
                boxShadow: "1px 1px 3px 3px #ccc",
                backgroundColor: "white",
                margin: "20px",
                textAlign: "center",
              }}
            >
              <label>
                <AiFillEdit />
              </label>
              <input
                placeholder="포스트를 작성하세요..."
                style={{
                  border: "none",
                  borderBottom: "3px solid black",
                  borderRadius: "5px",
                  width: "80%",
                  height: "50px",
                  margin: "10px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setWritePostShow(true);
                }}
              ></input>
            </div>
            {/* 타임라인 div */}
            <div
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
                setTimelineModalShow(true);
              }}
            >
              <Row>
                <Col
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BsPlusCircle size={30} />
                </Col>
                <Col>
                  <p style={{ fontWeight: "700" }}>타임아웃 만들기</p>
                  주제를 정하고 타임라인을 만들어 보세요.
                </Col>
              </Row>
            </div>
            <AiFillEdit /> <p>최근 포스트 10개</p>
            {posts.map((element, index) => (
              <PostBoard
                key={index}
                post={element.contents}
                postId={element.id}
                userId={element.UserId}
                profileImg={
                  element.User.ProfileImgSrcs.length > 0
                    ? element.User.ProfileImgSrcs[0].src
                    : false
                }
                nickname={element.User.nickname}
                like={element.like} //포스트 좋아요 수
                Likes={
                  element.Likes.length > 0 ? element.Likes[0].LikeUserId : false
                } //포스트 좋아요 했는지 확인
                reportCount={element.Reports}
                PostImgSrcs={element.PostImgSrcs}
                PostVideoSrcs={element.PostVideoSrcs}
                onlyReadMy={element.onlyReadMy}
                bookmarkId={
                  element.Bookmarks.length > 0
                    ? element.Bookmarks[0].UserId
                    : false
                }
                date={element.createdAt}
                dataType={"posts"}
                style={{
                  marginTop: "20px",
                }}
              />
            ))}
          </Col>

          <PostBoardLoading />
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
      type: LOAD_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default home;
