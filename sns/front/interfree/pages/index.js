import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import LayOut from "../components/firstSeePage/LayOut";

import { LOAD_USER_INFOMATION_REQUEST } from "../reducers/user";

import { POST_LOAD_REQUEST } from "../reducers/post";

import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import axios from "axios";

const Index = () => {
  const dispatch = useDispatch();

  return (
    <>
      <LayOut />
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     console.log(context);
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//       type: LOAD_USER_INFOMATION_REQUEST,
//     });
//     context.store.dispatch({
//       type: POST_LOAD_REQUEST,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

export default Index;
