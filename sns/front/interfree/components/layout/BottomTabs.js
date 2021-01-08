// 모바일에서만 생성되는 하단 네비게이션

import React, { useState, useMemo } from "react";
import Router from "next/router";
import { useMediaQuery } from "react-responsive";

import SearchModal from "./SearchModal";
import WritePostModal from "../post/WritePostModal";

import { TabRow, TabCol } from "../../styledComponents/layout/BottomTabs";

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
          <TabRow>
            <TabCol
              onClick={() => {
                Router.push(`${frontUrl}/allPostsBoard`);
              }}
            >
              <AiFillDribbbleCircle />
            </TabCol>

            <TabCol
              onClick={() => {
                Router.push(`${frontUrl}/me`);
              }}
            >
              <FaUserCircle />
            </TabCol>

            <TabCol
              onClick={() => {
                Router.push(`${frontUrl}/friend`);
              }}
            >
              <GoOrganization />
            </TabCol>

            <TabCol
              onClick={() => {
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                setWritePostModalShow(true);
              }}
            >
              <AiFillEdit />
            </TabCol>

            <TabCol
              onClick={() => {
                setSearchModalShow(true);
              }}
            >
              <BsSearch />
            </TabCol>
          </TabRow>
        </>
      )}
    </div>
  );
};

export default BottomTabs;
