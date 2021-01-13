//포스트보드에서 생성되는 팔로우/ 언팔로우 버튼

import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../../reducers/post";

import { Button } from "react-bootstrap";

const FollowBotton = ({ userId, follows, postId }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.user);
  const { followUserLoading, unFollowUserLoading } = useSelector(
    (state) => state.post
  );

  const onSubmit = useCallback(() => {
    if (id === "guest") {
      return alert("로그인 후 이용하실 수 있어요.");
    }

    if (followUserLoading || unFollowUserLoading) {
      return alert("로딩 중에 누를 수 없어요.");
    }

    if (follows.length > 0) {
      //현재 팔로잉 되어 있으면 언팔로우
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: {
          followerId: id, //게시글을 보고 팔로워하는 사람의 id
          followingId: userId, //언팔로워 당하는 user table id
          postId,
        },
      });
    } else {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: {
          postId,
          followerId: id, //게시글을 보고 팔로워하는 사람의 id
          followingId: userId, //팔로워 당하는 user table id
        },
      });
    }
  }, [follows]);

  return (
    <>
      <Button
        style={{
          padding: "3px",
          marginLeft: "3px",
        }}
        onClick={onSubmit}
      >
        {follows?.length > 0 ? "언팔로우" : "팔로우"}
      </Button>
    </>
  );
};

export default FollowBotton;
