//사용자가 작성한 포스트를 보여주는 포스트 보드

import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import ReactPlayer from "react-player";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import {
  Menu as MenuContexify,
  Item,
  Separator,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import RevisePostForm from "./RevisePostForm";
import CommentModal from "../comment/CommentModal";
import PostReport from "./PostReport";
import FollowBotton from "../follow/FollowBotton";

import {
  BoardContainer,
  BoardHeader,
  BoardBody,
  BoardFooter,
  ProfileImg,
  ProfileImgDiv,
  IconTitle,
  NicknameSpan,
  ProfileNickname,
  AddMenu,
  OnlyReadMy,
  LikeButton,
  ImgContainter,
  ZoomImg,
  TextPostContent,
  IconRow,
  IconCol,
  IconAiFillMessage,
  IconBsFillBookmarksFill,
  IconActBsFillBookmarksFill,
  IconAiTwotoneAlert,
  IconBsBrightnessHigh,
} from "../../styledComponents/postBoard/Board";

import { useSelector, useDispatch } from "react-redux";

import {
  LIKE_POST_REQUEST,
  CANCEL_LIKE_POST_REQUEST,
  ADD_BOOKMARK_REQUEST,
  LOAD_COMMENT_REQUEST,
  DELETE_POST_REQUEST,
  CANCEL_BOOKMARK_REQUEST,
} from "../../reducers/post";

import { AiFillLike, AiOutlineEllipsis } from "react-icons/ai";

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
  const dispatch = useDispatch();
  const router = useRouter();
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
            router.push(`${frontUrl}/post/${postId}/`);
          }}
        >
          포스트페이지로 이동
        </Item>
        <Item
          onClick={() => {
            router.push(`${frontUrl}/user/${userId}/`);
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
      <BoardContainer>
        {/* 포스트보드 헤더 시작 */}
        <BoardHeader>
          {profileImg ? (
            <ProfileImg
              src={profileImg}
              alt={profileImg}
              onClick={() => {
                router.push(`${frontUrl}/user/${userId}/`);
              }}
            />
          ) : (
            <ProfileImgDiv
              onClick={() => {
                router.push(`${frontUrl}/user/${userId}/`);
              }}
            >
              <ProfileNickname>{nickname[0].toUpperCase()}</ProfileNickname>
            </ProfileImgDiv>
          )}

          <NicknameSpan>{nickname}</NicknameSpan>

          {/* id: 현재 로그인한 유저, userId: 이 포스트를 작성한 유저,
           id와 userId가 다르면 버튼이 나타나게 함. 본인이 작성한 포스트가 아니면
           팔로우 버튼이 나나타게됨. */}

          {id !== userId && (
            <FollowBotton userId={userId} follows={follows} postId={postId} />
          )}

          <AddMenu onClick={show}>
            <AiOutlineEllipsis size={20} />
          </AddMenu>

          <br />
          {onlyReadMy && <OnlyReadMy>onlyReadMy</OnlyReadMy>}
        </BoardHeader>
        {/* 여기부터 포스트보드 바디 시작 */}

        <BoardBody>
          {/* 포스트에 이미지가 있고 신고 수가 10 미만이면 이미지가 나타나게함 */}

          {PostImgSrcs?.length > 0 && reportCount < 9 && (
            <>
              <ImgContainter>
                <Zoom>
                  <picture>
                    <ZoomImg
                      alt={PostImgSrcs[0].src}
                      src={PostImgSrcs[0].src}
                    />
                  </picture>
                </Zoom>
              </ImgContainter>
            </>
          )}

          {/* 포스트에 비디오가 있고 신고 수가 10 미만이면 비디오가 나타나게함 */}

          {PostVideoSrcs?.length > 0 && reportCount < 9 && (
            <>
              <ReactPlayer
                url={PostVideoSrcs[0].src}
                controls
                pip={true}
                width="100%"
                height="100%"
              />
            </>
          )}

          {reportCount > 9 ? (
            <h6>{replaceText}</h6>
          ) : (
            <TextPostContent>
              {post?.replace(/(#[^\s#]+)/g, "")}
            </TextPostContent>
          )}
        </BoardBody>

        <IconRow>
          <IconCol>
            <IconAiFillMessage
              onClick={() => {
                setCommentModalShow(true);
                dispatch({ type: LOAD_COMMENT_REQUEST, data: { postId } });
              }}
            />
            <IconTitle>댓글</IconTitle>
          </IconCol>

          <IconCol>
            {bookmarkId === id ? (
              <>
                <IconActBsFillBookmarksFill
                  onClick={() => {
                    dispatch({
                      type: CANCEL_BOOKMARK_REQUEST,
                      data: { id, postId },
                      //id: userId
                    });
                  }}
                />
              </>
            ) : (
              <IconBsFillBookmarksFill
                onClick={() => {
                  if (id === "guest") {
                    return alert("로그인 후 이용할 수 있어요.");
                  }

                  dispatch({
                    type: ADD_BOOKMARK_REQUEST,
                    data: { postId },
                  });
                }}
              />
            )}
            <IconTitle>북마크</IconTitle>
          </IconCol>

          <IconCol>
            <IconAiTwotoneAlert
              onClick={() => {
                if (id === "guest") {
                  return alert("로그인 후 이용하실 수 있어요.");
                }
                setReportModalShow(true);
              }}
            />
            <IconTitle>신고</IconTitle>
          </IconCol>
        </IconRow>

        {/* 해시태그를 추출하는 로직 */}
        {post?.split(/(#[^\s#]+)/g).map((e, index) => {
          if (e.match(/(#[^\s#]+)/)) {
            return (
              <div style={{ marginLeft: "6px" }}>
                <a
                  onClick={() => {
                    router.push(`${frontUrl}/hashtag/${e.slice(1)}/`);
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
          <IconBsBrightnessHigh />
          {dateSet}
          <LikeButton type="button" class="btn btn-light">
            {Likes === id ? (
              <AiFillLike
                size={25}
                style={{ color: "blue" }}
                onClick={() => {
                  if (id === "guest") {
                    return alert("로그인 후 이용하실 수 있어요.");
                  }
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
                  if (id === "guest") {
                    return alert("로그인 후 이용하실 수 있어요.");
                  }
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
          </LikeButton>
        </BoardFooter>
      </BoardContainer>
    </div>
  );
};

export default PostBoard;
