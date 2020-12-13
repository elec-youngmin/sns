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
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  loadUserInfomationLoading: false,
  loadUserInfomationDone: false,
  loadUserInfomationError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  destroyUserLoading: false,
  destroyUserDone: false,
  destroyUserError: null,
  profileImageUploadLoading: false,
  profileImageUploadDone: false,
  profileImageUploadError: null,
  changeProfileLoading: false,
  changeProfileDone: false,
  changeProfileError: null,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  findPasswordLoading: false,
  findPasswordDone: false,
  findPasswordError: null,
  findPasswordMyConfirmLoading: false,
  findPasswordMyConfirmDone: false,
  findPasswordMyConfirmError: null,
  resettingPasswordLoading: false,
  resettingPasswordDone: false,
  resettingPasswordError: null,
  followUserLoading: false,
  followUserDone: false,
  followUserError: null,
  unFollowUserLoading: false,
  unFollowUserDone: false,
  unFollowUserError: null,
  loadFollowingUserLoading: false,
  loadFollowingUserDone: false,
  loadFollowingUserError: false,
  disabledOneuserAllpostLoading: false,
  disabledOneuserAllpostDone: false,
  disabledOneuserAllpostError: null,
  activateOneuserAllpostLoading: false,
  activateOneuserAllpostDone: false,
  activateOneuserAllpostError: null,
  user: null,
  email: null,
  following: [],
};

export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const LOAD_USER_INFOMATION_REQUEST = "LOAD_USER_INFOMATION_REQUEST";
export const LOAD_USER_INFOMATION_SUCCESS = "LOAD_USER_INFOMATION_SUCCESS";
export const LOAD_USER_INFOMATION_FAILURE = "LOAD_USER_INFOMATION_FAILURE";

export const USER_KAKAO_LOGIN_REQUEST = "USER_KAKAO_LOGIN_REQUEST";
export const USER_KAKAO_LOGIN_SUCCESS = "USER_KAKAO_LOGIN_SUCCESS";
export const USER_KAKAO_LOGIN_FAILURE = "USER_KAKAO_LOGIN_FAILURE";

export const USER_LOGOUT_REQUEST = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILURE = "USER_LOGOUT_FAILURE";

export const DESTROY_USER_REQUEST = "DESTROY_USER_REQUEST";
export const DESTROY_USER_SUCCESS = "DESTROY_USER_SUCCESS";
export const DESTROY_USER_FAILURE = "DESTROY_USER_FAILURE";

export const PROFILE_IMAGE_UPLOAD_REQUEST = "PROFILE_IMAGE_UPLOAD_REQUEST";
export const PROFILE_IMAGE_UPLOAD_SUCCESS = "PROFILE_IMAGE_UPLOAD_SUCCESS";
export const PROFILE_IMAGE_UPLOAD_FAILURE = "PROFILE_IMAGE_UPLOAD_FAILURE";

export const LOAD_PROFILE_IMG_SRC_REQUEST = "LOAD_PROFILE_IMG_SRC_REQUEST";
export const LOAD_PROFILE_IMG_SRC_SUCCESS = "LOAD_PROFILE_IMG_SRC_SUCCESS";
export const LOAD_PROFILE_IMG_SRC_FAILURE = "LOAD_PROFILE_IMG_SRC_FAILURE";

export const CHANGE_PROFILE_REQUEST = "CHANGE_PROFILE_REQUEST";
export const CHANGE_PROFILE_SUCCESS = "CHANGE_PROFILE_SUCCESS";
export const CHANGE_PROFILE_FAILURE = "CHANGE_PROFILE_FAILURE";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const FIND_PASSWORD_REQUEST = "FIND_PASSWORD_REQUEST";
export const FIND_PASSWORD_SUCCESS = "FIND_PASSWORD_SUCCESS";
export const FIND_PASSWORD_FAILURE = "FIND_PASSWORD_FAILURE";

//프론트 토큰과 백엔드 토큰이 일치하는지 요청을 보냄.
export const FIND_PASSWORD_MYCONFIRM_REQUEST =
  "FIND_PASSWORD_MYCONFIRM_REQUEST";
export const FIND_PASSWORD_MYCONFIRM_SUCCESS =
  "FIND_PASSWORD_MYCONFIRM_SUCCESS";
