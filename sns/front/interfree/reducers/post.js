import produce from "immer";
import { toast } from "react-toastify";

const ToastSuccess = (text) => {
  toast.dark(text, {
    position: "top-center",
  });
};

const ToastError = (text) => {
  toast.error(text);
};

export const initialState = {
  savePostLoading: false,
  savePostDone: false,
  savePostError: null,
  loadAllPostLoading: false,
  loadAllPostDone: false,
  loadAllPostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: false,
  updatePostLoading: false,
  updatePostDone: false,
  updatePosterror: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  loadTrashLoading: false,
  loadTrashDone: false,
  loadTrashError: null,
  deleteAlltrashLoading: false,
  deleteAlltrashDone: false,
  deleteAlltrashError: null,
  deleteTrashPostLoading: false,
  deleteTrashPostDone: false,
  deleteTrashPostError: null,
  restoreAlltrashLoading: false,
  restoreAlltrashDone: false,
  restoreAlltrashError: null,
  restoreTrashPostLoading: false,
  restoreTrashPostDone: false,
  restoreTrashPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  loadCommentLoading: false,
  loadCommentDone: false,
  loadCommentError: false,
  deleteCommentLoading: false,
  deleteCommentDone: false,
  deleteCommentError: false,
  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: false,
  addBookmarkLoading: false,
  addBookmarkDone: false,
  addBookmarkError: null,
  cancelBookmarkLoading: false,
  cancelBookmarkDone: false,
  cancelBookmarkError: null,
  loadBookmarkLoading: false,
  loadBookmarkDone: false,
  loadBookmarkError: null,
  imageSaveLoading: false,
  imageSaveDone: false,
  imageSaveError: false,
  uploadVideoLoading: false,
  uploadVideoDone: false,
  uploadVideoError: false,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  cancelLikePostLoading: false,
  cancelLikePostDone: false,
  cancelLikePostError: null,
  loadFollowsPostLoading: false,
  loadFollowsPostDone: false,
  loadFollowsPostError: null,
  countReportLoding: false,
  countReportDone: false,
  countReportError: false,
  loadUserPageLoding: false,
  loadUserPageDone: false,
  loadUserPageError: null,
  loadUserPageInfoLoding: false,
  loadUserPageInfoDone: false,
  loadUserPageInfoError: null,
  loadHashtagPageLoding: false,
  loadHashtagPageDone: false,
  loadHashtagPageError: null,
  loadChartdataLoading: false,
  loadChartdataDone: false,
  loadChartdataError: null,
  loadOneuserChartdataLoading: false,
  loadOneuserChartdataDone: false,
  loadOneuserChartdataError: null,
  loadPostPageLoding: false,
  loadPostPageDone: false,
  loadPostPageError: null,
  searchInputTextLoading: false,
  searchInputTextDone: false,
  searchInputTextError: null,
  searchResultLoading: false,
  searchResultDone: false,
  searchResultError: null,
  searchFriendLoading: false,
  searchFriendDone: false,
  searchFriendError: null,
  searchFriendResultLoading: false,
  searchFriendResultDone: false,
  searchFriendResultError: null,
  addTimelineSubjectLoading: false,
  addTimelineSubjectDone: false,
  addTimelineSubjectError: null,
  addTimelineContentsLoading: false,
  addTimelineContentsDone: false,
  addTimelineContentsError: null,
  loadTimelineSubjectLoading: false,
  loadTimelineSubjectDone: false,
  loadTimelineSubjectError: null,
  loadTimelineContentsLoading: false,
  loadTimelineContentsDone: false,
  loadTimelineContentsError: null,
  deleteTimelineContentsLoading: false,
  deleteTimelineContentsDone: false,
  deleteTimelineContentsError: null,
  updateTimelineContentsLoading: false,
  updateTimelineContentsDone: false,
  updateTimelineContentsError: null,
  followUserLoading: false,
  followUserDone: false,
  followUserError: null,
  unFollowUserLoading: false,
  unFollowUserDone: false,
  unFollowUserError: null,
  reports: [],
  posts: [],
  userPageInfo: [],
  trashPosts: [],
  followPosts: [],
  comments: [],
  imagePreview: [],
  allCharts: [],
  charts: [],
  timelineId: [],
  timelineSubjects: [],
  timelineContents: [],
  search: [],
};

export const SAVE_POST_REQUEST = "SAVE_POST_REQUEST"; //포스트 저장
export const SAVE_POST_SUCCESS = "SAVE_POST_SUCCESS";
export const SAVE_POST_FAILURE = "SAVE_POST_FAILURE";

export const LOAD_ALLPOST_REQUEST = "LOAD_ALLPOST_REQUEST";
export const LOAD_ALLPOST_SUCCESS = "LOAD_ALLPOST_SUCCESS";
export const LOAD_ALLPOST_FAILURE = "LOAD_ALLPOST_FAILURE";

