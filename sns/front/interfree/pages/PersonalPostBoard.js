import React, { useCallback, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import Menu from "../components/firstSeePage/Menu";
import WritePostForm from "../components/post/WritePostForm";
import PostBoard from "../components/post/PostBoard";
import TrashPostForm from "../components/trash/TrashPostForm";
import TrashPostAlert from "../components/trash/TrashPostAlert";
import SettingForm from "./SettingForm";
import FollowAlert from "../components/follow/FollowAlert";
import FollowPage from "../components/follow/FollowPage";
import NonePostAlert from "../components/post/NonePostAlert";
import PostBoardLoading from "../components/loading/PostBoardLoading";
import PreviewProfileModal from "../components/post/PreviewProfileModal";
import BookmarkMainpage from "../components/bookmark/BookmarkMainpage";
import OneuserChartPage from "../components/chart/OneuserChartPage";
import { useDispatch, useSelector } from "react-redux";

import {
  PROFILE_IMAGE_UPLOAD_REQUEST,
  LOAD_USER_INFOMATION_REQUEST,
} from "../reducers/user";
import {
  LOAD_POST_REQUEST,
  LOAD_TRASH_REQUEST,
  LOAD_BOOKMARK_REQUEST,
  LOAD_FOLLOWS_POST_REQUEST,
  LOAD_ONEUSER_CHARTDATA_REQUEST,
} from "../reducers/post";

import {
  Row,
  Col,
  Table,
  Tabs,
  TabContainer,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AiFillSetting, AiFillEdit } from "react-icons/ai";

import {
  BsTrashFill,
  BsBookmarksFill,
  BsFillBarChartFill,
} from "react-icons/bs";
import { GoOrganization } from "react-icons/go";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

import { backUrl } from "../config/config";

// 컴포넌트 시작
const PersonalPostBoard = () => {
  const { user } = useSelector((state) => state.user);
  const { loadPostDone } = useSelector((state) => state.post);

  const profileImg = user?.ProfileImgSrcs[0]?.src;

  const {
    posts,
    followPosts,
    bookmarkPosts,
    trashPosts,
    loadOneuserChartdataDone,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  // const [image, SetImage] = useState("");

  const handleSelect = (key) => {
    if (key === "posts") {
      dispatch({
        type: LOAD_POST_REQUEST,
      });
    }
    if (key === "bookmark") {
      dispatch({
        type: LOAD_BOOKMARK_REQUEST,
        data: { userId: user.id },
      });
    }
    if (key === "trash") {
      dispatch({ type: LOAD_TRASH_REQUEST, data: { userId: user.id } });
    }
    if (key === "Follow") {
      dispatch({
        type: LOAD_FOLLOWS_POST_REQUEST,
        data: { userId: user.id },
      });
    }
    if (key === "chart") {
      dispatch({
        type: LOAD_ONEUSER_CHARTDATA_REQUEST,
        data: { userId: user.id },
      });
    }
  };

  const onhandleChange = useCallback((e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    imageFormData.append("userId", user.id);
    e.preventDefault();

    dispatch({
      type: PROFILE_IMAGE_UPLOAD_REQUEST,
      data: imageFormData,
    });
  });

  const LoadNextPosts = () => {
    const lastId = posts[posts.length - 1]?.id;
    if (posts.length === 0) {
      return;
    }
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { lastId, userId: user.id },
    });
  };

  const LoadNextbookmarkPosts = () => {
    const lastId = bookmarkPosts[bookmarkPosts.length - 1]?.id;
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
      data: { lastId, userId: user.id },
    });
  };
  //10개씩 포스트로드, 스크롤이 브라우저 하단까지 되면 다시 데이터를 로드함.

  return (
    <div>
      <Menu />

      <PreviewProfileModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div
        className="col-md-8 container justify-content-center"
        style={{ backgroundColor: "#EFF2F5", paddingTop: "75px" }}
      >
        <Row>
          <Col md={5}>
            <form
              enctype="multipart/form-data"
              style={{
                textAlign: "center",
              }}
            >
              <label
                for="file-input"
                styles={{
                  display: "block",
                  margin: "0px auto",
                }}
              >
                {profileImg ? (
                  <img
                    class="rounded-circle w-50 p-3 mx-auto d-block"
                    alt="profile_image1"
                    role="button"
                    // src={img.previewURL}
                    src={`${backUrl}/${profileImg}`}
                    style={{
                      minWidth: "180px",
                      minHeight: "180px",
                      maxWidth: "180px",
                      maxHeight: "180px",
                    }}
                  ></img>
                ) : (
                  <img
                    class="rounded-circle w-50 p-3 mx-auto d-block"
                    src={`${backUrl}/userImage.jpg`}
                    alt="profile_image"
                    role="button"
                    style={{
                      minWidth: "180px",
                      minHeight: "180px",
                      maxWidth: "180px",
                      maxHeight: "180px",
                    }}
                  ></img>
                )}
              </label>
              <input
                id="file-input"
                type="file"
                name="image"
                multiple
                style={{ display: "none" }}
                onChange={onhandleChange}
              />
            </form>
          </Col>
          <Col md={7}>
            <br />
            <Table>
              <tbody>
                <tr class="text-center">
                  <td colSpan="3">
                    <h4>
                      {/* {user.nickname} */}
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setModalShow(true);
                        }}
                      >
                        공개 프로필 미리보기
                      </Button>
                    </h4>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span style={{ marginRight: "10px" }}>포스트</span>
                    <span>{user.postsCount}</span>
                  </td>
                  <td>
                    <span style={{ marginRight: "10px" }}>팔로워</span>
                    <span>{user.followCount}</span>
                  </td>
                  <td>
                    <span style={{ marginRight: "10px" }}>팔로우</span>
                    {user.followingCount}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <div className="col-md-7 container justify-content-center">
        <Tabs defaultActiveKey="posts" onSelect={handleSelect}>
          <TabContainer eventKey="posts" title={<AiFillEdit />}>
            {posts.length <= 0 && loadPostDone && <NonePostAlert />}
            <WritePostForm />

            <InfiniteScroll
              dataLength={posts.length}
              next={LoadNextPosts}
              hasMore={true}
              loader={
                <h6 style={{ textAlign: "center" }}>
                  {posts.length}개의 포스트가 로드되었습니다.
                </h6>
              }
            >
              {/* 유저의 모든 포스트 */}
              {posts.map((element, index) => (
                <PostBoard
                  key={index}
                  post={element.contents}
                  postId={element.id}
                  userId={element.UserId}
                  profileImg={
                    element.User.ProfileImgSrcs.length > 0
                      ? element.User.ProfileImgSrcs[0].src
                      : "userImage.jpg"
                  }
                  nickname={element.User.nickname}
                  like={element.like} //포스트 좋아요 수
                  Likes={
                    element.Likes.length > 0
                      ? element.Likes[0].LikeUserId
                      : false
                  } //포스트 좋아요 했는지 확인
                  reportCount={element.Reports}
                  PostImgSrcs={element.PostImgSrcs}
                  PostVideoSrcs={element.PostVideoSrcs}
                  onlyReadMy={element.onlyReadMy}
                  bookmarkId={
                    element.Bookmarks.length > 0
                      ? element.Bookmarks[0].UserId
                      : false
                  }
                  date={element.createdAt}
                  dataType={"posts"}
                />
              ))}
            </InfiniteScroll>
          </TabContainer>

          <TabContainer eventKey="Follow" title={<GoOrganization />}>
            {followPosts.length === 0 && <FollowAlert />}
            <FollowPage />
          </TabContainer>

          <TabContainer eventKey="bookmark" title={<BsBookmarksFill />}>
            <BookmarkMainpage />
          </TabContainer>
          <TabContainer eventKey="trash" title={<BsTrashFill />}>
            <TrashPostAlert />
            {trashPosts.map((element, index) => (
              <TrashPostForm
                key={index}
                postContents={element.contents}
                postId={element.postId}
                onlyReadMy={element.onlyReadMy}
                PostImgSrcs={element.imgSrc}
                PostVideoSrcs={element.videoSrc}
                date={element.createdAt}
              />
            ))}
          </TabContainer>
          <TabContainer eventKey="chart" title={<BsFillBarChartFill />}>
            {loadOneuserChartdataDone && <OneuserChartPage />}
          </TabContainer>
          <TabContainer eventKey="설정" title={<AiFillSetting />}>
            <SettingForm />
          </TabContainer>
        </Tabs>
        <PostBoardLoading />
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
      type: LOAD_POST_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default PersonalPostBoard;
