import React, { useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-tabs/style/react-tabs.css";

import AlertTab from "../components/layout/AlertTab";
import Title from "../components/layout/Title";
import PostBoard from "../components/post/PostBoard";
import PagingPost from "../components/post/PagingPost";
import WritePostModal from "../components/FloatingButton/WritePostModal";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionInput,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

import { Col } from "react-bootstrap";

import { AiFillEdit } from "react-icons/ai";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const post = () => {
  const { user } = useSelector((state) => state.user);
  const { posts, loadPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [writePostShow, setWritePostShow] = useState(false);

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
    <div style={{ marginBottom: "50px" }}>
      <WritePostModal
        show={writePostShow}
        onHide={() => setWritePostShow(false)}
      />

      <div className="container justify-content-center">
        <SessionRow>
          <Col md={7}>
            <Title title={"포스트"} />

            <SessionDiv>
              <SessionTitle>
                <AiFillEdit />
                포스트 작성
              </SessionTitle>
              <SessionP>포스트를 올려 좋아요를 받아보세요.</SessionP>
              <SessionInput
                placeholder="포스트를 작성하세요..."
                onClick={(e) => {
                  e.preventDefault();
                  setWritePostShow(true);
                }}
              />
            </SessionDiv>

            <Title title={"작성한 포스트 목록"} />

            {loadPostDone || posts.length > 0 ? (
              <InfiniteScroll
                dataLength={posts.length}
                next={LoadNextPosts}
                hasMore={true}
                loader={
                  <h6 style={{ textAlign: "center", marginTop: "15px" }}>
                    {posts.length}개의 포스트가 로드되었습니다.
                  </h6>
                }
              >
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
                    like={element.like}
                    Likes={
                      element.Likes.length > 0
                        ? element.Likes[0].LikeUserId
                        : false
                    }
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
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <AlertTab
                title={"아직 작성된 포스트가 없어요."}
                content={"첫번째 포스트를 작성해 보세요."}
              />
            )}
          </Col>
        </SessionRow>
      </div>
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
