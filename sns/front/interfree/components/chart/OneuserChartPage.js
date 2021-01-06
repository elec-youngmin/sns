// 개인 사용자에게 제공 되는 차트

import React from "react";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";

import { useSelector } from "react-redux";

const OneuserChartPage = () => {
  const { charts } = useSelector((state) => state.post);

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 537px)",
  });

  // 여기부터 일일 작성한 포스트 차트 데이터 가공
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
      {/* interfree 전체 일일 포스트 갯수 차트 */}
      {isTabletOrMobileDevice && (
        <p
          style={{
            textAlign: "center",
            textWeight: "bold",
            marginBottom: "25px",
          }}
        >
          디바이스를 가로로 회전해 보세요.
        </p>
      )}

      {/* 일일 좋아요 수 차트  */}
      <div
        style={{
          marginBottom: "50px",
        }}
      >
        <Line data={postsdata} />
        {charts.postsData.length < 2 && (
          <>
            <p>데이터가 부족해 차트가 형성되지 못했습니다. </p>
            <p>포스트를 올려 차트를 형성해 보세요. </p>
          </>
        )}
      </div>

      <div
        style={{
          marginBottom: "50px",
        }}
      >
        <Line data={likesdata} />
        {charts.likesData.length < 2 && (
          <>
            <p>데이터가 부족해 차트가 형성되지 못했습니다. </p>
            <p>포스트를 올려 좋아요를 받아보세요. </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OneuserChartPage;
