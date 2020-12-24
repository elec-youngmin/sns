import React, { useMemo } from "react";
import PropTypes from "prop-types";

import Title from "../components/layout/Title";
import LoadAllPostBoard from "../components/allPost/LoadAllPostBoard";
import UserProfileCard from "../components/allPost/UserProfileCard";

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
      <div className="container justify-content-around">
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
            <Title title={"모든 포스트"} />

            <LoadAllPostBoard />
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
