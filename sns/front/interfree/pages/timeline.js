import React, { useState } from "react";
import Router from "next/router";

import AlertTab from "../components/layout/AlertTab";
import Title from "../components/layout/Title";
import NeedLoginAlert from "../components/login/NeedLoginAlert";
import TimelineSubjectDiv from "../components/timeline/TimelineSubjectDiv";
import AddTimelineModal from "../components/timeline/AddTimelineModal";
import AddTimelineContentsModal from "../components/timeline/AddTimelineContentsModal";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_TIMELINE_SUBJECT_REQUEST } from "../reducers/post";

import { Col } from "react-bootstrap";

import { GiTimeBomb } from "react-icons/gi";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

const timeline = () => {
  const [timelineModalShow, setTimelineModalShow] = useState(false);
  const [timelineContentsShow, setTimelineContentsShow] = useState(false);
  const { timelineSubjects } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      {user.id === "guest" ? (
        <NeedLoginAlert />
      ) : (
        <>
          <AddTimelineModal
            show={timelineModalShow}
            onHide={() => {
              setTimelineModalShow(false);
            }}
          />

          <AddTimelineContentsModal
            show={timelineContentsShow}
            onHide={() => {
              timelineContentsShow(false);
            }}
          />

          <div className="container justify-content-center">
            <SessionRow>
              <Col md={7}>
                <Title title={"타임라인"} />

                <SessionDiv>
                  <SessionTitle>
                    <GiTimeBomb />
                    타임아웃 만들기
                  </SessionTitle>
                  <SessionP>주제를 정하고 타임라인을 만들어 보세요.</SessionP>
                  <br />
                  <SessionButton
                    onClick={() => {
                      Router.push(`${frontUrl}/exampleTimeline/`);
                    }}
                  >
                    이 기능으로 만든 예시
                  </SessionButton>
                  <br />
                  <SessionButton
                    onClick={() => {
                      setTimelineModalShow(true);
                    }}
                  >
                    타임라인 추가
                  </SessionButton>
                </SessionDiv>

                <Title title={"타임라인 리스트"} />

                {timelineSubjects.length === 0 && (
                  <AlertTab
                    title={"아직 작성된 타임라인 주제가 없습니다."}
                    content={"첫번째 타임라인을 생성해 보세요."}
                  />
                )}

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
            </SessionRow>
          </div>
        </>
      )}
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
