//모든 포스트 페이지

import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import InfiniteScroll from "react-infinite-scroll-component";

import Title from "../components/layout/Title";
import PicturePostBox from "../components/post/PicturePostBox";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_ALL_PICTUREPOST_REQUEST } from "../reducers/post";
import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../reducers/user";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

const allPicturePostsBoard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { posts, loadAllPicturePostDone } = useSelector((state) => state.post);

  const LoadNextAllPosts = () => {
    const lastId = posts[posts.length - 1]?.id;

    if (posts.length === 0) {
      return;
    }

    dispatch({
      type: LOAD_ALLPOST_REQUEST,
      data: { lastId },
    });
  };

  console.log(posts[0].PostImgSrcs[0].src);

  return (
    <div>
      <div className="container justify-content-around">
        <SessionRow>
          <Col md={8}>
            <Title title={"사진 포스트"} />
            <Row
              style={{
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <Col
                style={{
                  backgroundColor: "#DCDCDC",
                  marginRight: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push(`${frontUrl}/allPicturePostsBoard/`);
                }}
              >
                최신
              </Col>
              <Col
                style={{
                  backgroundColor: "#DCDCDC",
                  marginRight: "5px",
                  borderBottom: "3px solid #4682B4",
                  cursor: "pointer",
                }}
              >
                사진
              </Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {loadAllPicturePostDone &&
                posts.map((element, index) => {
                  return (
                    <PicturePostBox
                      key={index}
                      postId={element.id}
                      img={element.PostImgSrcs[0].src}
                    />
                  );
                })}
            </div>
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
      type: CONFIRM_CURRENT_LOGIN_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_ALL_PICTUREPOST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default allPicturePostsBoard;
