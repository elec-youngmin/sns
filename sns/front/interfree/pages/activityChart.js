import React from "react";

import OneuserChartPage from "../components/chart/OneuserChartPage";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_ONEUSER_CHARTDATA_REQUEST } from "../reducers/post";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Button, Nav } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const activityChart = () => {
  const { loadOneuserChartdataDone } = useSelector((state) => state.post);
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <div className="container justify-content-center">
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
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
                차트
              </p>
            </div>
            {loadOneuserChartdataDone && <OneuserChartPage />}
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
      type: LOAD_ONEUSER_CHARTDATA_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default activityChart;
