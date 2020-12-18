import React from "react";

import HorizontalNav from "../components/layout/HorizontalNav";
import BottomTabs from "../components/layout/BottomTabs";
import VerticalNav from "../components/layout/VerticalNav";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import TimelineSubjectDiv from "../components/timeline/TimelineSubjectDiv";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_TIMELINE_SUBJECT_REQUEST } from "../reducers/post";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { FcTimeline } from "react-icons/fc";

import { BsPlusCircle } from "react-icons/bs";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const timelineSubjectDiv = ({ subject }) => {
  return <div></div>;
};

const timeline = () => {
  const { timelineSubjects } = useSelector((state) => state.post);
  return (
    <div>
      <HorizontalNav />
      <BottomTabs />
      <PostBoardLoading />

      <Row>
        <Col md={2}></Col>
        <VerticalNav />

        <Col md={10} style={{ padding: "95px" }}>
          <Row
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "5px",
              boxShadow: "1px 1px 3px 3px #ccc",
              backgroundColor: "white",
              margin: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Col
              md={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BsPlusCircle size={30} />
            </Col>
            <Col md={9}>
              <p style={{ fontWeight: "700" }}>타임아웃 만들기</p>
              주제를 정하고 타임라인을 만들어 보세요.
            </Col>
          </Row>
          <div
            style={{
              // boxShadow: "1px 1px 3px 3px #F8F8FF",
              borderRadius: "12px",
              border: "1px solid #131354",
              backgroundColor: "white",
              margin: "20px",
              // textAlign: "center",
              cursor: "pointer",
            }}
          >
            <FcTimeline />
            작성한 타임라인 리스트
          </div>
          {timelineSubjects.map((element) => {
            console.log(element.subject);
            return (
              <TimelineSubjectDiv
                id={element.id}
                subject={element.subject}
                createdAt={element.createdAt}
              />
            );
          })}
        </Col>
      </Row>
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
      type: LOAD_TIMELINE_SUBJECT_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default timeline;
