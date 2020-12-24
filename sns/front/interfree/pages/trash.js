import React from "react";

import { LOAD_TRASH_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { useDispatch, useSelector } from "react-redux";

import Title from "../components/layout/Title";
import TrashPostAlert from "../components/trash/TrashPostAlert";
import TrashPostForm from "../components/trash/TrashPostForm";

import { SessionRow } from "../styledComponents/layout/Session";

import { Row, Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const trash = () => {
  const { trashPosts } = useSelector((state) => state.post);
  return (
    <div>
      <div className="container justify-content-center">
        <SessionRow>
          <Col md={7}>
            <Title title={"휴지통"} />
            <TrashPostAlert />
            {trashPosts.map((element, index) => (
              <TrashPostForm
                key={index}
                postContents={element.contents}
                postId={element.postId}
                onlyReadMy={element.onlyReadMy}
                PostImgSrcs={element.imgSrc}
                PostVideoSrcs={element.videoSrc}
                date={element.createdAt}
              />
            ))}
          </Col>
        </SessionRow>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_USER_INFOMATION_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_TRASH_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default trash;
