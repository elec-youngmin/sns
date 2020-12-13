import React from "react";

import OneuserChartPage from "../components/chart/OneuserChartPage";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { LOAD_ONEUSER_CHARTDATA_REQUEST } from "../reducers/post";

import { useDispatch, useSelector } from "react-redux";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";
const activityChart = () => {
  const { loadOneuserChartdataDone } = useSelector((state) => state.post);
  return <>{loadOneuserChartdataDone && <OneuserChartPage />}</>;
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
