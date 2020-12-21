import React, { useState } from "react";
import Router from "next/router";
import Moment from "react-moment";

import AddTimelineContentsModal from "./AddTimelineContentsModal";

import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "react-bootstrap";

import { frontUrl } from "../../config/config";
import { backUrl } from "../../config/config";

const TimelineSubjectDiv = ({ id, subject, createdAt }) => {
  const [timelineContentsShow, setTimelineContentsShow] = useState(false);
  return (
    <>
      <AddTimelineContentsModal
        show={timelineContentsShow}
        id={id}
        onHide={() => setTimelineContentsShow(false)}
      />
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
          {subject}
        </p>

        <p style={{ fontWeight: "bold" }}>
          생성일: <Moment format="YYYY/MM/DD">{createdAt}</Moment>
        </p>
        <Button
          onClick={() => {
            setTimelineContentsShow(true);
          }}
          style={{
            marginBottom: "20px",
            marginRight: "20px",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          추가
        </Button>
        <Button
          onClick={() => {
            Router.push(`${frontUrl}/timeline/edit/${id}`);
          }}
          style={{
            marginBottom: "20px",
            marginRight: "20px",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          편집
        </Button>
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
      </div>
    </>
  );
};

export default TimelineSubjectDiv;
