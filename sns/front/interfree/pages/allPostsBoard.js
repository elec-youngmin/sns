//모든 포스트 페이지

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostBoard from "../components/post/PostBoard";
import Title from "../components/layout/Title";
import VerticalNav from "../components/layout/VerticalNav";

import {

  SessionGrid,
  Div,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_ALLPOST_REQUEST } from "../reducers/post";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../reducers/user";


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


        <SessionGrid>
          <Div>
            <Title title={"모든 포스트"} />
          </Div>


          <Div>
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
          </Div>
          <Div>
            <VerticalNav />
          </Div>
        </SessionGrid>
      </div>
    </div >
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