export const LOAD_ALL_PICTUREPOST_REQUEST = "LOAD_ALL_PICTUREPOST_REQUEST";
export const LOAD_ALL_PICTUREPOST_SUCCESS = "LOAD_ALL_PICTUREPOST_SUCCESS";
export const LOAD_ALL_PICTUREPOST_FAILURE = "LOAD_ALL_PICTUREPOST_FAILURE";

export const LOAD_ALL_VIDEOPOST_REQUEST = "LOAD_ALL_VIDEOPOST_REQUEST";
export const LOAD_ALL_VIDEOPOST_SUCCESS = "LOAD_ALL_VIDEOPOST_SUCCESS";
export const LOAD_ALL_VIDEOPOST_FAILURE = "LOAD_ALL_VIDEOPOST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST"; //개인 포스트 로드
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILUR";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST"; //휴지통으로 이동
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILUR";

export const LOAD_TRASH_REQUEST = "LOAD_TRASH_REQUEST";
export const LOAD_TRASH_SUCCESS = "LOAD_TRASH_SUCCESS";
export const LOAD_TRASH_FAILURE = "LOAD_TRASH_FAILUR";

export const DELETE_ALLTRASH_REQUEST = "DELETE_ALLTRASH_REQUEST";
export const DELETE_ALLTRASH_SUCCESS = "DELETE_ALLTRASH_SUCCESS";
export const DELETE_ALLTRASH_FAILURE = "DELETE_ALLTRASH_FAILUR";

export const DELETE_TRASHPOST_REQUEST = "DELETE_TRASHPOST_REQUEST";
export const DELETE_TRASHPOST_SUCCESS = "DELETE_TRASHPOST_SUCCESS";
export const DELETE_TRASHPOST_FAILURE = "DELETE_TRASHPOST_FAILUR";

export const RESTORE_ALLTRASH_REQUEST = "RESTORE_ALLTRASH_REQUEST";
export const RESTORE_ALLTRASH_SUCCESS = "RESTORE_ALLTRASH_SUCCESS";
export const RESTORE_ALLTRASH_FAILURE = "RESTORE_ALLTRASH_FAILURE";

export const RESTORE_TRASHPOST_REQUEST = "RESTORE_TRASHPOST_REQUEST";
export const RESTORE_TRASHPOST_SUCCESS = "RESTORE_TRASHPOST_SUCCESS";
export const RESTORE_TRASHPOST_FAILURE = "RESTORE_TRASHPOST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const ADD_BOOKMARK_REQUEST = "ADD_BOOKMARK_REQUEST";
export const ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS";
export const ADD_BOOKMARK_FAILURE = "ADD_BOOKMARK_FAILURE";

export const CANCEL_BOOKMARK_REQUEST = "CANCEL_BOOKMARK_REQUEST";
export const CANCEL_BOOKMARK_SUCCESS = "CANCEL_BOOKMARK_SUCCESS";
export const CANCEL_BOOKMARK_FAILURE = "CANCEL_BOOKMARK_FAILURE";

export const LOAD_BOOKMARK_REQUEST = "LOAD_BOOKMARK_REQUEST";
export const LOAD_BOOKMARK_SUCCESS = "LOAD_BOOKMARK_SUCCESS";
export const LOAD_BOOKMARK_FAILURE = "LOAD_BOOKMARK_FAILURE";

export const IMAGE_SAVE_REQUEST = "IMAGE_SAVE_REQUEST";
export const IMAGE_SAVE_SUCCESS = "IMAGE_SAVE_SUCCESS";
export const IMAGE_SAVE_FAILURE = "IMAGE_SAVE_FAILURE";

export const UPLOAD_VIDEO_REQUEST = "UPLOAD_VIDEO_REQUEST";
export const UPLOAD_VIDEO_SUCCESS = "UPLOAD_VIDEO_SUCCESS";
export const UPLOAD_VIDEO_FAILURE = "UPLOAD_VIDEO_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const CANCEL_LIKE_POST_REQUEST = "CANCEL_LIKE_POST_REQUEST";
export const CANCEL_LIKE_POST_SUCCESS = "CANCEL_LIKE_POST_SUCCESS";
export const CANCEL_LIKE_POST_FAILURE = "CANCEL_LIKE_POST_FAILURE";

export const LOAD_FOLLOWS_POST_REQUEST = "LOAD_FOLLOWS_POST_REQUEST";
export const LOAD_FOLLOWS_POST_SUCCESS = "LOAD_FOLLOWS_POST_SUCCESS";
export const LOAD_FOLLOWS_POST_FAILURE = "LOAD_FOLLOWS_POST_FAILURE";

export const COUNT_REPORT_REQUEST = "COUNT_REPORT_REQUEST";
export const COUNT_REPORT_SUCCESS = "COUNT_REPORT_SUCCESS";
export const COUNT_REPORT_FAILURE = "COUNT_REPORT_FAILURE";

export const LOAD_USERPAGE_REQUEST = "LOAD_USERPAGE_REQUEST";
export const LOAD_USERPAGE_SUCCESS = "LOAD_USERPAGE_SUCCESS";
export const LOAD_USERPAGE_FAILURE = "LOAD_USERPAGE_FAILURE";

