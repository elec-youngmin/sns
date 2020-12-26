import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Menu as MenuContexify,
  Item,
  Separator,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import "rc-dropdown/assets/index.css";

import RevisePostForm from "./RevisePostForm";
import CommentModal from "../comment/CommentModal";
import PostReport from "./PostReport";
import FollowBotton from "../follow/FollowBotton";

import {
  BoardHeader,
  BoardBody,
  BoardFooter,
  ProfileImg,
  ProfileImgDiv,
  IconTitle,
} from "../../styledComponents/postBoard/Board";

import { useSelector, useDispatch } from "react-redux";

import {
  LIKE_POST_REQUEST,
  CANCEL_LIKE_POST_REQUEST,
  ADD_BOOKMARK_REQUEST,
  LOAD_COMMENT_REQUEST,
  DELETE_POST_REQUEST,
  CANCEL_BOOKMARK_REQUEST,
  LOAD_HASHTAGPAGE_REQUEST,
} from "../../reducers/post";

import {
  AiFillMessage,
  AiFillLike,
  AiTwotoneAlert,
  AiOutlineEllipsis,
} from "react-icons/ai";

import { BsBrightnessHigh, BsFillBookmarksFill } from "react-icons/bs";

import { Row, Col } from "react-bootstrap";

import { backUrl } from "../../config/config";
import { frontUrl } from "../../config/config";

