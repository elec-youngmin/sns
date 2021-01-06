//타임라인 페이지에서 생성되는 타임라인 주제 박스

import React, { useState } from "react";
import Router from "next/router";
import Moment from "react-moment";

import AddTimelineContentsModal from "./AddTimelineContentsModal";

import {
  Div,
  SubjectP,
  AddButton,
} from "../../styledComponents/timeline/TimelineSubjectDiv";

import { Button } from "react-bootstrap";

import { frontUrl } from "../../config/config";

const TimelineSubjectDiv = ({ id, subject, createdAt }) => {
  const [timelineContentsShow, setTimelineContentsShow] = useState(false);

  return (
    <>
      <AddTimelineContentsModal
        show={timelineContentsShow}
        id={id}
        onHide={() => setTimelineContentsShow(false)}
      />

      <Div>
        <SubjectP>{subject}</SubjectP>

        <p style={{ fontWeight: "bold" }}>
          생성일: <Moment format="YYYY/MM/DD">{createdAt}</Moment>
        </p>

        <AddButton
          onClick={() => {
            setTimelineContentsShow(true);
          }}
        >
          추가
        </AddButton>

        <AddButton
          onClick={() => {
            Router.push(`${frontUrl}/timeline/edit/${id}`);
          }}
        >
          편집
        </AddButton>

        <Button
          onClick={() => {
            Router.push(`${frontUrl}/timeline/${id}`);
          }}
          style={{
            marginBottom: "20px",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          보기
        </Button>
      </Div>
    </>
  );
};

export default TimelineSubjectDiv;
