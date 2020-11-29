import React, { useState, useMemo } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

import ReviseCommentForm from "./ReviseCommentForm";

import { DELETE_COMMENT_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

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
  const [modalShow, setModalShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { updateCommentDone } = useSelector((state) => state.post);

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

CommentBoard.propTypes = {
  // id, comments, date, writeUserId, postId, nickname
  id: PropTypes.number, //유저 id
  comments: PropTypes.string,
  date: PropTypes.string,
  writeUserId: PropTypes.number, //해당 포스트를 작성한 id
  postId: PropTypes.number,
  nickname: PropTypes.string,
};

export default CommentBoard;
