import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import Title from "../components/layout/Title";
import FollowAlert from "../components/follow/FollowAlert";
import FollowPage from "../components/follow/FollowPage";
import SearchFriendModal from "../components/follow/SearchFriendModal";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionRow,
} from "../styledComponents/layout/Session";

import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";
import {
  LOAD_FOLLOWS_POST_REQUEST,
  SEARCH_FRIEND_REQUEST,
  LOAD_USERPAGE_REQUEST,
} from "../reducers/post";

import { BsPlusCircle } from "react-icons/bs";
import { AiFillEdit, AiOutlineSearch } from "react-icons/ai";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { frontUrl } from "../config/config";
import { backUrl } from "../config/config";

// 컴포넌트 시작
const friend = () => {
  const { user } = useSelector((state) => state.user);
  const { posts, search } = useSelector((state) => state.post);

  const { followPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [SearchFriendModalShow, setSearchFriendModalShow] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <SearchFriendModal
        show={SearchFriendModalShow}
        onHide={() => setSearchFriendModalShow(false)}
      />

      <div className="container justify-content-center">
        <SessionRow>
          <Col md={7}>
            <Title title={"친구"} />
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
            </SessionDiv>

            <Title title={"친구 목록"} />
            {followPosts.length === 0 && <FollowAlert />}

            <FollowPage />
          </Col>
        </SessionRow>
      </div>
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
      type: LOAD_FOLLOWS_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default friend;
