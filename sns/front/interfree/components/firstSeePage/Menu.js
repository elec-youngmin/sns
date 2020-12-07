import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";
import { LOAD_CHARTDATA_REQUEST } from "../../reducers/post";

import { Navbar, Nav } from "react-bootstrap";
import {
  AiFillDribbbleCircle,
  AiOutlineLogout,
  AiOutlineLineChart,
} from "react-icons/ai";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { BiUserCircle } from "react-icons/bi";

// import Styledh1 from "./style/menuStyle";
import styled from "styled-components";

import { frontUrl } from "../../config/config";

const Styledh1 = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Nanum+Gothic&display=swap");
  font-family: "Fredoka One", cursive;
  color: #8a2be2;
  font-size: 40px;
  text-align: center;
  cursor: "pointer";
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 430px) {
    font-size: 30px;
    .cols {
      width: 100%;
      text-align: center;
      margin-right: 100px;
      font-size: 300px;
    }
  }
  @media (max-width: 290px) {
    font-size: 20px;
  }
`;

const Styleddiv = styled.div`
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 430px) {
    font-size: 25px;
  }
  @media (max-width: 290px) {
    font-size: 15px;
  }
`;

const Menu = () => {
  const dispatch = useDispatch();
  const { logInDone, logOutDone, loadUserInfomationDone } = useSelector(
    (state) => state.user
  );

  useMemo(() => {
    if (logOutDone) {
      Router.push(`${frontUrl}`);
    }
  }, [logOutDone]);

  return (
    <div>
      <Navbar
        className="col-md-10 row justify-content-center mx-auto order-0"
        bg="light"
        expand="sm"
        style={{
          textAlign: "center",
          fontSize: "30px",
          color: "#6495ED",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "100",
        }}
      >
        <Navbar.Brand>
          <Styledh1
            onClick={() => {
              Router.push(`${frontUrl}/PersonalPostBoard`);
            }}
          >
            interfree
          </Styledh1>
        </Navbar.Brand>
        {logInDone ||
          (loadUserInfomationDone && !logOutDone && (
            <Navbar.Toggle
              className="ml-auto hidden-sm-up float-xs-right"
              aria-controls="basic-navbar-nav"
              style={{ float: "right" }}
            />
          ))}
        {logInDone ||
          (loadUserInfomationDone && !logOutDone && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link
                  style={{
                    marginRight: "30px",
                    color: "#4682B4",
                    textAlign: "center",
                  }}
                >
                  <AiFillDribbbleCircle
                    style={{ marginRight: "30px" }}
                    onClick={() => {
                      Router.push(`${frontUrl}/allPostsBoard`);
                    }}
                  />

                  <FaUserCircle
                    style={{ marginRight: "30px" }}
                    onClick={() => {
                      Router.push(`${frontUrl}/PersonalPostBoard`);
                    }}
                  />
                  <BsFillInfoCircleFill
                    style={{ marginRight: "30px" }}
                    onClick={() => {
                      Router.push(`${frontUrl}/QnABoard`);
                    }}
                  />
                  <AiOutlineLineChart
                    style={{ marginRight: "30px" }}
                    onClick={() => {
                      dispatch({
                        type: LOAD_CHARTDATA_REQUEST,
                      });
                      Router.push(`${frontUrl}/ChartPage`);
                    }}
                  />
                  <AiOutlineLogout
                    onClick={() => {
                      dispatch({
                        type: USER_LOGOUT_REQUEST,
                      });
                    }}
                  />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          ))}
      </Navbar>
    </div>
  );
};

export default Menu;
