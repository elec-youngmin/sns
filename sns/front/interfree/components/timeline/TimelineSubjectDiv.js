import React from "react";
import Router from "next/router";

import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { frontUrl } from "../../config/config";
import { backUrl } from "../../config/config";
const TimelineSubjectDiv = ({ id, subject, createdAt }) => {
  return (
    <>
      <Col
        md={3}
        style={{
          // boxShadow: "1px 1px 3px 3px #F8F8FF",
          borderRadius: "12px",
          border: "1px solid #131354",
          backgroundColor: "white",
          margin: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => {
          Router.push(`${frontUrl}/timeline/${id}`);
        }}
      >
        <p>주제: {subject}</p>
        <p>생성일: {createdAt}</p>
      </Col>
    </>
  );
};

export default TimelineSubjectDiv;
