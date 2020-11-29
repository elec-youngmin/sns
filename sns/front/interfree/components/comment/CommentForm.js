import React, { useState } from "react";
import PropTypes from "prop-types";

import { ADD_COMMENT_REQUEST } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";

import { Form, Button } from "react-bootstrap";

const CommentForm = (postId) => {
  return (
    <div>
      <Form.Group>
        <Form.Label style={{ width: "100%" }}></Form.Label>
        <Form.Control
          class="col-lg-12"
          as="textarea"
          rows={2}
          placeholder="댓글 추가..."
          style={{
            resize: "none",
          }}
          onChange={(e) => {
            SetComment(e.target.value);
          }}
        />
        <Button
          className="float-right"
          onClick={() => {
            dispatch({
              type: ADD_COMMENT_REQUEST,
              data: { comment, postOneId, id },
            });
          }}
          style={{
            margin: "2px",
          }}
        >
          추가
        </Button>
      </Form.Group>
    </div>
  );
};

export default CommentForm;
