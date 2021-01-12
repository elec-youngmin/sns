//포스트보드에서 해시태그를 누르면 라우팅되는 해시태그 페이지

import React from "react";
import { useRouter } from "next/router";

import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { useSelector } from "react-redux";

import { LOAD_HASHTAGPAGE_REQUEST } from "../../reducers/post";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../../reducers/user";

import { SessionRow } from "../../styledComponents/layout/Session";

import { Col, Button } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const HashtagPage = () => {
  const router = useRouter();
  const { Posts } = useSelector((state) => state?.post?.posts);

  return (
    <div className="container justify-content-center">
      <SessionRow>
        <Col md={7}>
          <Title title={"해시태그 페이지"} />

          {Posts?.length > 0 &&
            Posts.map((element, index) => (
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
                  element.Likes.length > 0 ? element.Likes[0].LikeUserId : false
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
          <Button onClick={() => router.back()}>뒤로가기</Button>
        </Col>
      </SessionRow>
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
      type: LOAD_HASHTAGPAGE_REQUEST,
      data: { tag: context.params.tag },
    });
    context.store.dispatch({
      type: CONFIRM_CURRENT_LOGIN_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default HashtagPage;
