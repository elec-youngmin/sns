import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import Menu from "../components/firstSeePage/Menu";

import FollowAlert from "../components/follow/FollowAlert";
import FollowPage from "../components/follow/FollowPage";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_FOLLOWS_POST_REQUEST } from "../reducers/post";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const friend = () => {
  const { user } = useSelector((state) => state.user);

  const { followPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Menu />

      <div
        className="col-md-8 container justify-content-center"
        style={{ backgroundColor: "#EFF2F5", paddingTop: "75px" }}
      >
        <Row>
          <Col md={5}></Col>
        </Row>
      </div>
      <div className="container justify-content-center">
        <Row>
          <Col md={3}>
            <VerticalNav />
          </Col>
          <Col md={7}>{followPosts.length === 0 && <FollowAlert />}</Col>
          <PostBoardLoading />
          <FollowPage />
        </Row>
      </div>

      <FloatingButton />
      <ScrollButton />
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
      type: LOAD_FOLLOWS_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default friend;
