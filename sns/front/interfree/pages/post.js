import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import * as Scroll from "react-scroll";

import Menu from "../components/firstSeePage/Menu";
import PostBoard from "../components/post/PostBoard";
import NonePostAlert from "../components/post/NonePostAlert";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import PreviewProfileModal from "../components/post/PreviewProfileModal";
import VerticalNav from "../components/layout/VerticalNav";
import myProfile from "../components/layout/myProfile";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import ScrollButton from "../components/layout/ScrollButton";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

import { Row, Col, Button, Nav } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const post = () => {
  const scroll = Scroll.animateScroll;
  const { user } = useSelector((state) => state.user);
  const { loadPostDone } = useSelector((state) => state.post);

  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const LoadNextPosts = () => {
    const lastId = posts[posts.length - 1]?.id;
    if (posts.length === 0) {
      return;
    }
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { lastId, userId: user.id },
    });
  };

  return (
    <div>
      <Menu />
      <PreviewProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div
        className="col-md-8 container justify-content-center"
        style={{ backgroundColor: "#EFF2F5", paddingTop: "75px" }}
      >
        <Row>
          <myProfile />
        </Row>
      </div>
      <div className="container justify-content-center">
        <Row>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={7}>
            {posts.length <= 0 && loadPostDone && <NonePostAlert />}
            {/* <WritePostForm /> */}

            <InfiniteScroll
              dataLength={posts.length}
              next={LoadNextPosts}
              hasMore={true}
              loader={
                <h6 style={{ textAlign: "center" }}>
                  {posts.length}개의 포스트가 로드되었습니다.
                </h6>
              }
            >
              {/* 유저의 모든 포스트 */}
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
                    element.Likes.length > 0
                      ? element.Likes[0].LikeUserId
                      : false
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
                />
              ))}
            </InfiniteScroll>
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

export default post;
