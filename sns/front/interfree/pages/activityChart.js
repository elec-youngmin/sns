//개인 사용자의 활동 차트 페이지

import React from "react";

import Title from "../components/layout/Title";
import NeedLoginAlert from "../components/login/NeedLoginAlert";
import OneuserChartPage from "../components/chart/OneuserChartPage";

import { CONFIRM_CURRENT_LOGIN_REQUEST } from "../reducers/user";
import { LOAD_ONEUSER_CHARTDATA_REQUEST } from "../reducers/post";

import { SessionRow } from "../styledComponents/layout/Session";

import { useSelector } from "react-redux";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const activityChart = () => {
  const { loadOneuserChartdataDone } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {user.id === "guest" && <NeedLoginAlert />}
      <div className="container justify-content-center">
        {user.id !== "guest" && (
          <>
            <SessionRow>
              <Col md={7}>
                <Title title={"활동 차트"} />
                {loadOneuserChartdataDone && <OneuserChartPage />}
              </Col>
            </SessionRow>
          </>
        )}
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
      type: LOAD_ONEUSER_CHARTDATA_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default activityChart;
