import { useRouter } from "next/router";

import styled from "styled-components";
import { Button, Jumbotron, Col, Row } from "react-bootstrap";

const Styledh1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: blue;

  font-size: 50px;
  display: block;
`;

const Styledh4 = styled.h4`
  font-size: 25px;
  margin: "auto 0px";

  @media (max-width: 992px) {
    font-size: 17px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 368px) {
    font-size: 12px;
  }
`;

const Styleddiv = styled.div`
  font-size: 25px;
  @media (max-width: 992px) {
    width: 250px;
    height: 440px;
  }
  @media (max-width: 768px) {
    width: 440px;
    height: 440px;
  }
  @media (max-width: 576px) {
    width: 380px;
    height: 400px;
  }
  @media (max-width: 410px) {
    width: 300px;
    height: 440px;
  }
  @media (max-width: 410px) {
    width: 250px;
    height: 440px;
  }
`;

const Custom404 = () => {
  const router = useRouter();

  return (
    <div style={{ paddingTop: "75px" }}>
      <Jumbotron
        className="container justify-content-center"
        style={{ borderRadius: "0px 0px 15px 15px", textAlign: "center" }}
      >
        <Row>
          <Col md={12}>
            <div>
              <Styledh1>interfree</Styledh1>
            </div>
            <div>
              <Styledh4>현재 페이지가 올바르지 않아요.</Styledh4>
              <Styledh4>다시 시도해주세요.</Styledh4>
              <Button onClick={() => router.back()}>뒤로가기</Button>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};
export default Custom404;
