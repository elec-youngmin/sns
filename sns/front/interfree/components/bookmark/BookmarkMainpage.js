import React from "react";

import PostBoard from "../post/PostBoard";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_BOOKMARK_REQUEST } from "../../reducers/post";

import { Button } from "react-bootstrap";

const BookmarkMainpage = () => {
  const { bookmarkPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const LoadNextbookmarkPosts = () => {
    const lastId = bookmarkPosts[bookmarkPosts.length - 1]?.id;
    dispatch({
      type: LOAD_BOOKMARK_REQUEST,
      data: { lastId, userId: user.id },
    });
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {bookmarkPosts.length > 0 &&
        bookmarkPosts.map((element, index) => (
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
              element.Likes.length > 0 ? element.Likes[0].LikeUserId : false
            } //포스트 좋아요 했는지 확인
            reportCount={element.Reports}
            PostImgSrcs={element.PostImgSrcs}
            PostVideoSrcs={element.PostVideoSrcs}
            onlyReadMy={element.onlyReadMy}
            bookmarkId={
              element.Bookmarks.length > 0 ? element.Bookmarks[0].UserId : false
            }
            date={element.updatedAt}
            dataType={"bookmark"}
          />
        ))}
      {bookmarkPosts.length > 0 && (
        <Button
          variant="primary"
          style={{ width: "100%", marginBottom: "30px" }}
          onClick={LoadNextbookmarkPosts}
        >
          더보기
        </Button>
      )}
    </div>
  );
};

export default BookmarkMainpage;
