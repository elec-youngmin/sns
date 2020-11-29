import React from "react";
import PropTypes from "prop-types";

import Menu from "../components/firstSeePage/Menu";

import { Tab, Row, Col, Nav, Accordion, Card, Button } from "react-bootstrap";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import PostBoardLoading from "../components/loading/PostBoardLoading";

const QnABoard = () => {
  return (
    <div>
      <Menu />
      <Col
        md={8}
        className=" container justify-content-center"
        style={{ paddingTop: "80px" }}
      >
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">서비스 관련</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">개발관련</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          인터프리는 어떤 서비스 인가요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          인터프리는 사람들과 자유롭게 소통할 수 있는 SNS
                          입니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          프로필 편집에서 제가 쓴 소개,공유 링크, 사는 곳은 다른
                          사람이 어떻게 볼 수 있나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          닉네임 옆에 플러스 버튼을 클릭하면 다른 사람이 볼 수
                          있습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          비밀번호는 암호화 되어 저장되나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          네. 비밀번호는 암호화 되어 저장되기 때문에 관리자도 알
                          수 없습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="3"
                        >
                          닉네임은 다른 사용자와 중복 될 수 있나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          네. 가입하실 때 닉네임은 중복 될 수 있습니다. 단,
                          이메일 주소는 중복 될 수 없습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="0"
                        >
                          개발 오류 신고 또는 피드백을 하고 싶습니다. 어떻게
                          연락하나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          mintzerocode@gmail.com 으로 개발 관련 피드백을 보내
                          주시면 처리 하겠습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="1"
                        >
                          모바일 화면에서도 최적화 되어 있나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          네, 인터프리는 모바일 화면에서도 최적화되어 있습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="2"
                        >
                          어떤 프로그래밍 언어를 사용해서 서비스가 구현됐나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          java script를 사용하였고, java script 라이브러리인
                          react, next를 사용하여 프론트를 구현하였고, node,
                          express 를 사용하여 백엔드를 구현하였습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey="3"
                        >
                          프론트엔드 디자인은 어떻게 개발 되었나요?
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          프론트엔드 디자인은 반응형 웹을 구현하기 위해 구현이
                          쉬운 bootstrap을 최대한 사용하였고, 필요하다면 css로
                          디자인을 처리하였습니다.
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default QnABoard;
