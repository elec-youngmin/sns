import React from "react";

import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { useDispatch, useSelector } from "react-redux";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../../reducers/user";
import { SEARCH_RESULT_REQUEST } from "../../reducers/post";

import { SessionRow } from "../../styledComponents/layout/Session";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const searchResult = () => {
  const { posts, searchResultDone } = useSelector((state) => state.post);

  return (
    <div>
      {searchResultDone && (
        <>
          <div className="container justify-content-center">
            <SessionRow>
              <Col md={7}>
                <Title title={"검색 결과"} />

                {posts.length > 0 ? (
                  posts.map((element, index) => (
                    <PostBoard
                      key={index}
                      post={element.contents}
                      postId={element.id}
                      userId={element.UserId}
                      follows={element?.Follows}
                      profileImg={
                        element?.User?.ProfileImgSrcs?.length > 0
                          ? element?.User?.ProfileImgSrcs[0].src
                          : false
                      }
                      nickname={element?.User.nickname}
                      like={element?.like}
                      Likes={
                        element?.Likes.length > 0
                          ? element?.Likes[0].LikeUserId
                          : false
                      }
                      reportCount={element?.Reports}
                      PostImgSrcs={element?.PostImgSrcs}
                      PostVideoSrcs={element?.PostVideoSrcs}
                      onlyReadMy={element?.onlyReadMy}
                      bookmarkId={
                        element?.Bookmarks.length > 0
                          ? element?.Bookmarks[0].UserId
                          : false
                      }
                      date={element.updatedAt}
                    />
                  ))
                ) : (
                  <p style={{ fontSize: "20px" }}>검색 결과가 없습니다.</p>
                )}
              </Col>
            </SessionRow>
          </div>
        </>
      )}
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
      type: SEARCH_RESULT_REQUEST,
      data: context.params.searchResult,
    });
    context.store.dispatch({
      type: CONFIRM_CURRENT_LOGIN_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default searchResult;
