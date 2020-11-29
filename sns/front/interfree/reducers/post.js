import produce from "immer";

export const initialState = {
  savePostLoading: false,
  savePostdone: false,
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
  imageSavedone: false,
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

  reports: [],
  allPosts: [],
  posts: [], //로그인한 유저의 포스트들
  trashPosts: [],
  bookmarkPosts: [],
  followPosts: [],
  comments: [],
  imagePreview: [],
  allCharts: [],
  charts: [],
  hashtagPosts: [],
  postPage: null,
};

export const SAVE_POST_REQUEST = "SAVE_POST_REQUEST";
export const SAVE_POST_SUCCESS = "SAVE_POST_SUCCESS";
export const SAVE_POST_FAILURE = "SAVE_POST_FAILURE";

export const POST_AUTOSAVE_REQUEST = "POST_AUTOSAVE_REQUEST";
export const POST_AUTOSAVE_SUCCESS = "POST_AUTOSAVE_SUCCESS";
export const POST_AUTOSAVE_FAILURE = "POST_AUTOSAVE_FAILURE";

export const LOAD_ALLPOST_REQUEST = "LOAD_ALLPOST_REQUEST";
export const LOAD_ALLPOST_SUCCESS = "LOAD_ALLPOST_SUCCESS";
export const LOAD_ALLPOST_FAILURE = "LOAD_ALLPOST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILUR";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST"; //쓰레기 통으로 이동
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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SAVE_POST_SUCCESS:
        draft.savePostLoading = false;
        draft.savePostdone = true;
        draft.posts = action.data;
        break;
      case SAVE_POST_REQUEST:
        draft.savePostLoading = true;
        draft.savePostdone = false;
        draft.savePostError = false;
        break;
      case SAVE_POST_FAILURE:
        draft.postSaveLoading = false;
        draft.postSaveError = action.error;
        break;
      case LOAD_ALLPOST_SUCCESS:
        draft.loadAllPostLoading = false;
        draft.loadAllPostDone = true;
        draft.allPosts = draft.allPosts.concat(action.data);
        draft.posts = [];
        break;
      case LOAD_ALLPOST_REQUEST:
        draft.loadAllPostLoading = true;
        draft.loadAllPostDone = true;
        draft.loadAllPostError = null;
        break;
      case LOAD_ALLPOST_FAILURE:
        draft.loadAllPostLoading = false;
        draft.loadAllPostError = action.data;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.posts = draft.posts.concat(action.data);
        draft.allPosts = [];
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = false;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case UPDATE_POST_SUCCESS:
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        draft.posts = action.data;
        break;
      case UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        break;
      case UPDATE_POST_FAILURE:
        draft.updatePostLoading = false;
        draft.updatePosterror = action.error;
        break;
      case DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.posts = draft.posts.filter((num) => num.id != action.data);
        break;
      case DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        break;
      case DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostDone = false;
        draft.deletePostError = action.error;
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
        break;
      case DELETE_ALLTRASH_SUCCESS:
        draft.deleteAlltrashLoading = false;
        draft.deleteAlltrashDone = true;
        draft.trashPosts = [];
        break;
      case DELETE_ALLTRASH_REQUEST:
        draft.deleteAlltrashLoading = true;
        draft.deleteAlltrashDone = false;
        break;
      case DELETE_ALLTRASH_FAILURE:
        draft.deleteAlltrashLoading = false;
        draft.deleteAlltrashError = action.error;
        break;
      case DELETE_TRASHPOST_SUCCESS:
        draft.deleteTrashPostLoading = false;
        draft.deleteTrashPostDone = true;
        draft.trashPosts = [];
        break;
      case DELETE_TRASHPOST_REQUEST:
        draft.deleteTrashPostLoading = true;
        draft.deleteTrashPostDone = false;
        break;
      case DELETE_TRASHPOST_FAILURE:
        draft.deleteTrashPostLoading = false;
        draft.deleteTrashPostError = action.error;
        break;
      case RESTORE_ALLTRASH_SUCCESS:
        draft.restoreAlltrashDone = true;
        draft.restoreAlltrashLoading = false;
        draft.trashPosts = [];
        break;
      case RESTORE_ALLTRASH_REQUEST:
        draft.restoreAlltrashDone = false;
        draft.restoreAlltrashLoading = true;
        draft.restoreAlltrashError = null;
        break;
      case RESTORE_ALLTRASH_FAILURE:
        draft.restoreAlltrashLoading = false;
        draft.restoreAlltrashError = action.data;
        break;
      case RESTORE_TRASHPOST_SUCCESS:
        draft.restoreTrashPostDone = true;
        draft.restoreTrashPostLoading = false;
        draft.trashPosts = [];
        break;
      case RESTORE_TRASHPOST_REQUEST:
        draft.restoreTrashPostDone = false;
        draft.restoreTrashPostLoading = true;
        draft.restoreTrashPostError = null;
        break;
      case RESTORE_TRASHPOST_FAILURE:
        draft.restoreTrashPostLoading = false;
        draft.restoreTrashPostError = action.data;
        break;
      case ADD_BOOKMARK_SUCCESS:
        draft.addBookmarkDone = true;
        draft.addBookmarkLoading = false;
        if (action.data[0].dataType === "allPosts") {
          draft.allPosts = draft.allPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "posts") {
          draft.posts = draft.posts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "bookmark") {
          draft.bookmarkPosts = draft.bookmarkPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "UserPage") {
          draft.followPosts = draft.followPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "hashtagPosts") {
          draft.hashtagPosts = draft.hashtagPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        break;
      case ADD_BOOKMARK_REQUEST:
        draft.addBookmarkDone = false;
        draft.addBookmarkLoading = true;
        draft.addBookmarkError = null;
        break;
      case ADD_BOOKMARK_FAILURE:
        draft.addBookmarkLoading = true;
        draft.addBookmarkError = action.data;
        break;
      case CANCEL_BOOKMARK_SUCCESS:
        draft.cancelBookmarkDone = true;
        draft.cancelBookmarkLoading = false;
        if (action.data[0].dataType === "allPosts") {
          draft.allPosts = draft.allPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "posts") {
          draft.posts = draft.posts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "bookmark") {
          draft.bookmarkPosts = draft.bookmarkPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "follow") {
          draft.followPosts = draft.followPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        if (action.data[0].dataType === "hashtagPosts") {
          draft.hashtagPosts = draft.hashtagPosts.map((p) => {
            if (p.id == action.data[0].id) {
              return action.data[0];
            }
            return p;
          });
        }
        break;
      case CANCEL_BOOKMARK_REQUEST:
        draft.cancelBookmarkDone = false;
        draft.cancelBookmarkLoading = true;
        draft.cancelBookmarkError = null;
        break;
      case CANCEL_BOOKMARK_FAILURE:
        draft.cancelBookmarkLoading = true;
        draft.cancelBookmarkError = action.data;
        break;
      case LOAD_BOOKMARK_SUCCESS:
        draft.loadBookmarkDone = true;
        draft.loadBookmarkLoading = false;
        draft.bookmarkPosts = draft.bookmarkPosts.concat(action.data);
        break;
      case LOAD_BOOKMARK_REQUEST:
        draft.loadBookmarkDone = false;
        draft.loadBookmarkLoading = true;
        draft.loadBookmarkError = null;
        break;
      case LOAD_BOOKMARK_FAILURE:
        draft.loadBookmarkLoading = false;
        draft.loadBookmarkError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.comments = action.data;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
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
        break;
      case DELETE_COMMENT_SUCCESS:
        draft.deleteCommentDone = false;
        draft.deleteCommentLoading = false;
        draft.comments = draft.comments.filter((i) => i.id != action.data);
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
        break;
      case UPDATE_COMMENT_SUCCESS:
        draft.updateCommentDone = true;
        draft.updateCommentLoading = false;
        draft.comments = action.data;
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
        break;
      case IMAGE_SAVE_SUCCESS:
        draft.imageSaveLoading = false;
        draft.imageSavedone = true;
        draft.imagePreview = action.data;
        break;
      case IMAGE_SAVE_REQUEST:
        draft.imageSaveLoading = true;
        draft.imageSavedone = false;
        draft.imageSaveError = false;
        break;
      case IMAGE_SAVE_FAILURE:
        draft.imageSaveLoading = false;
        draft.imageSaveError = action.error;
        break;
      case UPLOAD_VIDEO_SUCCESS:
        draft.uploadVideoLoading = false;
        draft.uploadVideoDone = true;
        // draft.imagePreview = action.data;
        break;
      case UPLOAD_VIDEO_REQUEST:
        draft.uploadVideoLoading = true;
        draft.uploadVideoDone = false;
        draft.uploadVideoError = null;
        break;
      case UPLOAD_VIDEO_FAILURE:
        draft.uploadVideoLoading = false;
        draft.uploadVideoError = action.error;
        break;
      case LIKE_POST_SUCCESS:
        draft.likePostLoading = false;
        draft.likePostDone = true;
        if (action.data.dataType === "allPosts") {
          draft.allPosts = draft.allPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "posts") {
          draft.posts = draft.posts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "bookmark") {
          draft.bookmarkPosts = draft.bookmarkPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "follow") {
          draft.followPosts = draft.followPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "hashtagPosts") {
          draft.hashtagPosts = draft.hashtagPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }

        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case CANCEL_LIKE_POST_SUCCESS:
        draft.cancelLikePostLoading = false;
        draft.cancelLikePostDone = true;
        if (action.data.dataType === "allPosts") {
          draft.allPosts = draft.allPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "posts") {
          draft.posts = draft.posts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "bookmark") {
          draft.bookmarkPosts = draft.bookmarkPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "follow") {
          draft.followPosts = draft.followPosts.map((p) => {
            if (p.id == action.data.id) {
              return action.data;
            }
            return p;
          });
        }
        if (action.data.dataType === "hashtagPosts") {
          draft.hashtagPosts = actin.data;
          // draft.hashtagPosts = draft.hashtagPosts.map((p) => {
          //   if (p.id == action.data.id) {
          //     return action.data;
          //   }
          //   return p;
          // });
        }
        break;
      case CANCEL_LIKE_POST_REQUEST:
        draft.cancelLikePostLoading = true;
        draft.cancelLikePostDone = false;
        draft.cancelLikePostError = null;
        break;
      case CANCEL_LIKE_POST_FAILURE:
        draft.cancelLikePostLoading = false;
        draft.cancelLikePostError = action.error;
        break;
      case LOAD_FOLLOWS_POST_SUCCESS:
        draft.loadFollowsPostLoading = false;
        draft.loadFollowsPostdone = true;
        draft.followPosts = action.data;
        break;
      case LOAD_FOLLOWS_POST_REQUEST:
        draft.loadFollowsLoading = true;
        draft.loadFollowsdone = false;
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
        break;
      case COUNT_REPORT_REQUEST:
        draft.countReportDone = false;
        draft.countReportLoding = true;
        draft.countReportError = null;
        break;
      case COUNT_REPORT_FAILURE:
        draft.countReportLoding = false;
        draft.countReportError = null;
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
        draft.loadUserPageError = null;
        break;
      case LOAD_HASHTAGPAGE_SUCCESS:
        draft.loadHashtagPageDone = true;
        draft.loadHashtagPageLoding = false;
        draft.hashtagPosts = action.data;
        break;
      case LOAD_HASHTAGPAGE_REQUEST:
        draft.loadHashtagPageDone = false;
        draft.loadHashtagPageLoding = true;
        draft.loadHashtagPageError = null;
        break;
      case LOAD_HASHTAGPAGE_FAILURE:
        draft.loadHashtagPageLoding = false;
        draft.loadHashtagPageError = null;
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
        draft.loadChartDataError = null;
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
        draft.loadOneuserChartdataError = null;
        break;
      case LOAD_POSTPAGE_SUCCESS:
        draft.loadPostPageDone = true;
        draft.loadPostPageLoding = false;
        draft.postPage = action.data;
        break;
      case LOAD_POSTPAGE_REQUEST:
        draft.loadPostPageDone = false;
        draft.loadPostPageLoding = true;
        draft.loadPostPageError = null;
        break;
      case LOAD_POSTPAGE_FAILURE:
        draft.loadPostPageLoding = false;
        draft.loadPostPageError = null;
        break;
      default:
        break;
    }
  });

export default reducer;
