import { all, fork } from "redux-saga/effects";
import axios from "axios";

// import postSaga from "./post";
import userSaga from "./user";
import postSaga from "./post";

import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl; //데이터를 보낼때 중복되는 주소
axios.defaults.withCredentials = true;
// axios.defaults.session.sameSite = "None";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
