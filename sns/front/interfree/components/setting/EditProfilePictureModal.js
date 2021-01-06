// 사용자의 프로필 사진을 변경할 수 있는 모달

import React, { useCallback } from "react";

import {
  ProfileImg,
  ProfileDiv,
  NicknameP,
} from "../../styledComponents/setting/EditProfilePictureModal";

import { useSelector, useDispatch } from "react-redux";
import { PROFILE_IMAGE_UPLOAD_REQUEST } from "../../reducers/user";

import { Button, Modal } from "react-bootstrap";

const EditProfilePictureModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profileImg = user?.ProfileImgSrcs
    ? user?.ProfileImgSrcs[0]?.src
    : false;

  const onhandleChange = useCallback((e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    imageFormData.append("userId", user.id);
    e.preventDefault();

    dispatch({
      type: PROFILE_IMAGE_UPLOAD_REQUEST,
      data: imageFormData,
    });
  });

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            프로필 사진 변경
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            enctype="multipart/form-data"
            style={{
              textAlign: "center",
            }}
          >
            <label
              for="file-input"
              styles={{
                display: "block",
                margin: "0px auto",
              }}
            >
              {profileImg ? (
                <ProfileImg
                  alt={profileImg}
                  src={profileImg}
                  role="button"
                ></ProfileImg>
              ) : (
                <ProfileDiv>
                  <NicknameP>{user.nickname[0].toUpperCase()}</NicknameP>
                </ProfileDiv>
              )}
            </label>

            <input
              id="file-input"
              type="file"
              name="image"
              accept="image/jpg,impge/png,image/jpeg"
              multiple
              style={{ display: "none" }}
              onChange={onhandleChange}
            />
          </form>
          <p
            style={{
              textAlign: "center",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            현재 프로필 사진을 눌러 원하는 프로필 사진으로 변경하세요.
          </p>
        </Modal.Body>

        <Modal.Footer class="col-lg-12">
          <Button
            className="btn float-right"
            onClick={props.onHide}
            style={{
              margin: "15px",
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfilePictureModal;
