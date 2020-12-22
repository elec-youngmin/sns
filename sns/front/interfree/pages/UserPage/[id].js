import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import PostBoard from "../../components/post/PostBoard";
import UserProfileCard from "../../components/allPost/UserProfileCard";

import {
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Container,
} from "react-bootstrap";

import { LOAD_USERPAGE_REQUEST } from "../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../reducers/user";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

import { backUrl } from "../../config/config";

const UserPage = () => {
  const dispatch = useDispatch();
  const { user, following, logInDone } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  // const LoadNextPosts = () => {
  //   const lastId = posts[posts.length - 1]?.id;
  //   dispatch({
  //     type: LOAD_USERPAGE_REQUEST,
  //     data: { lastId, userId: user.id },
  //   });
  // };
  return (
    <div>
      <div
        className="col-md-10 container justify-content-center"
        style={{
          marginTop: "20px",
          paddingTop: "75px",
        }}
      >
        <Container>
          <Row>
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
                  marginTop: "10px",
                }}
              >
                <img
                  src={`${backUrl}/${e.src}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "0px auto",
                  }}
                />
              </Row>
              <p style={{ fontSize: "20px" }}>{e.nickname}</p>
              <p>{e.introduce}</p>
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
                  포스트:{e.postsCount}
                </Col>
                <Col
                  style={{
                    boxSizing: "content-box",
                    border: "3px solid #F5FFFA",
                    textAlign: "center",
                    padding: "0px",
                  }}
                >
                  팔로워:{e.followCount}
                </Col>
                <Col
                  style={{
                    boxSizing: "content-box",
                    border: "3px solid #F5FFFA",
                    textAlign: "center",
                    padding: "0px",
                  }}
                >
                  팔로우:{e.followingCount}
                </Col>
              </Row>
              <p style={{ fontSize: "20px" }}>링크:{e.ShareLink}</p>
              <p style={{ fontSize: "20px" }}>사는 곳:{e.ShareLink}</p>
            </Container>

            {/* <UserProfileCard
              profileImg={
                posts[0]?.User.ProfileImgSrcs.length === 0
                  ? "userImage.jpg"
                  : posts[0]?.User.ProfileImgSrcs[0].src
              }
              nickname={posts[0]?.User.nickname}
              introduce={posts[0]?.User.introduce}
              postsCount={posts[0]?.User.postsCount}
              followCount={posts[0]?.User.followCount}
              followingCount={posts[0]?.User.followingCount}
              shareLink={posts[0]?.User.ShareLink}
              where={posts[0]?.User.where}
            /> */}

            <Col lg={8} md={7} sm={12}>
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
                        : "userImage.jpg"
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
            </Col>
          </Row>
        </Container>
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
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default UserPage;
