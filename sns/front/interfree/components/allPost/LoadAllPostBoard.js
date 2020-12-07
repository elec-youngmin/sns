import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import PostBoard from "../post/PostBoard";
import { useDispatch, useSelector } from "react-redux";

import { LOAD_ALLPOST_REQUEST } from "../../reducers/post";

const LoadALLPostBoard = () => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const LoadNextAllPosts = () => {
    const lastId = allPosts[allPosts.length - 1]?.id;
    dispatch({
      type: LOAD_ALLPOST_REQUEST,
      data: { lastId, userId: user.id },
    });
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={allPosts.length}
        next={LoadNextAllPosts}
        hasMore={true}
        loader={
          <h6 style={{ textAlign: "center" }}>
            {allPosts.length}개의 포스트가 로드되었습니다.
          </h6>
        }
      >
        {allPosts.map((element, index) => {
          return (
            <PostBoard
              key={index}
              userId={element.UserId}
              nickname={element.User.nickname}
              profileImg={
                element.User.ProfileImgSrcs.length > 0
                  ? element.User.ProfileImgSrcs[0].src
                  : "userImage.jpg"
              }
              post={element.contents}
              postId={element.id}
              follows={element.User.Follows}
              onlyReadMy={element.onlyReadMy}
              reportCount={
                element.Reports.length > 0 ? element.Reports[0].count : 0
              }
              bookmarkId={
                element.Bookmarks.length > 0 ? element.Bookmarks[0].UserId : 0
              }
              like={element.like}
              Likes={
                element.Likes.length > 0 ? element.Likes[0].LikeUserId : false
              } //포스트 좋아요 했는지 확인
              PostImgSrcs={element.PostImgSrcs}
              PostVideoSrcs={element.PostVideoSrcs}
              date={element.createdAt}
              dataType={"allPosts"}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

LoadALLPostBoard.propTypes = {
  allPost: PropTypes.array,
};

export default LoadALLPostBoard;
