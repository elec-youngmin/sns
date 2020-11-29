import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Link from "next/Link";

import RevisePostForm from "../post/RevisePostForm";
import CommentModal from "../comment/CommentModal";
import PostReport from "../post/PostReport";
import FollowBotton from "./FollowBotton";
import Loading from "../loading/Loading";

import { useSelector, useDispatch } from "react-redux";

import { AiFillMessage, AiFillLike, AiTwotoneAlert } from "react-icons/ai";

import {
  BsPencil,
  BsTrash,
  BsFillCalendarFill,
  BsBrightnessHigh,
  BsFillBookmarksFill,
} from "react-icons/bs";

import {
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Spinner,
  Toast,
} from "react-bootstrap";

import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../../reducers/user";

import {
  LIKE_POST_REQUEST,
  ADD_BOOKMARK_REQUEST,
  LOAD_COMMENT_REQUEST,
  DELETE_POST_REQUEST,
  LOAD_USERPAGE_REQUEST,
  CANCEL_BOOKMARK_REQUEST,
} from "../../reducers/post";

const PostBoard = ({
  post,
  postId,
  userId,
  nickname,
  like,
  Likes,
  reportCount,
  PostImgSrcs,
  PostVideoSrcs,
  bookmarkId,
  onlyReadMy,
  date,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { counter } = useSelector((state) => state.report.reports);
  const { id } = useSelector((state) => state.user.user);
  const { followUserLoading, followUserDone, user } = useSelector(
    (state) => state.user
  );

  const profileImg = user.ProfileImgSrcs[0]?.src;

  const {
    deletePostLoading,
    updatePostDone,
    addBookmarkDone,
    likePostLoading,
    cancelLikePostLoading,
    addBookmarkLoading,
    countReportDone,
  } = useSelector((state) => state.post);

  const [modalShow, setModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [CommentmodalShow, setCommentModalShow] = useState(false);
  const [likeCon, setLikeCon] = useState(false);

  const [show, setShow] = useState(false);
  const [replaceText, setReplaceText] = useState(
    "신고가 많은 글 입니다. 자동 블라인드 처리 되었습니다. 심의가 끝나면 삭제되거나 다시 공개됩니다."
  );

  const dateSet = <Moment format="YYYY/MM/DD">{date}</Moment>;

  const moveUserPage = () => {
    dispatch({
      type: LOAD_USERPAGE_REQUEST,
      data: { userId, postId },
    });
    router.push(`UserPage/${userId}/`);
  };

  useMemo(() => {
    if (updatePostDone) {
      setModalShow(false);
    }
  }, [updatePostDone]);

  useMemo(() => {
    if (countReportDone) {
      setReportModalShow(false);
    }
  }, [countReportDone]);

  //유저가 좋아요를 누른 이력이 있는지 확인
  useEffect(() => {
    Likes.map((e) => {
      if (e.LikeUserId === id) {
        setLikeCon(true);
      }
    });
  }, [Likes]);

  return (
    <div>
      <RevisePostForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        posts={post}
        postId={postId}
      />

      <CommentModal
        postId={postId}
        show={CommentmodalShow}
        onHide={() => setCommentModalShow(false)}
      />

      <PostReport
        show={reportModalShow}
        postId={postId}
        onHide={() => setReportModalShow(false)}
      />

      <Card style={{ marginBottom: "15px" }}>
        <Card.Header style={{ backgroundColor: "white", padding: "7px" }}>
          {profileImg ? (
            <img
              src={`http://localhost:80/${profileImg}`}
              style={{
                maxWidth: "50px",
                minHeight: "auto",
                marginRight: "2px",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={moveUserPage}
            ></img>
          ) : (
            <img
              src={`http://localhost:80/userImage.jpg`}
              style={{
                width: "30px",
                height: "30px",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={moveUserPage}
            ></img>
          )}
          <span
            style={{
              fontWeight: "600",
              fontSize: "17px",
            }}
          >
            {nickname}
          </span>
          <br />
          {/* id: 현재 로그인한 유저, userId: 이 포스트를 작성한 유저,
           id와 userId가 다르면 버튼이 나타나게 함. 본인이 작성한 포스트가 아니면
           팔로우 버튼이 나나타게됨. */}
          {id !== userId && <FollowBotton userId={userId} />}
        </Card.Header>
        <Card.Body>
          <DropdownButton
            variant="light"
            className="float-right"
            title={<BsPencil />}
            drop="left"
          >
            <Dropdown.Item onClick={() => setModalShow(true)}>
              <BsPencil /> 수정
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch({
                  type: DELETE_POST_REQUEST,
                  data: { postId },
                });
              }}
            >
              {deletePostLoading && <Spinner animation="border" />}
              <BsTrash /> 쓰레기 통으로
            </Dropdown.Item>
          </DropdownButton>
          <Card.Text>
            {PostImgSrcs.length > 0 && reportCount < 9 && (
              <>
                <img
                  src={`http://localhost:80/${PostImgSrcs[0].src}`}
                  alt={PostImgSrcs[0].src}
                  style={{
                    maxWidth: "40vw",
                    maxHeight: "auto",
                    marginBottom: "20px",
                  }}
                ></img>
              </>
            )}
            {PostVideoSrcs.length > 0 && reportCount < 9 && (
              <>
                <video
                  id="myVideo"
                  controls
                  src={`http://localhost:80/${PostVideoSrcs[0].src}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "auto",
                    marginBottom: "20px",
                  }}
                ></video>
              </>
            )}
            {reportCount > 9 ? <h6>{replaceText}</h6> : <h6>{post}</h6>}
            <AiFillMessage
              onClick={() => {
                setCommentModalShow(true);
                dispatch({ type: LOAD_COMMENT_REQUEST, data: { postId } });
              }}
              style={{
                fontSize: "20px",
                marginRight: "20px",
                color: "#21B8A5",
                cursor: "pointer",
              }}
            />

            {/* 북마크 아이콘 */}
            {bookmarkId === id ? (
              <BsFillBookmarksFill
                onClick={() => {
                  dispatch({
                    type: CANCEL_BOOKMARK_REQUEST,
                    data: { id, postId },
                    //id: userId
                  });
                }}
                style={{
                  fontSize: "20px",
                  marginRight: "20px",
                  color: "blue",
                  cursor: "pointer",
                }}
              />
            ) : (
              <BsFillBookmarksFill
                onClick={() => {
                  dispatch({
                    type: ADD_BOOKMARK_REQUEST,
                    data: { id, postId },
                  });
                }}
                style={{
                  fontSize: "20px",
                  marginRight: "20px",
                  color: "21B8A5",
                  cursor: "pointer",
                }}
              />
            )}
            <AiTwotoneAlert
              onClick={() => setReportModalShow(true)}
              style={{
                fontSize: "20px",
                color: "#21B8A5",
                cursor: "pointer",
              }}
            />
          </Card.Text>
          {/* 해시태그를 추출하는 로직 */}
          {post.split(/(#[^\s#]+)/g).map((v, i) => {
            if (v.match(/(#[^\s#]+)/)) {
              return (
                <div>
                  <Link href={`/hashtag/${v.slice(1)}`} key={i}>
                    <a>{v}</a>
                  </Link>
                </div>
              );
            }
          })}
        </Card.Body>
        <Card.Footer
          style={{
            backgroundColor: "white",
            textAlign: "center",
            padding: "5px",
          }}
        >
          <BsBrightnessHigh
            style={{ fontSize: "20px", color: "#21B8A5", marginRight: "12px" }}
          />
          {dateSet}
          <button
            type="button"
            class="btn btn-light"
            style={{
              padding: "2px",
              marginLeft: "12px",
              backgroundColor: "white",
            }}
          >
            {likeCon ? (
              <AiFillLike
                size={25}
                style={{ color: "blue" }}
                onClick={() => {
                  if (cancelLikePostLoading) {
                    return;
                  }
                  dispatch({
                    type: CANCEL_LIKE_POST_REQUEST,
                    data: { userId: id, postId },
                  });
                }}
              />
            ) : (
              <AiFillLike
                size={25}
                onClick={() => {
                  if (likePostLoading) {
                    return;
                  }
                  dispatch({
                    type: LIKE_POST_REQUEST,
                    data: { userId: id, postId },
                  });
                }}

                // 좋아요 다시 클릭하면 좋아요 취소
              />
            )}

            <span class="badge badge-light">{like}</span>
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default PostBoard;
