import React from "react";
import Router from "next/router";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import { useMediaQuery } from "react-responsive";

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
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });
  return (
    <>
      {!isTabletOrMobileDevice && (
        <>
          <Menu
            className="flex-column"
            style={{
              textAlign: "center",
              padding: "0px",
              textAlign: "center",
              fontSize: "30px",
              color: "#6495ED",
              position: "fixed",
              top: "88px",
              left: "0",
              // right: "0",
              zIndex: "100",
              height: "100%",
            }}
          >
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/post`);
              }}
            >
              <AiFillEdit />
              포스트
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/timeline`);
              }}
            >
              <AiFillEdit />
              타임라인
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/timeline`);
              }}
            >
              <GoOrganization /> 친구
            </MenuItem>

            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/bookmark`);
              }}
            >
              <BsBookmarksFill />
              북마크
            </MenuItem>

            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/trash`);
              }}
            >
              <BsTrashFill /> 쓰레기통
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/activityChart`);
              }}
            >
              <BsFillBarChartFill /> 활동 차트
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/setting`);
              }}
            >
              <AiFillSetting />
              설정
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default VerticalNav;