export const FIND_PASSWORD_MYCONFIRM_FAILURE =
  "FIND_PASSWORD_MYCONFIRM_FAILURE ";

export const RESETTING_PASSWORD_REQUEST = "RESETTING_PASSWORD_REQUEST";
export const RESETTING_PASSWORD_SUCCESS = "RESETTING_PASSWORD_SUCCESS";
export const RESETTING_PASSWORD_FAILURE = "RESETTING_PASSWORD_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const LOAD_FOLLOWING_USER_REQUEST = "LOAD_FOLLOWING_USER_REQUEST";
export const LOAD_FOLLOWING_USER_SUCCESS = "LOAD_FOLLOWING_USER_SUCCESS";
export const LOAD_FOLLOWING_USER_FAILURE = "LOAD_FOLLOWING_USER_FAILURE";

export const DISABLED_ONEUSER_ALLPOST_REQUEST =
  "DISABLED_ONEUSER_ALLPOST_REQUEST";
export const DISABLED_ONEUSER_ALLPOST_SUCCESS =
  "DISABLED_ONEUSER_ALLPOST_SUCCESS";
export const DISABLED_ONEUSER_ALLPOST_FAILURE =
  "DISABLED_ONEUSER_ALLPOST_FAILURE";

export const ACTIVATE_ONEUSER_ALLPOST_REQUEST =
  "ACTIVATE_ONEUSER_ALLPOST_REQUEST";
export const ACTIVATE_ONEUSER_ALLPOST_SUCCESS =
  "ACTIVATE_ONEUSER_ALLPOST_SUCCESS";
