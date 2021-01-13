//사용자가 댓글을 올리면 나타나는 댓글 보드

import React, { useState, useMemo } from "react";
import Moment from "react-moment";

import ReviseCommentForm from "./ReviseCommentForm";

import { useDispatch, useSelector } from "react-redux";

import { DELETE_COMMENT_REQUEST } from "../../reducers/post";

import { Alert, Button } from "react-bootstrap";

//id는 댓글 id
const CommentBoard = ({
  id,
  comments,
  date,
  writeUserId,
  postId,
  nickname,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { updateCommentDone } = useSelector((state) => state.post);
  const [modalShow, setModalShow] = useState(false);

  useMemo(() => {
    if (updateCommentDone) {
      setModalShow(false);
    }
  }, [updateCommentDone]);

  return (
    <div>
      <ReviseCommentForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
        comments={comments}
        postId={postId}
      />

      <Alert show={true} variant="secondary">
        <Alert.Heading style={{ fontSize: "20x", whiteSpace: "normal" }}>
          {comments}
        </Alert.Heading>
        {nickname} <br />
        <Moment format="YYYY/MM/DD">{date}</Moment>
        {/* 로그인한 유저 ID와 댓글을 작성한 유저 ID가 같으면 삭제 버튼이 나타남 */}
        {user.id == writeUserId && (
          <>
            <Button
              className="float-right"
              variant="secondary"
              onClick={() => {
                dispatch({
                  type: DELETE_COMMENT_REQUEST,
                  data: { CommentId: id },
                });
              }}
              style={{
                padding: "3px",
              }}
            >
              삭제
            </Button>

            <Button
              variant="secondary"
              className="float-right"
              onClick={() => setModalShow(true)}
              style={{
                padding: "3px",
                marginRight: "5px",
              }}
            >
              수정
            </Button>
          </>
        )}
      </Alert>
    </div>
  );
};

export default CommentBoard;
