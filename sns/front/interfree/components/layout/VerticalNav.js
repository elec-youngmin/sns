import React from "react";
import Router from "next/router";
import Menu, { SubMenu, MenuItem } from "rc-menu";

import { AiFillSetting, AiFillEdit } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import {
  BsTrashFill,
  BsBookmarksFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import { Row, Col, Nav } from "react-bootstrap";

import { frontUrl } from "../../config/config";

const VerticalNav = () => {
  return (
    <>
      <Menu>
        <MenuItem>
          <AiFillEdit />
          포스트
        </MenuItem>
        <MenuItem>
          <GoOrganization /> 친구
        </MenuItem>

        <MenuItem>
          <BsBookmarksFill />
          북마크
        </MenuItem>

        <MenuItem>
          <BsTrashFill /> 쓰레기통
        </MenuItem>
        <MenuItem>
          <BsFillBarChartFill /> 활동 차트
        </MenuItem>
        <MenuItem>
          <AiFillSetting />
          설정
        </MenuItem>
      </Menu>
      <Nav
        className="flex-column"
        style={{
          textAlign: "center",
          padding: "0px",
          textAlign: "center",
          fontSize: "30px",
          color: "#6495ED",
          position: "fixed",
          top: "800",
          left: "0",
          // right: "0",
          zIndex: "100",
        }}
      >
        <Nav.Link
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/post`);
          }}
        >
          <AiFillEdit />
          포스트
        </Nav.Link>
        <Nav.Link
          eventKey="link-1"
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/friend`);
          }}
        >
          <GoOrganization /> 친구
        </Nav.Link>
        <Nav.Link
          eventKey="link-2"
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/bookmark`);
          }}
        >
          <BsBookmarksFill />
          북마크
        </Nav.Link>
        <Nav.Link
          eventKey="disabled"
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/trash`);
          }}
        >
          <BsTrashFill /> 쓰레기통
        </Nav.Link>
        <Nav.Link
          eventKey="disabled"
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/activityChart`);
          }}
        >
          <BsFillBarChartFill /> 활동 차트
        </Nav.Link>
        <Nav.Link
          eventKey="disabled"
          style={{ padding: "0px", margin: "10px", fontSize: "30px" }}
          onClick={() => {
            Router.push(`${frontUrl}/setting`);
          }}
        >
          <AiFillSetting />
          설정
        </Nav.Link>
      </Nav>
    </>
  );
};

export default VerticalNav;
