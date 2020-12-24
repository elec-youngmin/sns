import React from "react";
import { Line } from "react-chartjs-2";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { useSelector } from "react-redux";

import { LOAD_CHARTDATA_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { Tab, Row, Col, Nav } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

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
      <div
        className="container justify-content-center"
        style={{ paddingTop: "80px", textAlign: "center" }}
      >
        {/* interfree 전체 일일 포스트 갯수 차트 */}
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col lg={3} style={{ textAlign: "center" }}>
              <Nav
                className="container justify-content-center"
                style={{
                  textAlign: "center",
                }}
              >
                <Nav.Item
                  tyle={{
                    textAlign: "center",
                  }}
                >
                  <Nav.Link
                    eventKey="first"
                    tyle={{
                      textAlign: "center",
                    }}
                  >
                    전체 일일 포스트 수
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">전체 일일 댓글 수</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">전체 일일 좋아요 수</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">전체 일일 신고</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div
                  // style={{
                  //   maxWidth: "600px",
                  //   height: "300px",
                  //   marginBottom: "0px",
                  // }}
                  >
                    <Line data={postsdata} />
                    {allCharts.postsData.length < 2 && (
                      <p>
                        아직 포스트 데이터가 부족해 차트가 형성되지 못했습니다.{" "}
                      </p>
                    )}
                  </div>

                  {/* interfree 전체 일일 댓글 갯수 차트 */}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div
                    style={{
                      maxWidth: "600px",
                      height: "300px",
                      marginBottom: "0px",
                    }}
                  >
                    <Line data={commentsdata} />
                    {allCharts.commentsData.length < 2 && (
                      <p>
                        아직 댓글 데이터가 부족해 차트가 형성되지 못했습니다.{" "}
                      </p>
                    )}
                  </div>

                  {/* interfree 전체 일일 좋아요 갯수 차트 */}
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div
                    style={{
                      maxWidth: "600px",
                      height: "300px",
                      marginBottom: "0px",
                    }}
                  >
                    <Line data={likesdata} />
                    {allCharts.likesData.length < 2 && (
                      <p>
                        아직 좋아요 데이터가 부족해 차트가 형성되지 못했습니다.{" "}
                      </p>
                    )}
                  </div>

                  {/* interfree 전체 일일 신고 갯수 차트 */}
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div
                    style={{
                      maxWidth: "600px",
                      height: "300px",
                      marginBottom: "0px",
                    }}
                  >
                    <Line data={reportsdata} />
                    {allCharts.reportsData.length < 2 && (
                      <p>
                        아직 신고수 데이터가 부족해 차트가 형성되지 못했습니다.{" "}
                      </p>
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        {isBrowser && <h1> 스마트폰 화면을 가로로 바꿔보세요.</h1>}
        <MobileView>
          <h1> 폰 화면을 가로로 바꿔보세요.</h1>
        </MobileView>
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
      type: LOAD_CHARTDATA_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default ChartPage;
