import React from "react";
import Router from "next/router";
import { MenuItem } from "rc-menu";

import { VerticalDiv } from "../../styledComponents/layout/VerticalNav";

import { useSelector } from "react-redux";

import { AiFillSetting, AiFillEdit } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import {
  BsTrashFill,
  BsBookmarksFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import { GiTimeBomb } from "react-icons/gi";

import { frontUrl } from "../../config/config";

const VerticalNav = () => {
  const { id } = useSelector((state) => state.user.user);

  return (
    <div>
      <>
        <VerticalDiv>
          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
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
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/timeline`);
            }}
          >
            <a>
              <GiTimeBomb /> 타임라인
            </a>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/friend`);
            }}
          >
            <a>
              <GoOrganization /> 친구
            </a>
          </MenuItem>

          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
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
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/trash`);
            }}
          >
            <a>
              <BsTrashFill /> 휴지통
            </a>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/activityChart`);
            }}
          >
            <a>
              <BsFillBarChartFill /> 활동 차트
            </a>
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (id === "guest") {
                return alert("로그인 후 이용하실 수 있어요.");
              }
              Router.push(`${frontUrl}/setting`);
            }}
          >
            <a>
              <AiFillSetting />
              설정
            </a>
          </MenuItem>
        </VerticalDiv>
      </>
    </div>
  );
};

export default VerticalNav;
