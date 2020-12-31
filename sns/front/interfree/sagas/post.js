import { all, fork, put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  LOAD_ALLPOST_REQUEST,
  LOAD_ALLPOST_SUCCESS,
  LOAD_ALLPOST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  LOAD_TRASH_REQUEST,
  LOAD_TRASH_SUCCESS,
  LOAD_TRASH_FAILURE,
  DELETE_ALLTRASH_REQUEST,
  DELETE_ALLTRASH_SUCCESS,
  DELETE_ALLTRASH_FAILURE,
  DELETE_TRASHPOST_REQUEST,
  DELETE_TRASHPOST_SUCCESS,
  DELETE_TRASHPOST_FAILURE,
  RESTORE_ALLTRASH_REQUEST,
  RESTORE_ALLTRASH_SUCCESS,
  RESTORE_ALLTRASH_FAILURE,
  RESTORE_TRASHPOST_REQUEST,
  RESTORE_TRASHPOST_SUCCESS,
  RESTORE_TRASHPOST_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  CANCEL_BOOKMARK_REQUEST,
  CANCEL_BOOKMARK_SUCCESS,
  CANCEL_BOOKMARK_FAILURE,
  LOAD_BOOKMARK_REQUEST,
  LOAD_BOOKMARK_SUCCESS,
  LOAD_BOOKMARK_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  IMAGE_SAVE_REQUEST,
  IMAGE_SAVE_SUCCESS,
  IMAGE_SAVE_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  CANCEL_LIKE_POST_REQUEST,
  CANCEL_LIKE_POST_SUCCESS,
  CANCEL_LIKE_POST_FAILURE,
  LOAD_FOLLOWS_POST_REQUEST,
  LOAD_FOLLOWS_POST_SUCCESS,
  LOAD_FOLLOWS_POST_FAILURE,
  COUNT_REPORT_REQUEST,
  COUNT_REPORT_SUCCESS,
  COUNT_REPORT_FAILURE,
  LOAD_USERPAGE_REQUEST,
  LOAD_USERPAGE_SUCCESS,
  LOAD_USERPAGE_FAILURE,
  LOAD_USERPAGE_INFO_REQUEST,
  LOAD_USERPAGE_INFO_SUCCESS,
  LOAD_USERPAGE_INFO_FAILURE,
  LOAD_HASHTAGPAGE_REQUEST,
  LOAD_HASHTAGPAGE_SUCCESS,
  LOAD_HASHTAGPAGE_FAILURE,
  LOAD_CHARTDATA_REQUEST,
  LOAD_CHARTDATA_SUCCESS,
  LOAD_CHARTDATA_FAILURE,
  LOAD_ONEUSER_CHARTDATA_REQUEST,
  LOAD_ONEUSER_CHARTDATA_SUCCESS,
  LOAD_ONEUSER_CHARTDATA_FAILURE,
  LOAD_POSTPAGE_REQUEST,
  LOAD_POSTPAGE_SUCCESS,
  LOAD_POSTPAGE_FAILURE,
  SEARCH_INPUT_TEXT_REQUEST,
  SEARCH_INPUT_TEXT_SUCCESS,
  SEARCH_INPUT_TEXT_FAILURE,
  SEARCH_RESULT_REQUEST,
  SEARCH_RESULT_SUCCESS,
  SEARCH_RESULT_FAILURE,
  SEARCH_FRIEND_REQUEST,
  SEARCH_FRIEND_SUCCESS,
  SEARCH_FRIEND_FAILURE,
  SEARCH_FRIEND_RESULT_REQUEST,
  SEARCH_FRIEND_RESULT_SUCCESS,
  SEARCH_FRIEND_RESULT_FAILURE,
  ADD_TIMELINE_SUBJECT_REQUEST,
  ADD_TIMELINE_SUBJECT_SUCCESS,
  ADD_TIMELINE_SUBJECT_FAILURE,
  ADD_TIMELINE_CONTENTS_REQUEST,
  ADD_TIMELINE_CONTENTS_SUCCESS,
  ADD_TIMELINE_CONTENTS_FAILURE,
  LOAD_TIMELINE_SUBJECT_REQUEST,
  LOAD_TIMELINE_SUBJECT_SUCCESS,
  LOAD_TIMELINE_SUBJECT_FAILURE,
  LOAD_TIMELINE_CONTENTS_REQUEST,
  LOAD_TIMELINE_CONTENTS_SUCCESS,
  LOAD_TIMELINE_CONTENTS_FAILURE,
  DELETE_TIMELINE_CONTENTS_REQUEST,
  DELETE_TIMELINE_CONTENTS_SUCCESS,
  DELETE_TIMELINE_CONTENTS_FAILURE,
  UPDATE_TIMELINE_CONTENTS_REQUEST,
  UPDATE_TIMELINE_CONTENTS_SUCCESS,
  UPDATE_TIMELINE_CONTENTS_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from "../reducers/post";

function savePostAPI(data) {
  return axios.post("post/save", data);
}

function* savePost(action) {
  try {
    const result = yield call(savePostAPI, action.data);
    console.log(result);
    yield put({
      type: SAVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.post("post/load", { id: data });
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadAllpostAPI(data) {
  return axios.post("post/allPostLoad", { id: data });
}

function* loadAllpost(action) {
  try {
    const result = yield call(loadAllpostAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_ALLPOST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ALLPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostAPI(data) {
  return axios.patch("post/updatePost", data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    console.log(result);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function deletePostAPI(data) {
  return axios.post("post/deletePost", data);
}

function* deletePost(action) {
  try {
    const result = yield call(deletePostAPI, action.data);
    console.log(result);
    yield put({
      type: DELETE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadTrashAPI() {
  return axios.get("post/loadTrash");
}

function* loadTrash() {
  try {
    const result = yield call(loadTrashAPI);
    console.log(result);
    yield put({
      type: LOAD_TRASH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TRASH_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteAllTrashAPI(data) {
  return axios.post("post/deleteAllTrash", data);
}

function* deleteAllTrash(action) {
  try {
    const result = yield call(deleteAllTrashAPI, action.data);
    console.log(result);
    yield put({
      type: DELETE_ALLTRASH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_ALLTRASH_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteTrashPostAPI(data) {
  return axios.post("post/deleteTrashPost", data);
}

function* deleteTrashPost(action) {
  try {
    const result = yield call(deleteTrashPostAPI, action.data);
    console.log(result);
    yield put({
      type: DELETE_TRASHPOST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_TRASHPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function restoreAllTrashAPI(data) {
  return axios.post("post/restoreAllTrash", data);
}

function* restoreAllTrash(action) {
  try {
    const result = yield call(restoreAllTrashAPI, action.data);
    console.log(result);
    yield put({
      type: RESTORE_ALLTRASH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESTORE_ALLTRASH_FAILURE,
      error: err.response.data,
    });
  }
}

function restoreTrashPostAPI(data) {
  return axios.post("post/restoreTrashPost", data);
}

function* restoreTrashPost(action) {
  try {
    const result = yield call(restoreTrashPostAPI, action.data);
    console.log(result);
    yield put({
      type: RESTORE_TRASHPOST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RESTORE_TRASHPOST_FAILURE,
      error: err.response.data,
    });
  }
}

function addBookmarkAPI(data) {
  return axios.post("post/addBookmark", data);
}

function* addBookmark(action) {
  try {
    const result = yield call(addBookmarkAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_BOOKMARK_FAILURE,
      error: err.response.data,
    });
  }
}

function cancelBookmarkAPI(data) {
  return axios.post("post/cancelBookmark", data);
}

function* cancelBookmark(action) {
  try {
    const result = yield call(cancelBookmarkAPI, action.data);
    console.log(result);
    yield put({
      type: CANCEL_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_BOOKMARK_FAILURE,
      error: err.response.data,
    });
  }
}

function loadBookmarkAPI(data) {
  return axios.post("post/loadBookmark", data);
}

function* loadBookmark(action) {
  try {
    const result = yield call(loadBookmarkAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOOKMARK_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post("post/addComment", data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCommentAPI(data) {
  return axios.post("post/loadComment", data);
}

function* loadComment(action) {
  try {
    const result = yield call(loadCommentAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteCommentAPI(data) {
  return axios.post("post/deleteComment", data);
}

function* deleteComment(action) {
  try {
    const result = yield call(deleteCommentAPI, action.data);
    console.log(result);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function updateCommentAPI(data) {
  return axios.patch("post/updateComment", data);
}

function* updateComment(action) {
  try {
    const result = yield call(updateCommentAPI, action.data);
    console.log(result);
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function imageSaveAPI(data) {
  return axios.post("post/image", encodeURIComponent(data));
}

function* imageSave(action) {
  try {
    const result = yield call(imageSaveAPI, action.data);
    console.log(result);
    yield put({
      type: IMAGE_SAVE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IMAGE_SAVE_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadVideoAPI(data) {
  return axios.post("post/uploadVideo", encodeURIComponent(data));
}

function* uploadVideo(action) {
  try {
    const result = yield call(uploadVideoAPI, action.data);
    console.log(result);
    yield put({
      type: UPLOAD_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_VIDEO_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.post("post/likePost", data);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    console.log(result);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function cancelLikePostAPI(data) {
  return axios.post("post/cancelLikePost", data);
}

function* cancelLikePost(action) {
  try {
    const result = yield call(cancelLikePostAPI, action.data);
    console.log(result);
    yield put({
      type: CANCEL_LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CANCEL_LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowsPostAPI(data) {
  return axios.post("post/loadFollowsPost", data);
}

function* loadFollowsPost(action) {
  try {
    const result = yield call(loadFollowsPostAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_FOLLOWS_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWS_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function countReportAPI(data) {
  return axios.post("post/countReport", data);
}

function* countReport(action) {
  try {
    const result = yield call(countReportAPI, action.data);
    console.log(result);
    yield put({
      type: COUNT_REPORT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COUNT_REPORT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPageAPI(data) {
  return axios.post("post/loadUserPage", data);
}

function* loadUserPage(action) {
  try {
    const result = yield call(loadUserPageAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_USERPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USERPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPageInfoAPI(data) {
  return axios.get(`post/loadUserPageInfo/${data}`);
}

function* loadUserPageInfo(action) {
  try {
    const result = yield call(loadUserPageInfoAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_USERPAGE_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USERPAGE_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadHashtagPageAPI(data) {
  return axios.post("post/loadhashtagPage", data);
}

function* loadHashtagPage(action) {
  try {
    const result = yield call(loadHashtagPageAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_HASHTAGPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAGPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function loadChartdataAPI() {
  return axios.get("post/loadChartdata");
}

function* loadChartdata() {
  try {
    const result = yield call(loadChartdataAPI);
    console.log(result);
    yield put({
      type: LOAD_CHARTDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CHARTDATA_FAILURE,
      error: err.response.data,
    });
  }
}

function oneuserLoadChartdataAPI(data) {
  return axios.post("post/oneuserLoadChartdata", data);
}

function* oneuserLoadChartdata(action) {
  try {
    const result = yield call(oneuserLoadChartdataAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_ONEUSER_CHARTDATA_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_ONEUSER_CHARTDATA_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostPageAPI(data) {
  return axios.get(`post/loadPostPage/${data}`);
}

function* loadPostPage(action) {
  try {
    const result = yield call(loadPostPageAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_POSTPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function searchInputTextAPI(data) {
  return axios.post("post/searchInputText", data);
}

function* searchInputText(action) {
  try {
    const result = yield call(searchInputTextAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_INPUT_TEXT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_INPUT_TEXT_FAILURE,
      error: err.response.data,
    });
  }
}

function searchResultAPI(data) {
  return axios.get(`post/searchResult/${encodeURIComponent(data)}`);
}

function* searchResult(action) {
  try {
    const result = yield call(searchResultAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_RESULT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_RESULT_FAILURE,
      error: err.response.data,
    });
  }
}

function searchFriendAPI(data) {
  return axios.post("post/searchFriend", data);
}

function* searchFriend(action) {
  try {
    const result = yield call(searchFriendAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_FRIEND_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_FRIEND_FAILURE,
      error: err.response.data,
    });
  }
}

function searchFriendResultAPI(data) {
  return axios.get(`post/searchFriendResult/${data}`);
}

function* searchFriendResult(action) {
  try {
    const result = yield call(searchFriendResultAPI, action.data);
    console.log(result);
    yield put({
      type: SEARCH_FRIEND_RESULT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEARCH_FRIEND_RESULT_FAILURE,
      error: err.response.data,
    });
  }
}

function addTimelineSubjectAPI(data) {
  return axios.post("post/addTimelineSubject", data);
}

function* addTimelineSubject(action) {
  try {
    const result = yield call(addTimelineSubjectAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_TIMELINE_SUBJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TIMELINE_SUBJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function addTimelineContentsAPI(data) {
  return axios.post("post/addTimelineContents", data);
}

function* addTimelineContents(action) {
  try {
    const result = yield call(addTimelineContentsAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_TIMELINE_CONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TIMELINE_CONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadTimelineSubjectAPI(data) {
  return axios.get("post/loadTimelineSubject", data);
}

function* loadTimelineSubject(action) {
  try {
    const result = yield call(loadTimelineSubjectAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_TIMELINE_SUBJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TIMELINE_SUBJECT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadTimelineContentsAPI(data) {
  return axios.get(`post/loadTimelineContents/${data}`);
}

function* loadTimelineContents(action) {
  try {
    const result = yield call(loadTimelineContentsAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_TIMELINE_CONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TIMELINE_CONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteTimelineContentsAPI(data) {
  return axios.get(`post/deleteTimelineContents/${data}`);
}

function* deleteTimelineContents(action) {
  try {
    const result = yield call(deleteTimelineContentsAPI, action.data);
    console.log(result);
    yield put({
      type: DELETE_TIMELINE_CONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_TIMELINE_CONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function updateTimelineContentsAPI(data) {
  return axios.post(`post/updateTimelineContents`, data);
}

function* updateTimelineContents(action) {
  try {
    const result = yield call(updateTimelineContentsAPI, action.data);
    console.log(result);
    yield put({
      type: UPDATE_TIMELINE_CONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_TIMELINE_CONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function followUserAPI(data) {
  return axios.post("post/followUser", data);
}

function* followUser(action) {
  try {
    const result = yield call(followUserAPI, action.data);
    console.log(result);
    yield put({
      type: FOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function unFollowUserAPI(data) {
  return axios.post("post/unFollowUser", data);
}

function* unFollowUser(action) {
  try {
    const result = yield call(unFollowUserAPI, action.data);
    console.log(result);
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchSavePost() {
  yield takeLatest(SAVE_POST_REQUEST, savePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadAllpost() {
  yield takeLatest(LOAD_ALLPOST_REQUEST, loadAllpost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchLoadTrash() {
  yield takeLatest(LOAD_TRASH_REQUEST, loadTrash);
}

function* watchDeleteAllTrash() {
  yield takeLatest(DELETE_ALLTRASH_REQUEST, deleteAllTrash);
}

function* watchDeleteTrashPost() {
  yield takeLatest(DELETE_TRASHPOST_REQUEST, deleteTrashPost);
}

function* watchRestoreAllTrash() {
  yield takeLatest(RESTORE_ALLTRASH_REQUEST, restoreAllTrash);
}

function* watchRestoreTrashPost() {
  yield takeLatest(RESTORE_TRASHPOST_REQUEST, restoreTrashPost);
}

function* watchAddBookmark() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, addBookmark);
}

function* watchCancelBookmark() {
  yield takeLatest(CANCEL_BOOKMARK_REQUEST, cancelBookmark);
}

function* watchLoadBookmark() {
  yield takeLatest(LOAD_BOOKMARK_REQUEST, loadBookmark);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadComment() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComment);
}
function* watchDeleteComment() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

function* watchImageSave() {
  yield takeLatest(IMAGE_SAVE_REQUEST, imageSave);
}

function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchCancelLikePost() {
  yield takeLatest(CANCEL_LIKE_POST_REQUEST, cancelLikePost);
}

function* watchLoadFollowsPost() {
  yield takeLatest(LOAD_FOLLOWS_POST_REQUEST, loadFollowsPost);
}

function* watchCountReport() {
  yield takeLatest(COUNT_REPORT_REQUEST, countReport);
}

function* watchLoadUserPage() {
  yield takeLatest(LOAD_USERPAGE_REQUEST, loadUserPage);
}

function* watchLoadUserPageInfo() {
  yield takeLatest(LOAD_USERPAGE_INFO_REQUEST, loadUserPageInfo);
}

function* watchLoadHashtagPage() {
  yield takeLatest(LOAD_HASHTAGPAGE_REQUEST, loadHashtagPage);
}

function* watchLoadChartdata() {
  yield takeLatest(LOAD_CHARTDATA_REQUEST, loadChartdata);
}

function* watchOneuserLoadChartdata() {
  yield takeLatest(LOAD_ONEUSER_CHARTDATA_REQUEST, oneuserLoadChartdata);
}

function* watchLoadPostPage() {
  yield takeLatest(LOAD_POSTPAGE_REQUEST, loadPostPage);
}

function* watchSearchInputText() {
  yield takeLatest(SEARCH_INPUT_TEXT_REQUEST, searchInputText);
}

function* watchSearchResult() {
  yield takeLatest(SEARCH_RESULT_REQUEST, searchResult);
}

function* watchSearchFriend() {
  yield takeLatest(SEARCH_FRIEND_REQUEST, searchFriend);
}

function* watchSearchFriendResult() {
  yield takeLatest(SEARCH_FRIEND_RESULT_REQUEST, searchFriendResult);
}

function* watchAddTimelineSubject() {
  yield takeLatest(ADD_TIMELINE_SUBJECT_REQUEST, addTimelineSubject);
}

function* watchAddTimelineContents() {
  yield takeLatest(ADD_TIMELINE_CONTENTS_REQUEST, addTimelineContents);
}

function* watchLoadTimelineSubject() {
  yield takeLatest(LOAD_TIMELINE_SUBJECT_REQUEST, loadTimelineSubject);
}

function* watchLoadTimelineContents() {
  yield takeLatest(LOAD_TIMELINE_CONTENTS_REQUEST, loadTimelineContents);
}

function* watchDeleteTimelineContents() {
  yield takeLatest(DELETE_TIMELINE_CONTENTS_REQUEST, deleteTimelineContents);
}

function* watchUpdateTimelineContents() {
  yield takeLatest(UPDATE_TIMELINE_CONTENTS_REQUEST, updateTimelineContents);
}

function* watchFollowUser() {
  yield takeLatest(FOLLOW_USER_REQUEST, followUser);
}

function* watchUnFollowUser() {
  yield takeLatest(UNFOLLOW_USER_REQUEST, unFollowUser);
}
export default function* userSaga() {
  yield all([
    fork(watchSavePost),
    fork(watchLoadPost),
    fork(watchLoadAllpost),
    fork(watchUpdatePost),
    fork(watchDeletePost),
    fork(watchLoadTrash),
    fork(watchDeleteAllTrash),
    fork(watchDeleteTrashPost),
    fork(watchRestoreAllTrash),
    fork(watchRestoreTrashPost),
    fork(watchAddBookmark),
    fork(watchCancelBookmark),
    fork(watchLoadBookmark),
    fork(watchAddComment),
    fork(watchLoadComment),
    fork(watchDeleteComment),
    fork(watchUpdateComment),
    fork(watchImageSave),
    fork(watchUploadVideo),
    fork(watchLikePost),
    fork(watchCancelLikePost),
    fork(watchLoadFollowsPost),
    fork(watchCountReport),
    fork(watchLoadUserPage),
    fork(watchLoadUserPageInfo),
    fork(watchLoadHashtagPage),
    fork(watchLoadChartdata),
    fork(watchOneuserLoadChartdata),
    fork(watchLoadPostPage),
    fork(watchSearchInputText),
    fork(watchSearchResult),
    fork(watchSearchFriend),
    fork(watchSearchFriendResult),
    fork(watchAddTimelineSubject),
    fork(watchAddTimelineContents),
    fork(watchLoadTimelineSubject),
    fork(watchLoadTimelineContents),
    fork(watchDeleteTimelineContents),
    fork(watchUpdateTimelineContents),
    fork(watchFollowUser),
    fork(watchUnFollowUser),
  ]);
}
