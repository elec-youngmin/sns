import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useRouter } from "next/router";

import Title from "../../components/layout/Title";
import PostBoard from "../../components/post/PostBoard";

import { useSelector, useDispatch } from "react-redux";

import { Button, Row, Col } from "react-bootstrap";

import { LOAD_POSTPAGE_REQUEST } from "../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../reducers/user";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const PostPage = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const router = useRouter();
  const { postId } = router.query; //쿼리에서 post id 추출

  useEffect(() => {
    dispatch({
      type: LOAD_POSTPAGE_REQUEST,
      data: postId,
    });
  }, [postId]);

  return (
    <div>
      <div className="container justify-content-center">
        <Row
          style={{
            paddingTop: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px auto",
          }}
        >
          <Col md={7}>
            <Title title={"포스트 페이지"} />

            {posts.map((element) => {
              return (
                <PostBoard
                  post={element?.contents}
                  postId={element?.id}
                  userId={element?.UserId}
                  profileImg={
                    element?.User.ProfileImgSrcs.length > 0
                      ? element?.User.ProfileImgSrcs.src
                      : false
                  }
                  nickname={element?.User.nickname}
                  like={element?.like} //포스트 좋아요 수
                  follows={element.Follows}
                  Likes={
                    element?.Likes.length > 0
                      ? element?.Likes[0].LikeUserId
                      : false
                  } //포스트 좋아요 했는지 확인
                  reportCount={element?.Reports}
                  PostImgSrcs={element?.PostImgSrcs}
                  PostVideoSrcs={element?.PostVideoSrcs}
                  bookmarkId={
                    element?.Bookmarks.length > 0
                      ? element?.Bookmarks[0].UserId
                      : false
                  }
                  date={element?.updatedAt}
                />
              );
            })}
            <Button onClick={() => router.back()}>뒤로가기</Button>
          </Col>
        </Row>
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
      type: LOAD_POSTPAGE_REQUEST,
      data: context.params.postId,
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default PostPage;
