//친구 탭에서 볼 수 있는 친구 리스트 

import React from "react";

import ProfileCard from "../profile/ProfileCard";

import { useSelector } from "react-redux";

const FollowList = () => {
  const { followPosts } = useSelector((state) => state.post);

  return (
    <div>
      {followPosts.map((e) => {
        return (
          <>
            <ProfileCard
              profileImgSrc={e.src ? e.src : false}
              nickname={e.nickname}
              introduce={e.introduce}
              postsCount={e.postsCount}
              followCount={e.followCount}
              followingCount={e.followingCount}
              shareLink={e.ShareLink}
              where={e.where}
            />
          </>
        );
      })}
    </div>
  );
};

export default FollowList;
