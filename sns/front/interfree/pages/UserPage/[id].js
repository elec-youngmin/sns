import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import HorizontalNav from "../../components/layout/HorizontalNav";
import PostBoard from "../../components/post/PostBoard";
import PostBoardLoading from "../../components/loading/PostBoardLoading";
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
      <HorizontalNav />
      <div
        className="col-md-10 container justify-content-center"
        style={{
          marginTop: "20px",
          paddingTop: "75px",
        }}
      >
        <Container>
          <Row>
            <Col lg={4} md={5} sm={12}>
              <UserProfileCard
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
              />
            </Col>

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
                    UserId={element.UserId}
                    profileImg={
                      element.User.ProfileImgSrcs.length > 0
                        ? element.User.ProfileImgSrcs[0].src
                        : "userImage.jpg"
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
                    dataType={"posts"}
                  />
                ))}
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
      <PostBoardLoading />
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
