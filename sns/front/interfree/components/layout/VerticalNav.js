// 데스크탑에서 생성되는 세로 네비게이션 바

import React from "react";
import Router from "next/router";

import {
  VerticalDiv,
  MenuItem,
} from "../../styledComponents/layout/VerticalNav";


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
  return (

    <>
      <VerticalDiv>
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
      </VerticalDiv>
    </>

  );
};

export default VerticalNav;
