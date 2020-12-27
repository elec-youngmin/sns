import React, { useState } from "react";
import Router from "next/router";
import { useMediaQuery } from "react-responsive";

import SearchModal from "./SearchModal";
import WritePostModal from "../FloatingButton/WritePostModal";

import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

import {
  AiFillDribbbleCircle,
  AiOutlineLogout,
  AiOutlineLineChart,
} from "react-icons/ai";
import { GoOrganization } from "react-icons/go";

import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiFillSetting, AiFillEdit } from "react-icons/ai";

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
  const { id } = useSelector((state) => state.user.user);

  const [searchModalShow, setSearchModalShow] = useState(false);
  const [writePostModalShow, setWritePostModalShow] = useState(false);

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 854px)",
  });
  return (
    <div>
      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />

      <WritePostModal
        show={writePostModalShow}
        onHide={() => setWritePostModalShow(false)}
      />
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
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                Router.push(`${frontUrl}/me`);
              }}
            >
              <FaUserCircle />
            </Col>

            <Col
              style={ColStyle}
              onClick={() => {
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                Router.push(`${frontUrl}/friend`);
              }}
            >
              <GoOrganization />
            </Col>

            <Col
              style={ColStyle}
              onClick={() => {
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                setWritePostModalShow(true);
              }}
            >
              <AiFillEdit />
            </Col>

            <Col
              style={ColStyle}
              onClick={() => {
                setSearchModalShow(true);
              }}
            >
              <BsSearch />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BottomTabs;
