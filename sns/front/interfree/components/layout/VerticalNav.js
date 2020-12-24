import React from "react";
import Router from "next/router";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import { useMediaQuery } from "react-responsive";

import { useSelector } from "react-redux";

import { AiFillSetting, AiFillEdit } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import {
  BsTrashFill,
  BsBookmarksFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import { GiTimeBomb } from "react-icons/gi";

import { Row, Col, Nav } from "react-bootstrap";

import { frontUrl } from "../../config/config";

const VerticalNav = () => {
  const { loadUserInfomationDone } = useSelector((state) => state.user);
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 854px)",
  });
  return (
    <>
      {loadUserInfomationDone && !isTabletOrMobileDevice && (
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
              <a>
                <AiFillEdit />
                포스트
              </a>
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/timeline`);
              }}
            >
              <a>
                <GiTimeBomb /> 타임라인
              </a>
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/friend`);
              }}
            >
              <a>
                <GoOrganization /> 친구
              </a>
            </MenuItem>

            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/bookmark`);
              }}
            >
              <a>
                <BsBookmarksFill />
                북마크
              </a>
            </MenuItem>

            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/trash`);
              }}
            >
              <a>
                <BsTrashFill /> 휴지통
              </a>
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/activityChart`);
              }}
            >
              <a>
                <BsFillBarChartFill /> 활동 차트
              </a>
            </MenuItem>
            <MenuItem
              onClick={() => {
                Router.push(`${frontUrl}/setting`);
              }}
            >
              <a>
                <AiFillSetting />
                설정
              </a>
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default VerticalNav;