const PostBoard = ({
  post,
  postId,
  userId,
  follows,
  nickname,
  like,
  Likes,
  reportCount,
  profileImg,
  PostImgSrcs,
  PostVideoSrcs,
  bookmarkId,
  onlyReadMy,
  date,
  dataType,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);
  const {
    updatePostDone,
    likePostLoading,
    cancelLikePostLoading,
    countReportDone,
  } = useSelector((state) => state.post);

  const [modalShow, setModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [CommentmodalShow, setCommentModalShow] = useState(false);
  const replaceText = "글이 차단됨";
  const dateSet = <Moment format="YYYY/MM/DD">{date}</Moment>;
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

  const MENU_ID = postId;

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  return (
    <div>
      {/* 여기부터 클릭메뉴  */}
      <MenuContexify id={MENU_ID}>
        <Item
          onClick={() => {
            router.push(`${frontUrl}/postPage/${postId}/`);
          }}
        >
          포스트페이지로 이동
        </Item>
        <Item
          onClick={() => {
            router.push(`${frontUrl}/userPage/${userId}/`);
          }}
        >
          유저페이지로 이동
        </Item>

        {id === userId && (
          <>
            <Separator />
            <Item onClick={() => setModalShow(true)}>수정</Item>
            <Item
              onClick={() => {
                dispatch({
                  type: DELETE_POST_REQUEST,
                  data: { postId },
                });
              }}
            >
              휴지통으로 이동
            </Item>
            <Separator />
          </>
        )}
      </MenuContexify>
      {/* 여기까지 클릭메뉴  */}
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
      {/* 여기부터 포스트보드 시작점 */}

      <div
        style={{
          border: "5px solid white",
          borderRadius: "12px",
          marginBottom: "15px",
          backgroundColor: "white",
        }}
      >
        {/* 포스트보드 헤더 시작 */}
        <BoardHeader>
          {profileImg ? (
            <ProfileImg
              src={`${backUrl}/${profileImg}`}
              onClick={() => {
                router.push(`${frontUrl}/userPage/${userId}/`);
              }}
            />
          ) : (
            <ProfileImgDiv
              onClick={() => {
                router.push(`${frontUrl}/userPage/${userId}/`);
              }}
            >
              <p style={{ fontSize: "25px", fontWeight: "600", margin: "0px" }}>
                {nickname[0].toUpperCase()}
              </p>
            </ProfileImgDiv>
          )}

          <span
            style={{
              fontWeight: "600",
              fontSize: "17px",
            }}
          >
            {nickname}
          </span>

          {/* id: 현재 로그인한 유저, userId: 이 포스트를 작성한 유저,
           id와 userId가 다르면 버튼이 나타나게 함. 본인이 작성한 포스트가 아니면
           팔로우 버튼이 나나타게됨. */}

          {id !== userId && (
            <FollowBotton userId={userId} follows={follows} postId={postId} />
          )}

          <span
            style={{
              float: "right",
              height: "100%",
              cursor: "pointer",
            }}
            onClick={show}
          >
            <AiOutlineEllipsis size={20} />
          </span>

          <br />
          {onlyReadMy && (
            <p
              style={{
                color: "#2E86C1",
                marginLeft: "10px",
                marginBottom: "4px",
                textAlign: "center",
              }}
            >
              onlyReadMy
            </p>
          )}
        </BoardHeader>
        {/* 여기부터 포스트보드 바디 시작 */}
        <BoardBody
          onClick={() => {
            router.push(`${frontUrl}/postPage/${postId}/`);
          }}
        >
          {/* 포스트에 이미지가 있고 신고 수가 10 미만이면 이미지가 나타나게함 */}

          {PostImgSrcs?.length > 0 && reportCount < 9 && (
            <Zoom>
              <img
                src={`${backUrl}/${PostImgSrcs[0].src}`}
                alt={PostImgSrcs[0].src}
                style={{
                  margin: "10px",
                  maxWidth: "38vw",
                  maxHeight: "auto",
                }}
              ></img>
            </Zoom>
          )}

          {/* 포스트에 비디오가 있고 신고 수가 10 미만이면 비디오가 나타나게함 */}

          {PostVideoSrcs?.length > 0 && reportCount < 9 && (
            <>
              <video
                id="myVideo"
                controls
                alt={`${PostVideoSrcs[0].src}`}
                src={`${backUrl}/${PostVideoSrcs[0].src}`}
                style={{
                  maxWidth: "38vw",
                  maxHeight: "auto",
                  margin: "10px",
                }}
              ></video>
            </>
          )}

          {reportCount > 9 ? (
            <h6>{replaceText}</h6>
          ) : (
            <h4
              style={{
                margin: "18px 5px 5px 10px",
              }}
            >
              {post}
            </h4>
          )}
        </BoardBody>
        <Row
          style={{
            borderTop: "1px solid #D3D3D3",
            borderBottom: "1px solid #D3D3D3",
          }}
        >
          <Col style={{ textAlign: "center", padding: "0px" }}>
            <AiFillMessage
              onClick={() => {
                setCommentModalShow(true);
                dispatch({ type: LOAD_COMMENT_REQUEST, data: { postId } });
              }}
              style={{
                fontSize: "20px",
                color: "#21B8A5",
                cursor: "pointer",
              }}
            />
            <IconTitle>댓글</IconTitle>
          </Col>
          <Col style={{ textAlign: "center", padding: "0px" }}>
            {bookmarkId === id ? (
              <>
                <BsFillBookmarksFill
                  onClick={() => {
                    dispatch({
                      type: CANCEL_BOOKMARK_REQUEST,
                      data: { id, postId, dataType },
                      //id: userId
                    });
                  }}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    cursor: "pointer",
                  }}
                />
              </>
            ) : (
              <BsFillBookmarksFill
                onClick={() => {
                  dispatch({
                    type: ADD_BOOKMARK_REQUEST,
                    data: { id, postId, dataType },
                  });
                }}
                style={{
                  fontSize: "20px",
                  color: "21B8A5",
                  cursor: "pointer",
                }}
              />
            )}
            <IconTitle>북마크</IconTitle>
          </Col>
          <Col style={{ textAlign: "center", padding: "0px" }}>
            <AiTwotoneAlert
              onClick={() => setReportModalShow(true)}
              style={{
                fontSize: "20px",
                color: "#21B8A5",
                cursor: "pointer",
              }}
            />
            <IconTitle>신고</IconTitle>
          </Col>
        </Row>
        {/* 해시태그를 추출하는 로직 */}
        {post?.split(/(#[^\s#]+)/g).map((e, index) => {
          if (e.match(/(#[^\s#]+)/)) {
            return (
              <div>
                <a
                  onClick={() => {
                    router.push(`${frontUrl}/hashtagPage/${e.slice(1)}/`);
                  }}
                >
                  {e}
                </a>
              </div>
            );
          }
        })}

        {/* 여기부터 보드 푸터 시작 */}

        <BoardFooter>
          <BsBrightnessHigh
            style={{
              fontSize: "20px",
              color: "#21B8A5",
              marginRight: "12px",
            }}
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
            {Likes === id ? (
              <AiFillLike
                size={25}
                style={{ color: "blue" }}
                onClick={() => {
                  if (cancelLikePostLoading) {
                    return alert("로딩중에 다시 누를 수 없어요");
                  }
                  dispatch({
                    type: CANCEL_LIKE_POST_REQUEST,
                    data: { userId: id, postId, dataType },
                  });
                }}
              />
            ) : (
              <AiFillLike
                size={25}
                onClick={() => {
                  if (likePostLoading) {
                    return alert("로딩중에 다시 누를 수 없어요");
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
        </BoardFooter>
      </div>
    </div>
  );
};

export default PostBoard;