export const LOAD_USERPAGE_INFO_REQUEST = "LOAD_USERPAGE_INFO_REQUEST";
export const LOAD_USERPAGE_INFO_SUCCESS = "LOAD_USERPAGE_INFO_SUCCESS";
export const LOAD_USERPAGE_INFO_FAILURE = "LOAD_USERPAGE_INFO_FAILURE";

export const LOAD_HASHTAGPAGE_REQUEST = "LOAD_HASHTAGPAGE_REQUEST";
export const LOAD_HASHTAGPAGE_SUCCESS = "LOAD_HASHTAGPAGE_SUCCESS";
export const LOAD_HASHTAGPAGE_FAILURE = "LOAD_HASHTAGPAGE_FAILURE";

export const LOAD_CHARTDATA_REQUEST = "LOAD_CHARTDATA_REQUEST";
export const LOAD_CHARTDATA_SUCCESS = "LOAD_CHARTDATA_SUCCESS";
export const LOAD_CHARTDATA_FAILURE = "LOAD_CHARTDATA_FAILURE";

export const LOAD_ONEUSER_CHARTDATA_REQUEST = "LOAD_ONEUSER_CHARTDATA_REQUEST";
export const LOAD_ONEUSER_CHARTDATA_SUCCESS = "LOAD_ONEUSER_CHARTDATA_SUCCESS";
export const LOAD_ONEUSER_CHARTDATA_FAILURE = "LOAD_ONEUSER_CHARTDATA_FAILURE";

export const LOAD_POSTPAGE_REQUEST = "LOAD_POSTPAGE_REQUEST";
export const LOAD_POSTPAGE_SUCCESS = "LOAD_POSTPAGE_SUCCESS";
export const LOAD_POSTPAGE_FAILURE = "LOAD_POSTPAGE_FAILURE";

export const SEARCH_INPUT_TEXT_REQUEST = "SEARCH_INPUT_TEXT_REQUEST";
export const SEARCH_INPUT_TEXT_SUCCESS = "SEARCH_INPUT_TEXT_SUCCESS";
export const SEARCH_INPUT_TEXT_FAILURE = "SEARCH_INPUT_TEXT_FAILURE";

export const SEARCH_RESULT_REQUEST = "SEARCH_RESULT_REQUEST";
export const SEARCH_RESULT_SUCCESS = "SEARCH_RESULT_SUCCESS";
export const SEARCH_RESULT_FAILURE = "SEARCH_RESULT_FAILURE";

export const SEARCH_FRIEND_REQUEST = "SEARCH_FRIEND_REQUEST";
export const SEARCH_FRIEND_SUCCESS = "SEARCH_FRIEND_SUCCESS";
export const SEARCH_FRIEND_FAILURE = "SEARCH_FRIEND_FAILURE";

export const SEARCH_FRIEND_RESULT_REQUEST = "SEARCH_FRIEND_RESULT_REQUEST";
export const SEARCH_FRIEND_RESULT_SUCCESS = "SEARCH_FRIEND_RESULT_SUCCESS";
export const SEARCH_FRIEND_RESULT_FAILURE = "SEARCH_FRIEND_RESULT_FAILURE";

export const ADD_TIMELINE_SUBJECT_REQUEST = "ADD_TIMELINE_SUBJECT_REQUEST";
export const ADD_TIMELINE_SUBJECT_SUCCESS = "ADD_TIMELINE_SUBJECT_SUCCESS";
export const ADD_TIMELINE_SUBJECT_FAILURE = "ADD_TIMELINE_SUBJECT_FAILURE";

export const ADD_TIMELINE_CONTENTS_REQUEST = "ADD_TIMELINE_CONTENTS_REQUEST";
export const ADD_TIMELINE_CONTENTS_SUCCESS = "ADD_TIMELINE_CONTENTS_SUCCESS";
export const ADD_TIMELINE_CONTENTS_FAILURE = "ADD_TIMELINE_CONTENTS_FAILURE";

export const LOAD_TIMELINE_SUBJECT_REQUEST = "LOAD_TIMELINE_SUBJECT_REQUEST";
export const LOAD_TIMELINE_SUBJECT_SUCCESS = "LOAD_TIMELINE_SUBJECT_SUCCESS";
export const LOAD_TIMELINE_SUBJECT_FAILURE = "LOAD_TIMELINE_SUBJECT_FAILURE";

export const LOAD_TIMELINE_CONTENTS_REQUEST = "LOAD_TIMELINE_CONTENTS_REQUEST";
export const LOAD_TIMELINE_CONTENTS_SUCCESS = "LOAD_TIMELINE_CONTENTS_SUCCESS";
export const LOAD_TIMELINE_CONTENTS_FAILURE = "LOAD_TIMELINE_CONTENTS_FAILURE";

export const DELETE_TIMELINE_CONTENTS_REQUEST =
  "DELETE_TIMELINE_CONTENTS_REQUEST";
export const DELETE_TIMELINE_CONTENTS_SUCCESS =
  "DELETE_TIMELINE_CONTENTS_SUCCESS";
