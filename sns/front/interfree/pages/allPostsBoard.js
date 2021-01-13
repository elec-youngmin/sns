//모든 포스트 페이지

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostBoard from "../components/post/PostBoard";
import Title from "../components/layout/Title";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_ALLPOST_REQUEST } from "../reducers/post";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../reducers/user";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const allPostsBoard = () => {
  const dispatch = useDispatch();
  const { posts, loadAllPostDone } = useSelector((state) => state.post);

  const LoadNextAllPosts = () => {
    const lastId = posts[posts.length - 1]?.id;

    if (posts.length === 0) {
      return;
    }

    dispatch({
      type: LOAD_ALLPOST_REQUEST,
      data: { lastId },
    });
  };

  return (
    <div>
      <div className="container justify-content-around">
        <SessionRow>
          <Col md={8}>
            <Title title={"모든 포스트"} />

            {/* <SessionDiv>
              <SessionTitle>Beta 버전 사용중</SessionTitle>
              <SessionP>
                Beta버전은 포트폴리오 제출용, 찾지 못한 에러를 피드백 받기 위한
                버전입니다.
              </SessionP>
              <SessionP>
                글 작성을 자유롭게 하되, Beta 기간이 끝나면 Beta 기간내 작성된
                모든 글과 가입된 계정이 삭제될 예정입니다.
              </SessionP>
              <SessionP>
                에러 피드백 메일 보내기 mintzerocode@gmail.com
              </SessionP>
            </SessionDiv> */}

            {loadAllPostDone && (
              <>
                <InfiniteScroll
                  dataLength={posts.length}
                  next={LoadNextAllPosts}
                  hasMore={true}
                  loader={
                    <h6 style={{ textAlign: "center" }}>
                      {posts.length}개의 포스트가 로드되었습니다.
                    </h6>
                  }
                >
                  {posts.map((element, index) => {
                    return (
                      <PostBoard
                        key={index}
                        userId={element.UserId}
                        nickname={element.User.nickname}
                        profileImg={
                          element.User.ProfileImgSrcs.length > 0
                            ? element.User.ProfileImgSrcs[0].src
                            : false
                        }
                        post={element.contents}
                        postId={element.id}
                        follows={element.Follows}
                        onlyReadMy={element.onlyReadMy}
                        reportCount={
                          element.Reports.length > 0
                            ? element.Reports[0].count
                            : 0
                        }
                        bookmarkId={
                          element.Bookmarks.length > 0
                            ? element.Bookmarks[0].UserId
                            : 0
                        }
                        like={element.like}
                        Likes={
                          element.Likes.length > 0
                            ? element.Likes[0].LikeUserId
                            : false
                        }
                        PostImgSrcs={element.PostImgSrcs}
                        PostVideoSrcs={element.PostVideoSrcs}
                        date={element.createdAt}
                      />
                    );
                  })}
                </InfiniteScroll>
              </>
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
      type: CONFIRM_CURRENT_LOGIN_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_ALLPOST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default allPostsBoard;
