//유저 페이지

import React from "react";
import { useRouter } from "next/router";

import ProfileCard from "../../components/profile/ProfileCard";
import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { SessionRow } from "../../styledComponents/layout/Session";

import { useSelector } from "react-redux";

import {
  LOAD_USERPAGE_REQUEST,
  LOAD_USERPAGE_INFO_REQUEST,
} from "../../reducers/post";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../../reducers/user";

import { Col, Button } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const UserPage = () => {
  const router = useRouter();

  const {
    posts,
    userPageInfo,
    loadUserPageInfoDone,
    loadUserPageDone,
  } = useSelector((state) => state.post);

  return (
    <div>
      <div className="container justify-content-center">
        <SessionRow>
          <Col md={7}>
            <Title title={"유저 페이지"} />

            {loadUserPageInfoDone && (
              <ProfileCard
                profileImgSrc={
                  userPageInfo.userInfo.src ? userPageInfo.userInfo.src : false
                }
                nickname={userPageInfo.userInfo.nickname}
                introduce={userPageInfo.userInfo.introduce}
                postsCount={userPageInfo.postsCount}
                followCount={userPageInfo.followCount}
                followingCount={userPageInfo.followingCount}
                shareLink={userPageInfo.userInfo.ShareLink}
                where={userPageInfo.userInfo.where}
              />
            )}

            {loadUserPageDone ? (
              <>
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
              </>
            ) : (
              <h3>게재된 포스트가 없습니다.</h3>
            )}

            <Button onClick={() => router.back()}>뒤로가기</Button>
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

    context.store.dispatch({
      type: CONFIRM_CURRENT_LOGIN_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default UserPage;
