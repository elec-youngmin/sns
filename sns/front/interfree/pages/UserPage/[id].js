import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { SessionRow } from "../../styledComponents/layout/Session";

import { Row, Col, Container } from "react-bootstrap";

import {
  LOAD_USERPAGE_REQUEST,
  LOAD_USERPAGE_INFO_REQUEST,
} from "../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../reducers/user";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

import { backUrl } from "../../config/config";

const UserPage = () => {
  const {
    posts,
    userPageInfo,
    loadUserInfomationDone,
    loadUserPageDone,
  } = useSelector((state) => state.post);

  // const LoadNextPosts = () => {
  //   const lastId = posts[posts.length - 1]?.id;
  //   dispatch({
  //     type: LOAD_USERPAGE_REQUEST,
  //     data: { lastId, userId: user.id },
  //   });
  // };
  return (
    <div>
      <div className="container justify-content-center">
        <SessionRow>
          <Col md={7}>
            <Title title={"유저 페이지"} />

            {loadUserInfomationDone && (
              <>
                <Container
                  style={{
                    border: "1px solid #F0FFFF",
                    borderRadius: "20px",
                    boxShadow: "1px 1px 2px 2px #ccc",
                    backgroundColor: "white",
                    margin: "20px 0px",
                    textAlign: "center",
                  }}
                >
                  <Row
                    style={{
                      margin: "10px 0px 0px 0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {userPageInfo?.userInfo?.src ? (
                      <img
                        src={`${backUrl}/${userPageInfo.userInfo.src}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "10px",
                          borderRadius: "50%",
                        }}
                        onClick={() => {
                          router.push(`${frontUrl}/UserPage/${userId}/`);
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#DCDCDC",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "19px",
                          borderRadius: "50%",
                        }}
                      >
                        <p style={{ fontSize: "25px", fontWeight: "600" }}>
                          {userPageInfo?.userInfo.nickname[0].toUpperCase()}
                        </p>
                      </div>
                    )}
                  </Row>
                  <p style={{ fontSize: "20px" }}>
                    {userPageInfo?.userInfo.nickname}
                  </p>
                  <p>{userPageInfo?.userInfo.introduce}</p>
                  <Row
                    style={{
                      marginBottom: "10px",
                      fontSize: "20px",
                    }}
                  >
                    <Col
                      style={{
                        boxSizing: "content-box",
                        border: "3px solid #F5FFFA",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      포스트:{userPageInfo?.postsCount}
                    </Col>
                    <Col
                      style={{
                        boxSizing: "content-box",
                        border: "3px solid #F5FFFA",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      팔로워:{userPageInfo?.followCount}
                    </Col>
                    <Col
                      style={{
                        boxSizing: "content-box",
                        border: "3px solid #F5FFFA",
                        textAlign: "center",
                        padding: "0px",
                      }}
                    >
                      팔로우:{userPageInfo?.followingCount}
                    </Col>
                  </Row>
                  <p style={{ fontSize: "20px" }}>
                    링크:
                    {userPageInfo?.userInfo.ShareLink
                      ? userPageInfo?.userInfo.ShareLink
                      : "게재되지 않음"}
                  </p>
                  <p style={{ fontSize: "20px" }}>
                    사는 곳:
                    {userPageInfo?.userInfo.ShareLink
                      ? userPageInfo?.userInfo.ShareLink
                      : "게재되지 않음"}
                  </p>
                </Container>{" "}
              </>
            )}

            {/* 유저 카드 끝 */}

            {loadUserPageDone && (
              <>
                <InfiniteScroll
                  dataLength={posts.length}
                  // next={LoadNextPosts}
                  hasMore={true}
                  loader={
                    <h6 style={{ textAlign: "center" }}>
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
                      follows={element.Follows}
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
      type: LOAD_USERPAGE_REQUEST,
      data: { id: context.params.id },
    });
    context.store.dispatch({
      type: LOAD_USERPAGE_INFO_REQUEST,
      data: context.params.id,
    });
    // context.store.dispatch({
    //   type: LOAD_USER_INFOMATION_REQUEST,
    // });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default UserPage;
