import React from "react";
import PropTypes from "prop-types";

import Profile from "../components/setting/Profile";
import ChangePasswordForm from "../components/setting/ChangePasswordForm";
import DestroyUser from "../components/setting/DestroyUser";
import DisabledUser from "../components/setting/DisabledUser";

import { useSelector } from "react-redux";

import { Tab, Row, Col, Nav } from "react-bootstrap";

const SettingForm = () => {
  const { disabled } = useSelector((state) => state.user.user);
  return (
    <div>
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col lg={3}>
            <Nav
              style={{
                textAlign: "center",
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="first">프로필 및 편집</Nav.Link>
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
          {/* <div
            class="span6"
            style={{ paddingRight: "20px", borderRight: "1px solid #ccc" }}
          ></div> */}
          <Col sm={9}>
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

export default SettingForm;
