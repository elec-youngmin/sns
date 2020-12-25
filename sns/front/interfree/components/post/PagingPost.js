import React from "react";

import PostBoard from "./PostBoard";

import { useSelector } from "react-redux";

const PagingPost = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <div>
      {posts.map((element, index) => (
        <PostBoard
          key={index}
          post={element.contents}
          postId={element.id}
          userId={element.UserId}
          profileImg={
            element.User.ProfileImgSrcs.length > 0
              ? element.User.ProfileImgSrcs[0].src
              : false
          }
          nickname={element.User.nickname}
          like={element.like} //포스트 좋아요 수
          Likes={element.Likes.length > 0 ? element.Likes[0].LikeUserId : false} //포스트 좋아요 했는지 확인
          reportCount={element.Reports}
          PostImgSrcs={element.PostImgSrcs}
          PostVideoSrcs={element.PostVideoSrcs}
          onlyReadMy={element.onlyReadMy}
          bookmarkId={
            element.Bookmarks.length > 0 ? element.Bookmarks[0].UserId : false
          }
          date={element.createdAt}
        />
      ))}
    </div>
  );
};

export default PagingPost;
