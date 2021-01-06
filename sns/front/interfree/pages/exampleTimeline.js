//타임라인 예시 페이지
//조선사 타임라인

import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import TimelineElement from "../components/timeline/TimelineElement";

import {
  TimelinetRow,
  TitleDiv,
} from "../styledComponents/timeline/ExampleTimeline";

import { Col } from "react-bootstrap";

const ExampleTimeline = () => {
  return (
    <div style={{ paddingTop: "105px" }}>
      <div className="container justify-content-center">
        <TimelinetRow>
          <Col md={8}>
            <TitleDiv>
              <h1
                style={{
                  color: "white",
                }}
              >
                조선사 타임라인
              </h1>
            </TitleDiv>

            <VerticalTimeline animate={false}>
              <TimelineElement
                title={"태조 집권 시기"}
                content={"ㆍ조선건국(1392), 한양천도(1394)"}
                date={"1392~1398"}
              />

              <TimelineElement
                title={"세종 집권 시기"}
                content={
                  "집현전(경연, 서연), 의정부서사제 훈구파, 4군6진, 한글창제"
                }
                date={"1418~1450"}
              />

              <TimelineElement
                title={"임진왜란"}
                content={
                  "임진왜란(1592~1598) 중 3년여에 걸친휴전이 결렬 되자 다시 재 침입 →정유재란(1597~1598) "
                }
                date={"1592~1598"}
              />

              <TimelineElement
                title={"정묘호란"}
                content={
                  "1627년 1월 중순부터 3월 초순까지 만주에 본거를 후금의 침입으로 일어난 조선과 후금 사이 전쟁"
                }
                date={"1627"}
              />

              <TimelineElement
                title={"병자호란"}
                content={
                  " 조선과 청나라의 전쟁.1627년 정묘호란 발발 후 10년만에 다시 일어난 전란이다."
                }
                date={"1637"}
              />

              <TimelineElement
                title={"영조 집권 시기"}
                content={
                  "이인좌의 난, 나주괘서 사건, 완탕평책(비-파-채) 균역법, 속대전, 서원정리(산림부정) 이조전랑의 권한 축소, 노비종모법(일천즉천) 신문고 부활, 청계천 정비,사형수 삼심제"
                }
                date={"1724~1776"}
              />

              <TimelineElement
                title={"정조 집권 시기"}
                content={
                  "준탕평책, 대전통편, 규장각(초계문신제), 장용영 수원화성(시흥환어행렬도), 수령권환 강화(향약 주관), 문체반정(노론견제), 신해통공 신해박해(추조적발 사건)"
                }
                date={"1776~1800"}
              />

              <TimelineElement
                title={"흥선대원군 집권기 "}
                content={"왕권강화, 민생안졍, 쇄국 정책"}
                date={"1863~1873"}
              />

              <TimelineElement
                title={"병인박해"}
                content={"천주교탄압 9명의 프랑스신부와 수천 명의 신도 처형"}
                date={"1866"}
              />

              <TimelineElement
                title={"제너럴셔먼호 사건"}
                content={
                  "미국의 통상요구 및 약탈→평양감사 박규수와 평양군민들이 격퇴"
                }
                date={"1866"}
              />

              <TimelineElement
                title={"제너럴셔먼호 사건"}
                content={
                  "미국의 통상요구 및 약탈→평양감사 박규수와 평양군민들이 격퇴"
                }
                date={"1866"}
              />

              <TimelineElement
                title={"병인양요"}
                content={
                  "프랑스가 병인박해를 구실로 침략 한성근(문수산성), 양헌수(정족산성)가 격퇴, 외규장각도서약탈→2011년 대여형식반환, 척화비문을 내림"
                }
                date={"1866"}
              />

              <TimelineElement
                title={"신미양요"}
                content={
                  "제너럴셔먼호 사건을 구실로 미국의 침략→어재연(광성보)항전, 직후 척화비건립) 대전회통, 육전조례, 당백전, 원납전"
                }
                date={"1871"}
              />

              <TimelineElement
                title={"강화도 조약"}
                content={
                  "최초의 불평등·근대적 조약자주권 침해(치외법권 인정, 해안측량권 인정)"
                }
                date={"1876"}
              />

              <TimelineElement
                title={"동학농민운동"}
                content={
                  " 교조신원운동→고부민란기→전주점령→폐정개혁안(집강소)→우금치의 패배"
                }
                date={"1894"}
              />

              <TimelineElement
                title={"갑오개혁"}
                content={
                  "  신분제의 폐지, 과거제 폐지, 은본위제 ->봉건적 전통질서를 타파한 근대적 개혁"
                }
                date={"1894"}
              />

              <TimelineElement
                title={"조선 멸망"}
                content={" 조선멸망,대한제국 선포"}
                date={"1897"}
              />
            </VerticalTimeline>
          </Col>
        </TimelinetRow>
      </div>
    </div>
  );
};

export default ExampleTimeline;
