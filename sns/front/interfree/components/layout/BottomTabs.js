// 모바일에서만 생성되는 하단 네비게이션

import React, { useState, useMemo } from "react";
import Router from "next/router";
import { useMediaQuery } from "react-responsive";

import SearchModal from "./SearchModal";
import WritePostModal from "../post/WritePostModal";

import {
  Container,
  TabMenu,
  TabRow,
} from "../../styledComponents/layout/BottomTabs";

import { useSelector } from "react-redux";

import { AiFillDribbbleCircle } from "react-icons/ai";
import { GoOrganization } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import { frontUrl } from "../../config/config";

const BottomTabs = () => {
  const { id } = useSelector((state) => state.user.user);
  const { savePostDone, searchResultDone } = useSelector((state) => state.post);
  const [searchModalShow, setSearchModalShow] = useState(false);
  const [writePostModalShow, setWritePostModalShow] = useState(false);

  useMemo(() => {
    if (savePostDone) {
      setWritePostModalShow(false);
    }
  }, [savePostDone]);

  useMemo(() => {
    if (searchResultDone) {
      setSearchModalShow(false);
    }
  }, [searchResultDone]);

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
          <Container>
            <TabMenu
              onClick={() => {
                Router.push(`${frontUrl}/allPostsBoard`);
              }}
            >
              <TabRow>
                <AiFillDribbbleCircle />
              </TabRow>
              <TabRow>모든 글</TabRow>
            </TabMenu>

            <TabMenu
              onClick={() => {
                Router.push(`${frontUrl}/me`);
              }}
            >
              <TabRow>
                <FaUserCircle />
              </TabRow>
              <TabRow>나</TabRow>
            </TabMenu>

            <TabMenu
              onClick={() => {
                Router.push(`${frontUrl}/friend`);
              }}
            >
              <TabRow>
                <GoOrganization />
              </TabRow>
              <TabRow>친구</TabRow>
            </TabMenu>

            <TabMenu
              onClick={() => {
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                setWritePostModalShow(true);
              }}
            >
              <TabRow>
                <AiFillEdit />
              </TabRow>
              <TabRow>글쓰기</TabRow>
            </TabMenu>

            <TabMenu
              onClick={() => {
                setSearchModalShow(true);
              }}
            >
              <TabRow>
                <BsSearch />
              </TabRow>
              <TabRow>검색</TabRow>
            </TabMenu>
          </Container>
        </>
      )}
    </div>
  );
};

export default BottomTabs;
