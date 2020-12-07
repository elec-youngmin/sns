import React from "react";
import { Line } from "react-chartjs-2";

import Menu from "../components/firstSeePage/Menu";

import { useSelector } from "react-redux";

import { LOAD_CHARTDATA_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import PostBoardLoading from "../components/loading/PostBoardLoading";

const ChartPage = () => {
  const { allCharts } = useSelector((state) => state.post);

  // 여기부터 포스트 차트 데이터 가공

  let postsdate = [];
  let postsCount = [];
  let postsdata;

  allCharts.postsData.map((e, i) => {
    postsCount[i] = e.count;
    postsdate[i] = e.date;
  });

  postsdata = {
    labels: postsdate,
    datasets: [
      {
        label: "interfree 전체 일일 포스트 갯수",
        data: postsCount,
        fill: false,
        pointHitRadius: 10,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // 여기부터 댓글 차트 데이터 가공
  let commentsdate = [];
  let commentsCount = [];
  let commentsdata;

  allCharts.commentsData.map((e, i) => {
    commentsCount[i] = e.count;
    commentsdate[i] = e.date;
  });

  commentsdata = {
    labels: commentsdate,
    datasets: [
      {
        label: "interfree 전체 일일 댓글 갯수",
        data: commentsCount,
        fill: false,
        pointHitRadius: 10,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // 여기부터 좋아요 차트 데이터 가공
  let likesdate = [];
  let likesCount = [];
  let likesdata;

  allCharts.likesData.map((e, i) => {
    likesCount[i] = e.count;
    likesdate[i] = e.date;
  });

  likesdata = {
    labels: likesdate,
    datasets: [
      {
        label: "interfree 전체 일일 좋아요 갯수",
        data: likesCount,
        fill: false,
        pointHitRadius: 10,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // 여기부터 신고수 차트 데이터 가공
  let reportsdate = [];
  let reportsCount = [];
  let reportsdata;

  allCharts.reportsData.map((e, i) => {
    reportsCount[i] = e.count;
    reportsdate[i] = e.date;
  });

  reportsdata = {
    labels: reportsdate,
    datasets: [
      {
        label: "interfree 전체 일일 포스트 신고 갯수",
        data: reportsCount,
        fill: false,
        pointHitRadius: 10,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <Menu />
      <div
        className="col-md-8 container justify-content-center"
        style={{ paddingTop: "80px", textAlign: "center" }}
      >
        {/* interfree 전체 일일 포스트 갯수 차트 */}

        <div
          style={{
            maxWidth: "600px",
            height: "300px",
            marginBottom: "0px",
          }}
        >
          <Line data={postsdata} />
          {allCharts.postsData.length < 2 && (
            <p>아직 포스트 데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>

        {/* interfree 전체 일일 댓글 갯수 차트 */}

        <div
          style={{
            maxWidth: "600px",
            height: "300px",
            marginBottom: "0px",
          }}
        >
          <Line data={commentsdata} />
          {allCharts.commentsData.length < 2 && (
            <p>아직 댓글 데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>

        {/* interfree 전체 일일 좋아요 갯수 차트 */}

        <div
          style={{
            maxWidth: "600px",
            height: "300px",
            marginBottom: "0px",
          }}
        >
          <Line data={likesdata} />
          {allCharts.likesData.length < 2 && (
            <p>아직 좋아요 데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>

        {/* interfree 전체 일일 신고 갯수 차트 */}

        <div
          style={{
            maxWidth: "600px",
            height: "300px",
            marginBottom: "0px",
          }}
        >
          <Line data={reportsdata} />
          {allCharts.reportsData.length < 2 && (
            <p>아직 신고수 데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>
      </div>

      <PostBoardLoading />
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
      type: LOAD_CHARTDATA_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default ChartPage;
