import React, { useState } from "react";
import Router from "next/router";

import TimelineSubjectDiv from "../components/timeline/TimelineSubjectDiv";
import AddTimelineContentsModal from "../components/timeline/AddTimelineContentsModal";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_TIMELINE_SUBJECT_REQUEST } from "../reducers/post";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import { GiTimeBomb } from "react-icons/gi";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

const timeline = () => {
  const [timelineModalShow, setTimelineModalShow] = useState(false);
  const { timelineSubjects } = useSelector((state) => state.post);
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <AddTimelineContentsModal
        show={timelineModalShow}
        onHide={() => {
          setTimelineModalShow(false);
        }}
      />
      <div className="container justify-content-center">
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "105px",
          }}
        >
          <Col md={7}>
            <div
              style={{
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "45px",
                  margin: "20px 0px",
                }}
              >
                타임라인
              </p>
            </div>
            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  fontSize: "25px",
                  width: "100%",
                }}
              >
                <GiTimeBomb />
                타임아웃 만들기
              </p>

              <p
                style={{
                  marginBottom: "0px",
                  fontWeight: "600",
                }}
              >
                주제를 정하고 타임라인을 만들어 보세요.
              </p>
              <br />
              <Button
                onClick={() => {
                  Router.push(`${frontUrl}/exampleTimeline/`);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                타임라인 예
              </Button>
              <br />
              <Button
                onClick={() => {
                  setTimelineModalShow(true);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                타임라인 추가
              </Button>
            </div>
            <div
              style={{
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "45px",
                  margin: "20px 0px",
                }}
              >
                작성한 타임라인 리스트
              </p>
            </div>

            {timelineSubjects.map((element) => {
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
