import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_KAKAO_LOGIN_REQUEST,
  USER_KAKAO_LOGIN_SUCCESS,
  USER_KAKAO_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  LOAD_USER_INFOMATION_REQUEST,
  LOAD_USER_INFOMATION_SUCCESS,
  LOAD_USER_INFOMATION_FAILURE,
  CONFIRM_CURRENT_LOGIN_REQUEST,
  CONFIRM_CURRENT_LOGIN_SUCCESS,
  CONFIRM_CURRENT_LOGIN_FAILURE,
  DESTROY_USER_REQUEST,
  DESTROY_USER_SUCCESS,
  DESTROY_USER_FAILURE,
  PROFILE_IMAGE_UPLOAD_REQUEST,
  PROFILE_IMAGE_UPLOAD_SUCCESS,
  PROFILE_IMAGE_UPLOAD_FAILURE,
  CHANGE_PROFILE_REQUEST,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILURE,
  FIND_PASSWORD_REQUEST,
  FIND_PASSWORD_SUCCESS,
  FIND_PASSWORD_FAILURE,
  FIND_PASSWORD_MYCONFIRM_REQUEST,
  FIND_PASSWORD_MYCONFIRM_SUCCESS,
  FIND_PASSWORD_MYCONFIRM_FAILURE,
  RESETTING_PASSWORD_REQUEST,
  RESETTING_PASSWORD_SUCCESS,
  RESETTING_PASSWORD_FAILURE,
  LOAD_FOLLOWING_USER_REQUEST,
  LOAD_FOLLOWING_USER_SUCCESS,
  LOAD_FOLLOWING_USER_FAILURE,
  DISABLED_ONEUSER_ALLPOST_REQUEST,
  DISABLED_ONEUSER_ALLPOST_SUCCESS,
  DISABLED_ONEUSER_ALLPOST_FAILURE,
  ACTIVATE_ONEUSER_ALLPOST_REQUEST,
  ACTIVATE_ONEUSER_ALLPOST_SUCCESS,
  ACTIVATE_ONEUSER_ALLPOST_FAILURE,
} from "../reducers/user";

