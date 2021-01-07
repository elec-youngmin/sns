import React from "react";

import { LOAD_TRASH_REQUEST } from "../reducers/post";
import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { useSelector } from "react-redux";

import AlertTab from "../components/layout/AlertTab";
import Title from "../components/layout/Title";
import NeedLoginAlert from "../components/login/NeedLoginAlert";
import TrashPostForm from "../components/trash/TrashPostForm";

import { SessionRow } from "../styledComponents/layout/Session";

import { Col } from "react-bootstrap";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const trash = () => {
  const { trashPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      {user.id === "guest" ? (
        <NeedLoginAlert />
      ) : (
        <>
          <div className="container justify-content-center">
            <SessionRow>
              <Col md={7}>
                <Title title={"휴지통"} />

                {trashPosts.length === 0 && (
                  <AlertTab
                    title={"휴지통에 포스트가 없어요."}
                    content={"휴지통을 사용하여 쓸모없는 포스트를 관리하세요."}
                  />
                )}

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
        </>
      )}
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
