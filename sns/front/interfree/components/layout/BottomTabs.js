import React from "react";
import Router from "next/router";
import { useMediaQuery } from "react-responsive";

import { Row, Col } from "react-bootstrap";
import {
  AiFillDribbbleCircle,
  AiOutlineLogout,
  AiOutlineLineChart,
} from "react-icons/ai";

import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { frontUrl } from "../../config/config";

const ColStyle = {
  border: "0.5px solid white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "5px 0px",
};
const BottomTabs = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });
  return (
    <div>
      {isTabletOrMobileDevice && (
        <>
          <Row
            style={{
              textAlign: "center",
              padding: "0px",
              textAlign: "center",
              fontSize: "30px",
              backgroundColor: "white",
              color: "#5F9EA0",
              position: "fixed",
              bottom: "0px",
              left: "0",
              right: "0",
              zIndex: "100",
            }}
          >
            <Col
              style={ColStyle}
              onClick={() => {
                Router.push(`${frontUrl}/allPostsBoard`);
              }}
            >
              <AiFillDribbbleCircle />
            </Col>
            <Col
              style={ColStyle}
              onClick={() => {
                Router.push(`${frontUrl}/personalPostBoard`);
              }}
            >
              <FaUserCircle />
            </Col>
            <Col style={ColStyle}>
              <AiOutlineLineChart />
            </Col>
            <Col style={ColStyle}>
              <BsSearch />
            </Col>
            <Col style={ColStyle}>
              <AiOutlineLogout />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BottomTabs;
