// 사용자의 프로필을 생성함.

import React from "react";

import {
  CardContainter,
  CardRow,
  ProfileImg,
  ProfileAvata,
  CountRow,
  CountCol,
} from "../../styledComponents/profile/ProfileCard";

const ProfileCard = ({
  profileImgSrc,
  nickname,
  introduce,
  postsCount,
  followCount,
  followingCount,
  shareLink,
  where,
}) => {
  return (
    <>
      <CardContainter>
        <CardRow>
          {profileImgSrc ? (
            <ProfileImg src={profileImgSrc} alt={profileImgSrc} />
          ) : (
            <ProfileAvata>
              <p style={{ fontSize: "25px", fontWeight: "600", margin: "0px" }}>
                {nickname[0].toUpperCase()}
              </p>
            </ProfileAvata>
          )}
        </CardRow>

        <p style={{ fontSize: "20px" }}>{nickname}</p>
        <p>{introduce}</p>

        <CountRow>
          <CountCol>포스트: {postsCount}</CountCol>
          <CountCol>팔로워: {followCount}</CountCol>
          <CountCol>팔로우: {followingCount}</CountCol>
        </CountRow>

        <p style={{ fontSize: "20px" }}>
          링크:
          {shareLink ? shareLink : "게재되지 않음"}
        </p>
        <p style={{ fontSize: "20px" }}>
          사는 곳:
          {where ? where : "게재되지 않음"}
        </p>
      </CardContainter>
    </>
  );
};

export default ProfileCard;
