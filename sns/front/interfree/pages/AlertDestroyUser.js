import React from "react";
import PropTypes from "prop-types";

import Menu from "../components/firstSeePage/Menu";

import { Jumbotron, Container } from "react-bootstrap";

const AlertDestroyUser = () => {
  return (
    <div>
      <Menu />
      <Jumbotron
        fluid
        style={{
          paddingTop: "80px",
        }}
      >
        <Container>
          <h1>회원탈퇴가 완료되었습니다.</h1>
          <p>지금까지 인터프리를 이용해주셔서 감사합니다.</p>
          <p>계정 및 포스트는 삭제 되었습니다.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default AlertDestroyUser;