export const DELETE_TIMELINE_CONTENTS_FAILURE =
  "DELETE_TIMELINE_CONTENTS_FAILURE";

export const UPDATE_TIMELINE_CONTENTS_REQUEST =
  "UPDATE_TIMELINE_CONTENTS_REQUEST";
export const UPDATE_TIMELINE_CONTENTS_SUCCESS =
  "UPDATE_TIMELINE_CONTENTS_SUCCESS";
export const UPDATE_TIMELINE_CONTENTS_FAILURE =
  "UPDATE_TIMELINE_CONTENTS_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SAVE_POST_SUCCESS:
        draft.savePostLoading = false;
        draft.savePostDone = true;
        draft.posts = action.data;
        ToastSuccess("포스트 저장 완료!");
        break;
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true;
        draft.savePostDone = false;
        draft.savePostError = false;
        break;
      case SAVE_POST_FAILURE:
        draft.postSaveLoading = false;
        draft.postSaveError = action.error;
        ToastError("포스트 저장 실패... 다시시도하세요.");
        break;
      case LOAD_ALLPOST_SUCCESS:
        draft.loadAllPostLoading = false;
        draft.loadAllPostDone = true;
        draft.posts = draft.posts.concat(action.data);
        break;
      case LOAD_ALLPOST_REQUEST:
        draft.loadAllPostLoading = true;
        draft.loadAllPostDone = true;
        draft.loadAllPostError = null;
        break;
      case LOAD_ALLPOST_FAILURE:
        draft.loadAllPostLoading = false;
        draft.loadAllPostError = action.data;
        ToastError("모든 포스트 로드 실패.. 다시 시도 하세요.");
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.posts = draft.posts.concat(action.data);
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = false;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        ToastError("포스트 로드 실패.. 다시 시도 하세요.");
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.posts = action.data;
        ToastSuccess("포스트 업데이트 완료!");
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePosterror = action.error;
        ToastError("포스트 업데이트 실패... 다시시도하세요.");
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.posts = draft.posts.filter((num) => num.id != action.data);
        ToastSuccess("선택한 포스트 휴지통으로 이동됨");
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostDone = false;
        draft.deletePostError = action.error;
        ToastError("포스트 휴지통 이동 실패... 다시시도하세요.");
        break;
      case LOAD_TRASH_SUCCESS:
        draft.loadTrashLoading = false;
        draft.loadTrashDone = true;
        draft.trashPosts = action.data;
        break;
      case LOAD_TRASH_REQUEST:
        draft.loadTrashLoading = true;
        draft.loadTrashDone = false;
        break;
      case LOAD_TRASH_FAILURE:
        draft.loadTrashLoading = false;
        draft.loadTrashError = action.error;
        ToastError("휴지통에 들어있는 포스트 로드 실패.. 다시 시도 하세요.");
        break;
      case DELETE_ALLTRASH_SUCCESS:
        draft.deleteAlltrashLoading = false;
        draft.deleteAlltrashDone = true;
        draft.trashPosts = [];
        ToastSuccess("모든 포스트가 삭제되었어요.");
        break;
      case DELETE_ALLTRASH_REQUEST:
        draft.deleteAlltrashLoading = true;
        draft.deleteAlltrashDone = false;
        break;
      case DELETE_ALLTRASH_FAILURE:
        draft.deleteAlltrashLoading = false;
        draft.deleteAlltrashError = action.error;
        ToastError("모든 포스트 삭제 실패... 다시시도하세요.");
        break;
      case DELETE_TRASHPOST_SUCCESS:
        draft.deleteTrashPostLoading = false;
        draft.deleteTrashPostDone = true;
        draft.trashPosts = draft.trashPosts.filter(
          (i) => i.postId != action.data
        );
        ToastSuccess("해당 포스트가 삭제되었어요.");
        break;
      case DELETE_TRASHPOST_REQUEST:
        draft.deleteTrashPostLoading = true;
        draft.deleteTrashPostDone = false;
        break;
      case DELETE_TRASHPOST_FAILURE:
        draft.deleteTrashPostLoading = false;
        draft.deleteTrashPostError = action.error;
        ToastError("해당 포스트 삭제 실패... 다시시도하세요.");
        break;
      case RESTORE_ALLTRASH_SUCCESS:
        draft.restoreAlltrashDone = true;
        draft.restoreAlltrashLoading = false;
        draft.trashPosts = [];
        ToastSuccess("모든 포스트가 복원되었어요.");
        break;
      case RESTORE_ALLTRASH_REQUEST:
        draft.restoreAlltrashDone = false;
        draft.restoreAlltrashLoading = true;
        draft.restoreAlltrashError = null;
        break;
      case RESTORE_ALLTRASH_FAILURE:
        draft.restoreAlltrashLoading = false;
        draft.restoreAlltrashError = action.data;
        ToastError("모든 포스트 복원 실패... 다시 시도하세요.");
        break;
      case RESTORE_TRASHPOST_SUCCESS:
        draft.restoreTrashPostDone = true;
        draft.restoreTrashPostLoading = false;
        draft.trashPosts = draft.trashPosts.filter(
          (i) => i.postId != action.data
        );
        ToastSuccess("해당 포스트가 복원되었어요.");
        break;
      case RESTORE_TRASHPOST_REQUEST:
        draft.restoreTrashPostDone = false;
        draft.restoreTrashPostLoading = true;
        draft.restoreTrashPostError = null;
        break;
      case RESTORE_TRASHPOST_FAILURE:
        draft.restoreTrashPostLoading = false;
        draft.restoreTrashPostError = action.data;
        ToastError("해당 포스트 복원에 실패! 다시시도하세요.");
        break;
      case ADD_BOOKMARK_SUCCESS:
        draft.addBookmarkDone = true;
        draft.addBookmarkLoading = false;
        draft.posts = draft.posts.map((p) => {
          if (p.id == action.data[0].id) {
            return action.data[0];
          }
          return p;
        });
        break;
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkDone = false;
        draft.addBookmarkLoading = true;
        draft.addBookmarkError = null;
        break;
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkLoading = true;
        draft.addBookmarkError = action.data;
        ToastError("북마크 추가 실패... 다시시도하세요.");
        break;
      case CANCEL_BOOKMARK_SUCCESS:
        draft.cancelBookmarkDone = true;
        draft.cancelBookmarkLoading = false;
        console.log(action.data);
        draft.posts = draft.posts.map((element) => {
          if (element.id == action.data) {
            element.Bookmarks = [];
            return element;
          }
          return element;
        });
        ToastSuccess("북마크가 취소되었어요.");
        break;
      case CANCEL_BOOKMARK_REQUEST:
        draft.cancelBookmarkDone = false;
        draft.cancelBookmarkLoading = true;
        draft.cancelBookmarkError = null;
        break;
      case CANCEL_BOOKMARK_FAILURE:
        draft.cancelBookmarkLoading = true;
        draft.cancelBookmarkError = action.data;
        ToastError("북마크 취소 실패... 다시시도하세요.");
        break;
      case LOAD_BOOKMARK_SUCCESS:
        draft.loadBookmarkDone = true;
        draft.loadBookmarkLoading = false;
        draft.posts = draft.posts.concat(action.data);
        break;
      case LOAD_BOOKMARK_REQUEST:
        draft.loadBookmarkDone = false;
        draft.loadBookmarkLoading = true;
        draft.loadBookmarkError = null;
        break;
      case LOAD_BOOKMARK_FAILURE:
        draft.loadBookmarkLoading = false;
        draft.loadBookmarkError = null;
        ToastError("북마크 로드 실패... 다시시도하세요.");
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.comments = action.data;
        ToastSuccess("작성한 댓글이 추가되었어요.");
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        ToastError("작성한 댓글 추가하기 실패... 다시시도하세요.");
        break;
      case LOAD_COMMENT_SUCCESS:
        draft.loadCommentDone = true;
        draft.loadCommentLoading = false;
        draft.comments = action.data;
        break;
      case LOAD_COMMENT_REQUEST:
        draft.loadCommentDone = false;
        draft.loadCommentLoading = true;
        draft.loadCommentError = null;
        break;
      case LOAD_COMMENT_FAILURE:
        draft.loadCommentDone = false;
        draft.loadCommentLoading = false;
        draft.loadCommentError = action.error;
        ToastError("댓글 로드 실패... 다시시도하세요.");
        break;
      case DELETE_COMMENT_SUCCESS:
        draft.deleteCommentDone = false;
        draft.deleteCommentLoading = false;
        draft.comments = draft.comments.filter((i) => i.id != action.data);
        ToastSuccess("선택한 댓글이 삭제되었어요.");
        break;
      case DELETE_COMMENT_REQUEST:
        draft.deleteCommentDone = false;
        draft.deleteCommentLoading = true;
        draft.deleteCommentError = null;
        break;
      case DELETE_COMMENT_FAILURE:
        draft.updateCommentDone = false;
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        ToastError("작성한 댓글 삭제 실패.. 다시시도하세요.");
        break;
      case UPDATE_COMMENT_SUCCESS:
        draft.updateCommentDone = true;
        draft.updateCommentLoading = false;
        draft.comments = action.data;
        ToastSuccess("해당 댓글이 수정되었어요.");
        break;
      case UPDATE_COMMENT_REQUEST:
        draft.updateCommentDone = false;
        draft.updateCommentLoading = true;
        draft.updateCommentError = null;
        break;
      case UPDATE_COMMENT_FAILURE:
        draft.updateCommentDone = false;
        draft.updateCommentLoading = false;
        draft.updateCommentError = action.error;
        ToastError("작성한 댓글 수정 실패.. 다시시도하세요.");
        break;
      case IMAGE_SAVE_SUCCESS:
        draft.imageSaveLoading = false;
        draft.imageSaveDone = true;
        draft.imagePreview = action.data;
        ToastSuccess("이미지가 업로드 되었어요.");
        break;
      case IMAGE_SAVE_REQUEST:
        draft.imageSaveLoading = true;
        draft.imageSaveDone = false;
        draft.imageSaveError = false;
        break;
      case IMAGE_SAVE_FAILURE:
        draft.imageSaveLoading = false;
        draft.imageSaveError = action.error;
        ToastError("이미지 업로드 실패.. 다시시도하세요.");
        break;
      case UPLOAD_VIDEO_SUCCESS:
        draft.uploadVideoLoading = false;
        draft.uploadVideoDone = true;
        ToastSuccess("비디오가 업로드 되었어요.");
        break;
      case UPLOAD_VIDEO_REQUEST:
        draft.uploadVideoLoading = true;
        draft.uploadVideoDone = false;
        draft.uploadVideoError = null;
        break;
      case UPLOAD_VIDEO_FAILURE:
        draft.uploadVideoLoading = false;
        draft.uploadVideoError = action.error;
        ToastError("비디오 업로드 실패.. 다시시도하세요.");
        break;
      case LIKE_POST_SUCCESS:
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.posts = draft.posts.map((p) => {
          if (p.id == action.data.id) {
            return action.data;
          }
          return p;
        });
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        ToastError("해당 포스트 좋아요 추가 실패.. 다시시도하세요.");
        break;
      case CANCEL_LIKE_POST_SUCCESS:
        draft.cancelLikePostLoading = false;
        draft.cancelLikePostDone = true;
        draft.posts = draft.posts.map((p) => {
          if (p.id == action.data.id) {
            return action.data;
          }
          return p;
        });
        ToastSuccess("해당 포스트의 좋아요가 취소되었어요.");
        break;
      case CANCEL_LIKE_POST_REQUEST:
        draft.cancelLikePostLoading = true;
        draft.cancelLikePostDone = false;
        draft.cancelLikePostError = null;
        break;
      case CANCEL_LIKE_POST_FAILURE:
        draft.cancelLikePostLoading = false;
        draft.cancelLikePostError = action.error;
        ToastError("해당 포스트 좋아요 취소 실패.. 다시시도하세요.");
        break;
      case LOAD_FOLLOWS_POST_SUCCESS:
        draft.loadFollowsPostLoading = false;
        draft.loadFollowsPostDone = true;
        draft.followPosts = action.data;
        break;
      case LOAD_FOLLOWS_POST_REQUEST:
        draft.loadFollowsLoading = true;
        draft.loadFollowsDone = false;
        draft.loadFollowsError = false;
        break;
      case LOAD_FOLLOWS_POST_FAILURE:
        draft.loadFollowsLoading = false;
        draft.loadFollowsError = action.error;
        break;
      case COUNT_REPORT_SUCCESS:
        draft.countReportDone = true;
        draft.countReportLoding = false;
        draft.reports = action.data;
        ToastSuccess("신고가 접수되었어요.");
        break;
      case COUNT_REPORT_REQUEST:
        draft.countReportDone = false;
        draft.countReportLoding = true;
        draft.countReportError = null;
        break;
      case COUNT_REPORT_FAILURE:
        draft.countReportLoding = false;
        draft.countReportError = action.error;
        ToastError("해당 포스트 신고접수 실패.. 다시시도하세요.");
        break;
      case LOAD_USERPAGE_SUCCESS:
        draft.loadUserPageDone = true;
        draft.loadUserPageLoding = false;
        draft.posts = action.data;
        break;
      case LOAD_USERPAGE_REQUEST:
        draft.loadUserPageDone = false;
        draft.loadUserPageLoding = true;
        draft.loadUserPageError = null;
        break;
      case LOAD_USERPAGE_FAILURE:
        draft.loadUserPageLoding = false;
        draft.loadUserPageError = action.error;
        break;
      case LOAD_USERPAGE_INFO_SUCCESS:
        draft.loadUserPageInfoDone = true;
        draft.loadUserPageInfoLoding = false;
        draft.userPageInfo = action.data;
        break;
      case LOAD_USERPAGE_INFO_REQUEST:
        draft.loadUserPageInfoDone = false;
        draft.loadUserPageInfoLoding = true;
        draft.loadUserPageInfoError = null;
        break;
      case LOAD_USERPAGE_INFO_FAILURE:
        draft.loadUserPageInfoLoding = false;
        draft.loadUserPageInfoError = action.error;
        break;
      case LOAD_HASHTAGPAGE_SUCCESS:
        draft.loadHashtagPageDone = true;
        draft.loadHashtagPageLoding = false;
        draft.posts = action.data;
        break;
      case LOAD_HASHTAGPAGE_REQUEST:
        draft.loadHashtagPageDone = false;
        draft.loadHashtagPageLoding = true;
        draft.loadHashtagPageError = null;
        break;
      case LOAD_HASHTAGPAGE_FAILURE:
        draft.loadHashtagPageLoding = false;
        draft.loadHashtagPageError = action.error;
        break;
      case LOAD_CHARTDATA_SUCCESS:
        draft.loadChartDataDone = true;
        draft.loadChartDataLoding = false;
        draft.allCharts = action.data;
        draft.bookmarkPosts = [];
        break;
      case LOAD_CHARTDATA_REQUEST:
        draft.loadChartDataDone = false;
        draft.loadChartDataLoding = true;
        draft.loadChartDataError = null;
        break;
      case LOAD_CHARTDATA_FAILURE:
        draft.loadChartDataLoding = false;
        draft.loadChartDataError = action.error;
        break;
      case LOAD_ONEUSER_CHARTDATA_SUCCESS:
        draft.loadOneuserChartdataDone = true;
        draft.loadOneuserChartdataLoding = false;
        draft.charts = action.data;
        draft.posts = [];
        draft.bookmarkPosts = [];
        break;
      case LOAD_ONEUSER_CHARTDATA_REQUEST:
        draft.loadOneuserChartdataDone = false;
        draft.loadOneuserChartdataLoding = true;
        draft.loadOneuserChartdataError = null;
        break;
      case LOAD_ONEUSER_CHARTDATA_FAILURE:
        draft.loadOneuserChartdataLoding = false;
        draft.loadOneuserChartdataError = action.error;
        break;
      case LOAD_POSTPAGE_SUCCESS:
        draft.loadPostPageDone = true;
        draft.loadPostPageLoding = false;
        draft.posts[0] = action.data;
        break;
      case LOAD_POSTPAGE_REQUEST:
        draft.loadPostPageDone = false;
        draft.loadPostPageLoding = true;
        draft.loadPostPageError = null;
        break;
      case LOAD_POSTPAGE_FAILURE:
        draft.loadPostPageLoding = false;
        draft.loadPostPageError = action.error;
        break;
      case SEARCH_INPUT_TEXT_SUCCESS:
        draft.searchInputTextDone = true;
        draft.searchInputTextLoding = false;
        draft.search = action.data;
        break;
      case SEARCH_INPUT_TEXT_REQUEST:
        draft.searchInputTextDone = false;
        draft.searchInputTextLoding = true;
        draft.searchInputTextError = null;
        break;
      case SEARCH_INPUT_TEXT_FAILURE:
        draft.searchInputTextLoding = false;
        draft.searchInputTextError = action.error;
      case SEARCH_RESULT_SUCCESS:
        draft.searchResultDone = true;
        draft.searchResultLoding = false;
        draft.posts = action.data;
        draft.search = [];
        break;
      case SEARCH_RESULT_REQUEST:
        draft.searchResultDone = false;
        draft.searchResultLoding = true;
        draft.searchResultError = null;
        break;
      case SEARCH_RESULT_FAILURE:
        draft.searchResultLoding = false;
        draft.searchResultError = action.error;
        ToastError("검색에 실패했습니다. 다시 시도하세요.");
        break;
      case SEARCH_FRIEND_SUCCESS:
        draft.searchFriendDone = true;
        draft.searchFriendLoding = false;
        draft.search = action.data;
        break;
      case SEARCH_FRIEND_REQUEST:
        draft.searchFriendDone = false;
        draft.searchFriendLoding = true;
        draft.searchFriendError = null;
        break;
      case SEARCH_FRIEND_FAILURE:
        draft.searchFriendLoding = false;
        draft.searchFriendError = action.error;
        break;
      case SEARCH_FRIEND_RESULT_SUCCESS:
        draft.searchFriendResultDone = true;
        draft.searchFriendResultLoding = false;
        draft.posts = action.data;
        draft.searchFriend = [];
        break;
      case SEARCH_FRIEND_RESULT_REQUEST:
        draft.searchFriendResultDone = false;
        draft.searchFriendResultLoding = true;
        draft.searchFriendResultError = null;
        break;
      case SEARCH_FRIEND_RESULT_FAILURE:
        draft.searchFriendResultLoding = false;
        draft.searchFriendResultError = action.error;
        ToastError("검색에 실패했습니다. 다시 시도하세요.");
        break;
      case ADD_TIMELINE_SUBJECT_SUCCESS:
        draft.addTimelineSubjectDone = true;
        draft.addTimelineSubjectLoding = false;
        draft.timelineId = action.data;
        ToastSuccess(`타임라인 주제 추가 성공!`);
        break;
      case ADD_TIMELINE_SUBJECT_REQUEST:
        draft.addTimelineSubjectDone = false;
        draft.addTimelineSubjectLoding = true;
        draft.addTimelineSubjectError = null;
        break;
      case ADD_TIMELINE_SUBJECT_FAILURE:
        draft.addTimelineSubjectLoding = false;
        draft.addTimelineSubjectError = action.error;
        ToastError("타임라인 주제 추가에 실패했습니다. 다시 시도하세요.");
        break;
      case ADD_TIMELINE_CONTENTS_SUCCESS:
        draft.addTimelineContentsDone = true;
        draft.addTimelineContentsLoding = false;
        ToastSuccess(`타임라인 추가에 성공!`);
        break;
      case ADD_TIMELINE_CONTENTS_REQUEST:
        draft.addTimelineContentsDone = false;
        draft.addTimelineContentsLoding = true;
        draft.addTimelineContentsError = null;
        break;
      case ADD_TIMELINE_CONTENTS_FAILURE:
        draft.addTimelineContentsLoding = false;
        draft.addTimelineContentsError = action.error;
        ToastError("타임라인 추가에 실패했습니다. 다시 시도하세요.");
      case LOAD_TIMELINE_SUBJECT_SUCCESS:
        draft.loadTimelineSubjectDone = true;
        draft.loadTimelineSubjectLoding = false;
        draft.timelineSubjects = action.data;
        break;
      case LOAD_TIMELINE_SUBJECT_REQUEST:
        draft.loadTimelineSubjectDone = false;
        draft.loadTimelineSubjectLoding = true;
        draft.loadTimelineSubjectError = null;
        break;
      case LOAD_TIMELINE_SUBJECT_FAILURE:
        draft.loadTimelineSubjectLoding = false;
        draft.loadTimelineSubjectError = action.error;
        break;
      case LOAD_TIMELINE_CONTENTS_SUCCESS:
        draft.loadTimelineContentsDone = true;
        draft.loadTimelineContentsLoding = false;
        draft.timelineContents = action.data;
        break;
      case LOAD_TIMELINE_CONTENTS_REQUEST:
        draft.loadTimelineContentsDone = false;
        draft.loadTimelineContentsLoding = true;
        draft.loadTimelineContentsError = null;
        break;
      case LOAD_TIMELINE_CONTENTS_FAILURE:
        draft.loadTimelineContentsLoding = false;
        draft.loadTimelineContentsError = action.error;
        break;
      case DELETE_TIMELINE_CONTENTS_SUCCESS:
        draft.deleteTimelineSubjectDone = true;
        draft.deleteTimelineSubjectLoding = false;
        draft.timelineContents = draft.timelineContents.filter(
          (num) => num.id != action.data
        );
        ToastSuccess(`해당 타임라인 박스가 삭제 완료!`);
        break;
      case DELETE_TIMELINE_CONTENTS_REQUEST:
        draft.deleteTimelineSubjectDone = false;
        draft.deleteTimelineSubjectLoding = true;
        draft.deleteTimelineSubjectError = null;
        break;
      case DELETE_TIMELINE_CONTENTS_FAILURE:
        draft.deleteTimelineSubjectLoding = false;
        draft.deleteTimelineSubjectError = action.error;
        ToastError("해당 타임라인 박스 삭제 요청 실패... 다시 시도하세요.");
        break;
      case UPDATE_TIMELINE_CONTENTS_SUCCESS:
        draft.updateTimelineContentsDone = true;
        draft.updateTimelineContentsLoding = false;
        draft.timelineContents = draft.timelineContents.map((p) => {
          if (p.id == action.data[0].id) {
            return action.data[0];
          }
          return p;
        });
        ToastSuccess(`해당 타임라인 박스가 업데이트 완료!`);
        break;
      case UPDATE_TIMELINE_CONTENTS_REQUEST:
        draft.updateTimelineContentsDone = false;
        draft.updateTimelineContentsLoding = true;
        draft.updateTimelineContentsError = null;
        break;
      case UPDATE_TIMELINE_CONTENTS_FAILURE:
        draft.updateTimelineContentsLoding = false;
        draft.updateTimelineContentsError = action.error;
        ToastError("해당 타임라인 박스 업데이트 요청 실패... 다시 시도하세요.");
        break;
      case FOLLOW_USER_SUCCESS:
        draft.followUserDone = true;
        draft.followUserLoading = false;
        draft.posts = draft.posts.map((element) => {
          if (element.User.id == action.data.followingId) {
            element.Follows[0] = action.data.followingId;
            return element;
          }
          return element;
        });
        ToastSuccess("친구 추가 완료!");
        break;
      case FOLLOW_USER_REQUEST:
        draft.followUserDone = false;
        draft.followUserLoading = true;
        draft.followUserError = null;
        break;
      case FOLLOW_USER_FAILURE:
        draft.followUserLoading = false;
        draft.followUserError = null;
        ToastError("팔로우 추가에 실패했습니다. 다시 시도하세요.");
        break;
      case UNFOLLOW_USER_SUCCESS:
        draft.unFollowUserDone = true;
        draft.unFollowUserLoading = false;
        draft.following = action.data;
        draft.posts = draft.posts.map((element) => {
          if (element.User.id == action.data.followingId) {
            element.Follows.pop();
            return element;
          }
          return element;
        });
        ToastSuccess("선택한 포스트의 친구 삭제 완료!");
        break;
      case UNFOLLOW_USER_REQUEST:
        draft.unFollowUserDone = false;
        draft.unFollowUserLoading = true;
        draft.unFollowUserError = null;
        break;
      case UNFOLLOW_USER_FAILURE:
        draft.unFollowUserLoading = false;
        draft.unFollowUserError = action.error;
        ToastError("팔로우 취소에 실패했습니다. 다시 시도하세요.");
        break;
      default:
        break;
    }
  });

export default reducer;
