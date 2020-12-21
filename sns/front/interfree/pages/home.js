import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Avatar from "react-avatar";
import { useRouter } from "next/router";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import HorizontalNav from "../components/layout/HorizontalNav";

import NonePostAlert from "../components/post/NonePostAlert";
import PostBoard from "../components/post/PostBoard";

import PostBoardLoading from "../components/loading/PostBoardLoading";
import PreviewProfileModal from "../components/post/PreviewProfileModal";
import VerticalNav from "../components/layout/VerticalNav";
import ScrollButton from "../components/layout/ScrollButton";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import BottomTabs from "../components/layout/BottomTabs";
import MyProfile from "../components/layout/MyProfile";
import WritePostModal from "../components/FloatingButton/WritePostModal";
import AddTimelineModal from "../components/timeline/AddTimelineModal";
import EditProfilePictureModal from "../components/setting/EditProfilePictureModal";
import EditProfileSettingModal from "../components/setting/EditProfileSettingModal";

import exampleTimeline from "./exampleTimeline";
import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import {
  LOAD_POST_REQUEST,
  SEARCH_FRIEND_REQUEST,
  LOAD_USERPAGE_REQUEST,
} from "../reducers/post";
import { Row, Col, Tabs, TabContainer, Button, Nav } from "react-bootstrap";

import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { GiTimeBomb } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const home = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const { loadPostDone } = useSelector((state) => state.post);

  const { posts, search } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [writePostShow, setWritePostShow] = useState(false);
  const [timelineModalShow, setTimelineModalShow] = useState(false);
  const [editProfilePictureShow, setEditProfilePictureShow] = useState(false);
  const [editProfileSettingShow, setEditProfileSettingShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <AddTimelineModal
        show={timelineModalShow}
        onHide={() => setTimelineModalShow(false)}
      />
      <WritePostModal
        show={writePostShow}
        onHide={() => setWritePostShow(false)}
      />
      <EditProfilePictureModal
        show={editProfilePictureShow}
        onHide={() => setEditProfilePictureShow(false)}
      />
      <EditProfileSettingModal
        show={editProfileSettingShow}
        onHide={() => setEditProfileSettingShow(false)}
      />

      <HorizontalNav />
      <BottomTabs />
      <PreviewProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // toggle={}
      />
      <div className="container justify-content-center">
        <Row
          style={{
            paddingTop: "95px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px auto",
          }}
        >
          <VerticalNav />
          <Col lg={7}>
            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                <ImProfile />
                프로필 사진 편집
              </p>
              <p style={{ fontWeight: "600" }}>
                공개되는 프로필 사진을 편집하세요.
              </p>
              <Button
                onClick={() => {
                  setEditProfilePictureShow(true);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                프로필 사진 편집하기
              </Button>
            </div>

            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                <ImProfile />
                프로필 편집
              </p>
              <p style={{ fontWeight: "600" }}>공개되는 프로필을 편집하세요.</p>
              <Button
                onClick={() => {
                  setEditProfileSettingShow(true);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                프로필 편집하기
              </Button>
            </div>
            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  fontSize: "25px",
                }}
              >
                <AiFillEdit />
                포스트 작성
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
              >
                포스트를 올려 좋아요를 받아보세요.
              </p>
              <input
                placeholder="포스트를 작성하세요..."
                style={{
                  border: "none",
                  borderBottom: "3px solid black",
                  borderRadius: "5px",
                  width: "80%",
                  height: "50px",
                  margin: "20px 0px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setWritePostShow(true);
                }}
              ></input>
            </div>

            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  marginBottom: "5px",
                }}
              >
                <AiOutlineSearch />
                친구 찾기
              </p>
              <p style={{ fontWeight: "600" }}>
                친구의 이메일을 검색해 친구의 페이지로 이동해 보세요.
              </p>
              <Typeahead
                id="basic-typeahead-multiple"
                filterBy={() => true}
                options={search}
                placeholder="친구의 이메일을 검색..."
                style={{
                  margin: "0px auto",
                  width: "80%",
                  marginBottom: "25px",
                }}
                onChange={(selected) => {
                  console.log(selected);
                  setSearchText(selected[0]?.id);
                  dispatch({
                    type: LOAD_USERPAGE_REQUEST,
                    data: searchText,
                  });
                  router.push(`${frontUrl}/UserPage/${selected[0]?.id}/`);
                }}
                onInputChange={(e) => {
                  setSearchText(e);
                  dispatch({
                    type: SEARCH_FRIEND_REQUEST,
                    data: { text: e },
                  });
                }}
              />
            </div>

            {/* 타임라인 div */}
            <div
              style={{
                border: "1px solid #F0FFFF",
                borderRadius: "20px",
                boxShadow: "1px 1px 2px 2px #ccc",
                backgroundColor: "white",
                margin: "20px 0px",
                textAlign: "center",
                marginBottom: "50px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  fontSize: "25px",
                  width: "100%",
                }}
              >
                <GiTimeBomb />
                타임아웃 만들기
              </p>

              <p
                style={{
                  marginBottom: "0px",
                  fontWeight: "600",
                }}
              >
                주제를 정하고 타임라인을 만들어 보세요.
              </p>
              <br />
              <Button
                onClick={() => {
                  router.push(`${frontUrl}/exampleTimeline/`);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                타임라인 예
              </Button>
              <br />
              <Button
                onClick={() => {
                  setTimelineModalShow(true);
                }}
                style={{
                  marginBottom: "20px",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                타임라인 추가
              </Button>
            </div>
          </Col>
          <PostBoardLoading />
        </Row>
      </div>
      <FloatingButton />
      <ScrollButton />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default home;
