import React from "react";

import FollowUsercard from "./FollowUsercard";

import { useSelector } from "react-redux";

const FollowPage = () => {
  const { followPosts } = useSelector((state) => state.post);

  return (
    <div>
      <div
        className="col-md-10 container justify-content-center"
        style={{ paddingTop: "80px", textAlign: "center" }}
      >
        <div class="row">
          {followPosts.map((e) => {
            return (
              <span class="col-md-6">
                <FollowUsercard
                  imgSrc={e.src}
                  nickname={e.nickname}
                  introduce={e.introduce}
                  postsCount={e.postsCount}
                  followCount={e.followCount}
                  followingCount={e.followingCount}
                  ShareLink={e.ShareLink}
                  where={e.where}
                  userId={e.followingId}
                />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FollowPage;
