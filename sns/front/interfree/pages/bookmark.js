import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import HorizontalNav from "../components/layout/HorizontalNav";

import PostBoardLoading from "../components/loading/PostBoardLoading";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import VerticalNav from "../components/layout/VerticalNav";
import BottomTabs from "../components/layout/BottomTabs";
import PostBoard from "../components/post/PostBoard";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_BOOKMARK_REQUEST } from "../reducers/post";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const bookmark = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const LoadNextbookmarkPosts = () => {
    const lastId = posts[posts.length - 1]?.id;
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
      data: { lastId, userId: user.id },
    });
  };
  return (
    <div>
      <HorizontalNav />
      <BottomTabs />
      <div className="container justify-content-center">
        <Row>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={8} style={{ padding: "100px" }}>
            {posts.length > 0 &&
              posts.map((element, index) => (
                <PostBoard
                  key={index}
                  post={element.contents}
                  postId={element.id}
                  userId={element.UserId}
                  profileImg={
                    element.User.ProfileImgSrcs.length > 0
                      ? element.User.ProfileImgSrcs[0].src
                      : "userImage.jpg"
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
                  date={element.updatedAt}
                />
              ))}
          </Col>
        </Row>
      </div>

      <PostBoardLoading />
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
      type: LOAD_BOOKMARK_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default bookmark;
