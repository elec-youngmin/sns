import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import PostBoard from "../post/PostBoard";

import { useDispatch, useSelector } from "react-redux";

import { LOAD_BOOKMARK_REQUEST } from "../../reducers/post";

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
    <div>
      <InfiniteScroll
        dataLength={bookmarkPosts.length}
        next={LoadNextbookmarkPosts}
        hasMore={true}
        loader={
          <h6 style={{ textAlign: "center" }}>
            {bookmarkPosts.length}개의 포스트가 로드되었습니다.
          </h6>
        }
      >
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
                element.Bookmarks.length > 0
                  ? element.Bookmarks[0].UserId
                  : false
              }
              date={element.updatedAt}
              dataType={"bookmark"}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default BookmarkMainpage;
