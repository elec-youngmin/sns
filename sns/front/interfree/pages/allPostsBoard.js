import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Menu from "../components/firstSeePage/Menu";
import LoadAllPostBoard from "../components/allPost/LoadAllPostBoard";
import UserProfileCard from "../components/allPost/UserProfileCard";
import PostBoardLoading from "../components/loading/PostBoardLoading";

import { useSelector } from "react-redux";
import { LOAD_ALLPOST_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { Tab, Row, Col, Nav } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const allPostsBoard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <Menu />
      <div
        className="col-md-10 container justify-content-around"
        style={{
          marginTop: "20px",
        }}
      >
        <Row style={{ paddingTop: "75px" }}>
          <Col lg={4} md={5} sm={12}>
            <UserProfileCard
              style={{ marginBottom: "20px" }}
              profileImg={
                user.ProfileImgSrcs.length === 0
                  ? "userImage.jpg"
                  : user.ProfileImgSrcs[0].src
              }
              nickname={user.nickname}
              introduce={user.introduce}
              postsCount={user.postsCount}
              followCount={user.followCount}
              followingCount={user.followingCount}
              shareLink={user.ShareLink}
              where={user.where}
            />
          </Col>

          <Col lg={8} md={7} sm={12}>
            <LoadAllPostBoard />
          </Col>
        </Row>
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
      type: LOAD_USER_INFOMATION_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_ALLPOST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default allPostsBoard;
