import React from "react";
import PropTypes from "prop-types";

import HorizontalNav from "../components/layout/HorizontalNav";

import Profile from "../components/setting/Profile";
import ChangePasswordForm from "../components/setting/ChangePasswordForm";
import DestroyUser from "../components/setting/DestroyUser";
import DisabledUser from "../components/setting/DisabledUser";
import BottomTabs from "../components/layout/BottomTabs";
import VerticalNav from "../components/layout/VerticalNav";

import { useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { Tab, Row, Col, Nav } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const setting = () => {
  const { disabled } = useSelector((state) => state.user.user);
  return (
    <div className="container justify-content-center">
      <HorizontalNav />
      <VerticalNav />
      <BottomTabs />
      <Tab.Container defaultActiveKey="first">
        <Row style={{ paddingTop: "100px" }}>
          <Col md={3} style={{ textAlign: "center" }}>
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
                  프로필 및 편집
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">비밀번호 변경</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">
                  {disabled ? "모든글 공개" : "모든글 비공개"}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">회원탈퇴</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Profile />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ChangePasswordForm />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <DisabledUser />
              </Tab.Pane>
              <Tab.Pane eventKey="fourth">
                <DestroyUser />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
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
export default setting;