export const ACTIVATE_ONEUSER_ALLPOST_FAILURE =
  "ACTIVATE_ONEUSER_ALLPOST_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case USER_LOGIN_SUCCESS:
        draft.logInLoading = false;
        draft.user = action.data;
        draft.logInDone = true;
        ToastSuccess("로그인이 완료되었어요.");
        break;
      case USER_LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case USER_LOGIN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case USER_LOGOUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        // draft.user = [];
        break;
      case USER_LOGOUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case USER_LOGOUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOAD_USER_INFOMATION_SUCCESS:
        draft.loadUserInfomationLoading = false;
        draft.loadUserInfomationDone = true;
        draft.user = action.data;
        break;
      case LOAD_USER_INFOMATION_FAILURE:
        draft.loadUserInfomationLoading = false;
        draft.loadUserInfomationError = action.error;
        break;
      case LOAD_USER_INFOMATION_REQUEST:
        draft.loadUserInfomationLoading = true;
        draft.loadUserInfomationError = null;
        draft.loadUserInfomationDone = false;
        break;
      case USER_SIGNUP_SUCCESS:
        draft.signUpLoading = false;
        draft.user = action.data;
        draft.signUpDone = true;
        break;
      case USER_SIGNUP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case USER_SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case DESTROY_USER_SUCCESS:
        draft.destroyUserLoading = false;
        draft.destroyUserDone = true;
        draft.destroyUserError = null;
        break;
      case DESTROY_USER_FAILURE:
        draft.destroyUserLoading = false;
        draft.destroyUserError = action.error;
        break;
      case DESTROY_USER_REQUEST:
        draft.destroyUserLoading = true;
        draft.destroyUserDone = false;
        draft.destroyUserError = null;
        break;
      case PROFILE_IMAGE_UPLOAD_SUCCESS:
        draft.profileImageUploadLoading = false;
        draft.profileImageUploadDone = true;
        draft.user = action.data;
        ToastSuccess("프로필 이미지가 업로드되었어요.");
        break;
      case PROFILE_IMAGE_UPLOAD_FAILURE:
        draft.profileImageUploadLoading = false;
        draft.profileImageUploadError = action.error;
        ToastError("프로필 이미지 업로드에 실패했습니다. 다시 시도하세요.");
        break;
      case PROFILE_IMAGE_UPLOAD_REQUEST:
        draft.profileImageUploadLoading = true;
        draft.profileImageUploadDone = false;
        draft.profileImageUploadError = null;
        break;
      case CHANGE_PROFILE_SUCCESS:
        draft.changeProfileLoading = false;
        draft.user = action.data;
        draft.changeProfileDone = true;
        ToastSuccess("작성하신 프로필이 반영되었어요.");
        break;
      case CHANGE_PROFILE_FAILURE:
        draft.changeProfileLoading = false;
        draft.signUpError = action.error;
        ToastError("작성하신 프로필의 반영이 실패했습니다. 다시 시도하세요.");
        break;
      case CHANGE_PROFILE_REQUEST:
        draft.changeProfileLoading = true;
        draft.logInError = null;
        draft.changeProfileDone = false;
        break;
      case FIND_PASSWORD_SUCCESS:
        draft.findPasswordDone = true;
        draft.findPasswordLoading = false;
        draft.email = action.data;
        break;
      case FIND_PASSWORD_REQUEST:
        draft.findPasswordDone = false;
        draft.findPasswordLoading = true;
        draft.findPasswordError = null;
        break;
      case FIND_PASSWORD_FAILURE:
        draft.findPasswordLoading = false;
        draft.findPasswordError = action.error;
        break;
      case FIND_PASSWORD_MYCONFIRM_SUCCESS:
        draft.findPasswordMyConfirmDone = true;
        draft.findPasswordMyConfirmLoading = false;
        break;
      case FIND_PASSWORD_MYCONFIRM_REQUEST:
        draft.findPasswordMyConfirmDone = false;
        draft.findPasswordMyConfirmLoading = true;
        draft.findPasswordMyConfirmError = null;
        break;
      case FIND_PASSWORD_MYCONFIRM_FAILURE:
        draft.findPasswordMyConfirmLoading = false;
        draft.findPasswordMyConfirmError = action.data;
        break;
      case RESETTING_PASSWORD_SUCCESS:
        draft.resettingPasswordDone = true;
        draft.resettingPasswordLoading = false;
        break;
      case RESETTING_PASSWORD_REQUEST:
        draft.resettingPasswordDone = false;
        draft.resettingPasswordLoading = true;
        draft.resettingPasswordError = null;
        break;
      case RESETTING_PASSWORD_FAILURE:
        draft.resettingPasswordLoading = false;
        draft.resettingPasswordError = action.error;
        break;
      case FOLLOW_USER_SUCCESS:
        draft.followUserDone = true;
        draft.followUserLoading = false;
        draft.following = action.data;
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
      case LOAD_FOLLOWING_USER_SUCCESS:
        draft.loadFollowingUserDone = true;
        draft.loadFollowingUserLoading = false;
        draft.following = action.data;
        break;
      case LOAD_FOLLOWING_USER_REQUEST:
        draft.loadFollowingUserDone = false;
        draft.loadFollowingUserLoading = true;
        draft.loadFollowingUserError = null;
        break;
      case LOAD_FOLLOWING_USER_FAILURE:
        draft.unFollowUserLoading = false;
        draft.unFollowUserError = action.data;
        break;
      case DISABLED_ONEUSER_ALLPOST_SUCCESS:
        draft.disabledOneuserAllpostDone = true;
        draft.disabledOneuserAllpostLoding = false;
        draft.user.disabled = draft.user.disabled = true;
        ToastSuccess("모든글이 비활성화되었어요.");
        break;
      case DISABLED_ONEUSER_ALLPOST_REQUEST:
        draft.disabledOneuserAllpostDone = false;
        draft.disabledOneuserAllpostLoding = true;
        draft.disabledOneuserAllpostError = null;
        break;
      case DISABLED_ONEUSER_ALLPOST_FAILURE:
        draft.disabledOneuserAllpostLoding = false;
        draft.disabledOneuserAllpostError = null;
        ToastError("모든글 비활성화에 실패했습니다. 다시 시도하세요.");
        break;
      case ACTIVATE_ONEUSER_ALLPOST_SUCCESS:
        draft.activateOneuserAllpostDone = true;
        draft.activateOneuserAllpostLoding = false;
        draft.user.disabled = draft.user.disabled = false;
        ToastSuccess("모든글이 다시 활성화되었어요.");
        break;
      case ACTIVATE_ONEUSER_ALLPOST_REQUEST:
        draft.activateOneuserAllpostDone = false;
        draft.activateOneuserAllpostLoding = true;
        draft.activateOneuserAllpostError = null;
        break;
      case ACTIVATE_ONEUSER_ALLPOST_FAILURE:
        draft.activateOneuserAllpostLoding = false;
        draft.activateOneuserAllpostError = null;
        ToastError("모든글 활성화에 실패했습니다. 다시 시도하세요.");
        break;
      default:
        draft;
        break;
    }
  });

export default reducer;