function signUpAPI(data) {
  return axios.post("user/signUp", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: USER_SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post("user/login", data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    // console.log(result);
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function kakaoLoginAPI() {
  return axios.get("user/kakaoLogin");
}

function* kakaoLogin(action) {
  try {
    const result = yield call(kakaoLoginAPI, action.data);
    console.log(result);
    yield put({
      type: USER_KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_KAKAO_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("user/logout");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);
    console.log(result);
    yield put({
      type: USER_LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfomationAPI() {
  return axios.post("user/loadUserInfomation");
}

function* loadUserInfomation() {
  try {
    const result = yield call(loadUserInfomationAPI);
    console.log(result);
    yield put({
      type: LOAD_USER_INFOMATION_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_INFOMATION_FAILURE,
      error: err.response.data,
    });
  }
}

function confirmCurrentLoginAPI() {
  return axios.get("user/confirmCurrentLogin");
}

function* confirmCurrentLogin() {
  try {
    const result = yield call(confirmCurrentLoginAPI);
    console.log(result);
    yield put({
      type: CONFIRM_CURRENT_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CONFIRM_CURRENT_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function destroyUserAPI(data) {
  return axios.post("user/destroyUser", data);
}

function* destroyUser(action) {
  try {
    const result = yield call(destroyUserAPI, action.data);
    console.log(result);
    yield put({
      type: DESTROY_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DESTROY_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function profileImageAPI(data) {
  return axios.post(encodeURI("user/profileImage"), data);
}

function* profileImage(action) {
  try {
    const result = yield call(profileImageAPI, action.data);
    console.log(result);
    yield put({
      type: PROFILE_IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PROFILE_IMAGE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

function changeProfileAPI(data) {
  return axios.patch("user/changeProfile", data);
}

function* changeProfile(action) {
  try {
    const result = yield call(changeProfileAPI, action.data);
    console.log(result);
    yield put({
      type: CHANGE_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_PROFILE_FAILURE,
      error: err.response.data,
    });
  }
}

function findPasswordAPI(data) {
  return axios.post("user/findPassword", data);
}

function* findPassword(action) {
  try {
    const result = yield call(findPasswordAPI, action.data);
    console.log(result);
    yield put({
      type: FIND_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function findPasswordMyConfirmAPI(data) {
  return axios.get(`user/email/${data.id}`);
}

function* findPasswordMyConfirm(action) {
  try {
    const result = yield call(findPasswordMyConfirmAPI, action.data);
    console.log(result);
    yield put({
      type: FIND_PASSWORD_MYCONFIRM_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_PASSWORD_MYCONFIRM_FAILURE,
      error: err.response.data,
    });
  }
}

function resettingPasswordAPI(data) {
  return axios.post("user/resettingPassword", data);
}

function* resettingPassword(action) {
  try {
    const result = yield call(resettingPasswordAPI, action.data);
    console.log(result);
    yield put({
      type: RESETTING_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESETTING_PASSWORD_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowingUserAPI(data) {
  return axios.post("user/loadFollowingUser", data);
}

function* loadFollowingUser(action) {
  try {
    const result = yield call(loadFollowingUserAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_FOLLOWING_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWING_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function disabledOneUserAllpostAPI(data) {
  return axios.get("user/disabledOneUserAllpost", data);
}

function* disabledOneUserAllpost(action) {
  try {
    const result = yield call(disabledOneUserAllpostAPI, action.data);
    console.log(result);
    yield put({
      type: DISABLED_ONEUSER_ALLPOST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DISABLED_ONEUSER_ALLPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function activateOneUserAllpostAPI(data) {
  return axios.get("user/activateOneUserAllpost", data);
}

function* activateOneUserAllpost(action) {
  try {
    const result = yield call(activateOneUserAllpostAPI, action.data);
    console.log(result);
    yield put({
      type: ACTIVATE_ONEUSER_ALLPOST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ACTIVATE_ONEUSER_ALLPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSignUp() {
  yield takeLatest(USER_SIGNUP_REQUEST, signUp);
}

function* watchLogin() {
  yield takeLatest(USER_LOGIN_REQUEST, login);
}

function* watchKakaoLogin() {
  yield takeLatest(USER_KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchLogOut() {
  yield takeLatest(USER_LOGOUT_REQUEST, logOut);
}

function* watchLoadUserInfomation() {
  yield takeLatest(LOAD_USER_INFOMATION_REQUEST, loadUserInfomation);
}

function* watchConfirmCurrentLogin() {
  yield takeLatest(CONFIRM_CURRENT_LOGIN_REQUEST, confirmCurrentLogin);
}

function* watchDestroyUser() {
  yield takeLatest(DESTROY_USER_REQUEST, destroyUser);
}

function* watchProfileImage() {
  yield takeLatest(PROFILE_IMAGE_UPLOAD_REQUEST, profileImage);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_PROFILE_REQUEST, changeProfile);
}

function* watchFindPassword() {
  yield takeLatest(FIND_PASSWORD_REQUEST, findPassword);
}

function* watchFindPasswordMyConfirm() {
  yield takeLatest(FIND_PASSWORD_MYCONFIRM_REQUEST, findPasswordMyConfirm);
}

function* watchResettingPassword() {
  yield takeLatest(RESETTING_PASSWORD_REQUEST, resettingPassword);
}

function* watchLoadFollowingUser() {
  yield takeLatest(LOAD_FOLLOWING_USER_REQUEST, loadFollowingUser);
}

function* watchDisabledOneUserAllpost() {
  yield takeLatest(DISABLED_ONEUSER_ALLPOST_REQUEST, disabledOneUserAllpost);
}

function* watchActivateOneUserAllpost() {
  yield takeLatest(ACTIVATE_ONEUSER_ALLPOST_REQUEST, activateOneUserAllpost);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogin),
    fork(watchKakaoLogin),
    fork(watchLogOut),
    fork(watchLoadUserInfomation),
    fork(watchConfirmCurrentLogin),
    fork(watchDestroyUser),
    fork(watchProfileImage),
    fork(watchChangeNickname),
    fork(watchFindPassword),
    fork(watchFindPasswordMyConfirm),
    fork(watchResettingPassword),
    fork(watchLoadFollowingUser),
    fork(watchDisabledOneUserAllpost),
    fork(watchActivateOneUserAllpost),
  ]);
}
