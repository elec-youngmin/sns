import React from "react";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";

const OneuserChartPage = () => {
  const { charts } = useSelector((state) => state.post);

  // 여기부터 포스트 차트 데이터 가공

  let postsdate = [];
  let postsCount = [];
  let postsdata;

  charts.postsData.map((e, i) => {
    postsCount[i] = e.count;
    postsdate[i] = e.date;
  });

  postsdata = {
    labels: postsdate,
    datasets: [
      {
        label: " 일일 작성한 포스트 수",
        data: postsCount,
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

  charts.likesData.map((e, i) => {
    likesCount[i] = e.count;
    likesdate[i] = e.date;
  });

  likesdata = {
    labels: likesdate,
    datasets: [
      {
        label: "일일 받은 좋아요 수",
        data: likesCount,
        fill: false,
        pointHitRadius: 10,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <div
        className="col-md-8 container justify-content-center"
        style={{ paddingTop: "80px", textAlign: "center" }}
      >
        {/* interfree 전체 일일 포스트 갯수 차트 */}

        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <Line data={postsdata} />
          {charts.postsData.length < 2 && (
            <p>데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>

        {/* 일일 좋아요 수 차트  */}

        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <Line data={likesdata} />
          {charts.likesData.length < 2 && (
            <p>데이터가 부족해 차트가 형성되지 못했습니다. </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneuserChartPage;
