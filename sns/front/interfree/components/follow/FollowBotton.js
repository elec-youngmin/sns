import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import Loading from "../loading/Loading";

import { useDispatch, useSelector } from "react-redux";
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../../reducers/user";

import { Button } from "react-bootstrap";

const FollowBotton = ({ userId, follows }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);
  const [isCurrentFollowing, setIsCurrentFollowing] = useState(false);
  console.log(userId);
  // console.log(follows);

  //팔로잉 목록 중에서 포스트를 작성한 유저가 있는지 확인
  //  존재하면 언팔로우 버튼, 존재하지 않으면 팔로우 버튼
  // userId: 이 포스트를 작성한 유저
  // useMemo(() => {
  //   follows.map((element) => {
  //     if (element.id == id) {
  //       setIsCurrentFollowing(true);
  //     }
  //   });
  // }, [allPosts]);

  // useMemo(() => {
  //   if (allPosts.User.Follows.length === 0) {
  //     setIsCurrentFollowing(false);
  //   }
  // }, [allPosts]);
  return (
    <>
      <Button
        style={{
          padding: "3px",
          margin: "10px",
        }}
        onClick={() => {
          if (isCurrentFollowing === true) {
            //현재 팔로잉 되어 있으면 언팔로우
            dispatch({
              type: UNFOLLOW_USER_REQUEST,
              data: {
                followerId: id, //게시글을 보고 팔로워하는 사람의 id
                followingId: userId, //언팔로워 당하는 user table id
              },
            });
          } else {
            dispatch({
              type: FOLLOW_USER_REQUEST,
              data: {
                followerId: id, //게시글을 보고 팔로워하는 사람의 id
                followingId: userId, //팔로워 당하는 user table id
              },
            });
          }
        }}
      >
        {isCurrentFollowing ? "언팔로우" : "팔로우"}
      </Button>
    </>
  );
};

FollowBotton.propTypes = {
  userId: PropTypes.number,
};

export default FollowBotton;
