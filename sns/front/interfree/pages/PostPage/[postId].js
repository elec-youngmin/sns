import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Link from "next/Link";

import Menu from "../../components/firstSeePage/Menu";

import PostBoard from "../../components/post/PostBoard";
import PostBoardLoading from "../../components/loading/PostBoardLoading";

// import UserProfileCard from "../../components/allPost/UserProfileCard";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "react-bootstrap";

import { LOAD_POSTPAGE_REQUEST } from "../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../reducers/user";

import { END } from "redux-saga";
import wrapper from "../../store/configureStore";
import axios from "axios";

const PostPage = () => {
  const { postPage } = useSelector((state) => state.post);

  const router = useRouter();
  const dispatch = useDispatch();
  const { postId } = router.query; //쿼리에서 post id 추출

  useEffect(() => {
    dispatch({
      type: LOAD_POSTPAGE_REQUEST,
      data: postId,
    });
  }, []);

  return (
    <div>
      <Menu />
      <div
        className="col-md-7 container justify-content-center"
        style={{
          paddingTop: "80px",
        }}
      >
        <PostBoard
          post={postPage?.contents}
          postId={postPage?.id}
          userId={postPage?.UserId}
          profileImg={
            postPage?.User.ProfileImgSrcs.length > 0
              ? postPage?.User.ProfileImgSrcs.src
              : "userImage.jpg"
          }
          nickname={postPage?.User.nickname}
          like={postPage?.like} //포스트 좋아요 수
          Likes={
            postPage?.Likes.length > 0 ? postPage?.Likes.LikeUserId : false
          } //포스트 좋아요 했는지 확인
          reportCount={postPage?.Reports}
          PostImgSrcs={postPage?.PostImgSrcs}
          PostVideoSrcs={postPage?.PostVideoSrcs}
          bookmarkId={
            postPage?.Bookmarks.length > 0 ? postPage?.Bookmarks.UserId : false
          }
          date={postPage?.updatedAt}
          dataType={postPage}
        />
        <Button onClick={() => router.back()}>뒤로가기</Button>
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
