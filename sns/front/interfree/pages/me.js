import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useRouter } from "next/router";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import Title from "../components/layout/Title";
import ProfileCard from "../components/profile/ProfileCard";
import WritePostModal from "../components/post/WritePostModal";
import AddTimelineModal from "../components/timeline/AddTimelineModal";
import EditProfilePictureModal from "../components/setting/EditProfilePictureModal";
import EditProfileSettingModal from "../components/setting/EditProfileSettingModal";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionInput,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import { SEARCH_FRIEND_REQUEST, LOAD_USERPAGE_REQUEST } from "../reducers/post";

import { Row, Col, Container } from "react-bootstrap";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { GiTimeBomb } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";

// 컴포넌트 시작
const me = () => {
  const router = useRouter();

  const { search } = useSelector((state) => state.post);
  const { loadUserInfomationDone, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [writePostShow, setWritePostShow] = useState(false);
  const [timelineModalShow, setTimelineModalShow] = useState(false);
  const [editProfilePictureShow, setEditProfilePictureShow] = useState(false);
  const [editProfileSettingShow, setEditProfileSettingShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      {loadUserInfomationDone && (
        <>
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

          <div className="container justify-content-center">
            <>
              <SessionRow>
                <Col md={7}>
                  <Title title={"나"} />

                  <ProfileCard
                    profileImgSrc={
                      user?.ProfileImgSrcs.length > 0
                        ? user?.ProfileImgSrcs[0].src
                        : false
                    }
                    nickname={user.nickname}
                    introduce={user.introduce}
                    postsCount={user.postsCount}
                    followCount={user.followCount}
                    followingCount={user.followingCount}
                    shareLink={user.ShareLink}
                    where={user.where}
                  />

                  <SessionDiv>
                    <SessionTitle>
                      <ImProfile />
                      프로필 사진 편집
                    </SessionTitle>
                    <SessionP>공개되는 프로필 사진을 편집하세요. </SessionP>
                    <SessionButton
                      onClick={() => {
                        setEditProfilePictureShow(true);
                      }}
                    >
                      프로필 사진 변경하기
                    </SessionButton>
                  </SessionDiv>

                  <SessionDiv>
                    <SessionTitle>
                      <ImProfile />
                      프로필 변경
                    </SessionTitle>
                    <SessionP>공개되는 프로필을 변경하세요. </SessionP>
                    <SessionButton
                      onClick={() => {
                        setEditProfileSettingShow(true);
                      }}
                    >
                      프로필 변경하기
                    </SessionButton>
                  </SessionDiv>

                  <SessionDiv>
                    <SessionTitle>
                      <AiFillEdit />
                      포스트 작성
                    </SessionTitle>
                    <SessionP>포스트를 올려 좋아요를 받아보세요.</SessionP>
                    <SessionInput
                      placeholder="포스트를 작성하세요..."
                      onClick={(e) => {
                        e.preventDefault();
                        setWritePostShow(true);
                      }}
                    />
                  </SessionDiv>

                  <SessionDiv>
                    <SessionTitle>
                      <AiOutlineSearch />
                      친구 찾기
                    </SessionTitle>
                    <SessionP>
                      친구의 이메일을 검색해 친구의 페이지로 이동해 보세요.
                    </SessionP>
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
                        router.push(`${frontUrl}/user/${selected[0]?.id}/`);
                      }}
                      onInputChange={(e) => {
                        setSearchText(e);
                        dispatch({
                          type: SEARCH_FRIEND_REQUEST,
                          data: { text: e },
                        });
                      }}
                    />
                  </SessionDiv>

                  <SessionDiv>
                    <SessionTitle>
                      <GiTimeBomb />
                      타임아웃 만들기
                    </SessionTitle>

                    <SessionP>주제를 정하고 타임라인을 만들어 보세요.</SessionP>
                    <br />
                    <SessionButton
                      onClick={() => {
                        router.push(`${frontUrl}/exampleTimeline/`);
                      }}
                    >
                      이 기능으로 만든 예시
                    </SessionButton>
                    <br />
                    <SessionButton
                      onClick={() => {
                        setTimelineModalShow(true);
                      }}
                    >
                      타임라인 추가
                    </SessionButton>
                  </SessionDiv>
                </Col>
              </SessionRow>
            </>
          </div>
        </>
      )}
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default me;
