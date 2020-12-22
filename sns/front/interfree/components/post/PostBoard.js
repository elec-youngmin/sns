import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Link from "next/link";
import { useRouter } from "next/router";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Avatar from "react-avatar";
import { Menu, Item, Separator, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import RevisePostForm from "./RevisePostForm";
import CommentModal from "../comment/CommentModal";
import PostReport from "./PostReport";
import FollowBotton from "../follow/FollowBotton";
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
  AiOutlineArrowRight,
} from "react-icons/ai";

import {
  BsPencil,
  BsTrash,
  BsBrightnessHigh,
  BsFillBookmarksFill,
} from "react-icons/bs";

import {
  Card,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Container,
} from "react-bootstrap";

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
  const { user } = useSelector((state) => state.user);
  const {
    updatePostDone,
    likePostLoading,
    cancelLikePostLoading,
    countReportDone,
  } = useSelector((state) => state.post);

  const [modalShow, setModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [CommentmodalShow, setCommentModalShow] = useState(false);
  const [likeCon, setLikeCon] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [userProfileImg, setUserProfileImg] = useState("userImage.jpg");
  const [replaceText, setReplaceText] = useState("글이 차단됨");

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

  useMemo(() => {
    if (user.ProfileImgSrcs.length !== 0) {
      setUserProfileImg(user.ProfileImgSrcs[0].src);
    }
  }, [user]);
  // console.log(follows);
  const MENU_ID = postId;

  const { show } = useContextMenu({
    id: MENU_ID,
  });

  return (
    <div onContextMenu={show} onDoubleClick={show}>
      <Menu id={MENU_ID}>
        <Item
          onClick={() => {
            router.push(`${frontUrl}/PostPage/${userId}/`);
          }}
        >
          포스트페이지로 이동
        </Item>
        <Item
          onClick={() => {
            router.push(`${frontUrl}/UserPage/${userId}/`);
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
      </Menu>
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
      <Container
        style={{
          marginBottom: "15px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "1px 1px 2px 2px #F8F8FF",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderBottom: "1px solid #D3D3D3",
            padding: "5px",
            boxShadow: "1px 1px 2px 2px #F8F8FF",
          }}
        >
          {profileImg ? (
            <img
              src={`${backUrl}/${profileImg}`}
              style={{
                maxWidth: "50px",
                minHeight: "auto",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`${frontUrl}/UserPage/${userId}/`);
              }}
            />
          ) : (
            <span
              style={{
                marginRight: "15px",
                width: "50px",
                height: "50px",
                backgroundColor: "#DCDCDC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                router.push(`${frontUrl}/UserPage/${userId}/`);
              }}
            >
              <p style={{ fontSize: "25px", fontWeight: "600" }}>
                {nickname[0]}
              </p>
            </span>
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
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              float: "right",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(`${frontUrl}/PostPage/${postId}/`);
            }}
          >
            <AiOutlineArrowRight />
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
        </div>
        <Container>
          {/* 내가 쓴 게시글인지 현재 로그인한 유저 아이디로 확인
          포스트를 작성한 유저와 현재 로그인한 유저가 같은가? */}
          <div
            style={{ borderBottom: "1px solid #D3D3D3", minHeight: "240px" }}
          >
            {userId === id && (
              <>
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
                    <BsTrash /> 쓰레기 통으로
                  </Dropdown.Item>
                </DropdownButton>
              </>
            )}

            {/* 포스트에 이미지가 있고 신고 수가 10 미만이면 이미지가 나타나게함 */}

            {PostImgSrcs?.length > 0 && reportCount < 9 && (
              <Zoom>
                <img
                  src={`${backUrl}/${PostImgSrcs[0].src}`}
                  alt={PostImgSrcs[0].src}
                  style={{
                    maxWidth: "40vw",
                    maxHeight: "auto",
                    marginBottom: "20px",
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
                    maxWidth: "100%",
                    maxHeight: "auto",
                    marginBottom: "20px",
                  }}
                ></video>
              </>
            )}

            {reportCount > 9 ? <h6>{replaceText}</h6> : <h4>{post}</h4>}
          </div>
          <Row>
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
              <p
                style={{
                  fontWeight: "15px",
                  fontWeight: "600",
                  margin: "0px",
                }}
              >
                댓글
              </p>
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
              <p
                style={{
                  fontWeight: "15px",
                  fontWeight: "600",
                  margin: "0px",
                }}
              >
                북마크
              </p>
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
              <p
                style={{
                  fontWeight: "15px",
                  fontWeight: "600",
                  margin: "0px",
                }}
              >
                신고
              </p>
            </Col>
          </Row>

          {/* 해시태그를 추출하는 로직 */}
          {post?.split(/(#[^\s#]+)/g).map((e, index) => {
            if (e.match(/(#[^\s#]+)/)) {
              return (
                <div>
                  <a
                    onClick={() => {
                      router.push(`${frontUrl}/HashtagPage/${e.slice(1)}/`);
                    }}
                  >
                    {e}
                  </a>
                </div>
              );
            }
          })}
        </Container>
        <Card.Footer
          style={{
            backgroundColor: "white",
            textAlign: "center",
            padding: "5px",
          }}
        >
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
        </Card.Footer>
      </Container>
    </div>
  );
};

export default PostBoard;
