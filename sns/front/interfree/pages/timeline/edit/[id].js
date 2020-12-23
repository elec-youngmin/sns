import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useRouter } from "next/router";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import EditTimelineElement from "../../../components/timeline/EditTimelineElement";

import { useSelector, useDispatch } from "react-redux";

import { LOAD_TIMELINE_CONTENTS_REQUEST } from "../../../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../../../reducers/user";

import { Button } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../../../store/configureStore";
import axios from "axios";

const timeline = () => {
  const { timelineContents } = useSelector((state) => state.post);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(timelineContents);
  return (
    <div>
      <div
        className="container justify-content-center"
        style={{
          paddingTop: "80px",
        }}
      >
        <VerticalTimeline animate={false}>
          {timelineContents.map((element, index) => {
            return (
              <EditTimelineElement
                key={element.index}
                id={element.id}
                title={element.title}
                content={element.content}
                date={element.date}
                TimelineSubId={element.TimelineSubId}
                TimelineSub={element.subject}
              />
            );
          })}
        </VerticalTimeline>
        <Button onClick={() => router.back()}>뒤로가기</Button>
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
      type: LOAD_TIMELINE_CONTENTS_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default timeline;
