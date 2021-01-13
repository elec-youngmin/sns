import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Title from "../components/layout/Title";
import NeedLoginAlert from "../components/login/NeedLoginAlert";
import AlertTab from "../components/layout/AlertTab";
import PostBoard from "../components/post/PostBoard";

import { SessionRow } from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_BOOKMARK_REQUEST } from "../reducers/post";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const bookmark = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const LoadNextbookmarkPosts = () => {
    const lastId = posts[posts.length - 1].id;

    if (posts.length === 0) {
      return;
    }

    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
      data: { lastId },
    });
  };
  return (
    <div>
      <>
        {user.id === "guest" ? (
          <NeedLoginAlert />
        ) : (
          <div className="container justify-content-center">
            <SessionRow>
              <Col md={7}>
                <Title title={"북마크"} />
                {posts.length === 0 ? (
                  <AlertTab
                    title={"북마크 한 포스트가 없습니다."}
                    content={"마음에 드는 포스트를 북마크 해보세요."}
                  />
                ) : (
                  <InfiniteScroll
                    dataLength={posts.length}
                    next={LoadNextbookmarkPosts}
                    hasMore={true}
                    loader={
                      <h4 style={{ textAlign: "center" }}>
                        {posts.length}개의 포스트가 로드되었습니다.
                      </h4>
                    }
                  >
                    {posts.map((element, index) => (
                      <PostBoard
                        key={index}
                        post={element.contents}
                        postId={element.id}
                        userId={element.UserId}
                        follows={element.Follows}
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
                        date={element.updatedAt}
                      />
                    ))}
                  </InfiniteScroll>
                )}
              </Col>
            </SessionRow>
          </div>
        )}
      </>
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
