import React, { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { PROFILE_IMAGE_UPLOAD_REQUEST } from "../../reducers/user";

import { Row, Col, Table, Button, Modal } from "react-bootstrap";

import { backUrl } from "../../config/config";

const EditProfilePictureModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const profileImg = user?.ProfileImgSrcs[0]?.src;

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
                <img
                  class="rounded-circle w-50 p-3 mx-auto d-block"
                  alt={`${profileImg}`}
                  role="button"
                  src={`${backUrl}/${profileImg}`}
                  style={{
                    minWidth: "180px",
                    minHeight: "180px",
                    maxWidth: "180px",
                    maxHeight: "180px",
                    cursor: "pointer",
                  }}
                ></img>
              ) : (
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    backgroundColor: "#DCDCDC",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "5px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      fontSize: "70px",
                      fontWeight: "600",
                      margin: "0px",
                    }}
                  >
                    {user.nickname[0].toUpperCase()}
                  </p>
                </div>
              )}
            </label>
            <input
              id="file-input"
              type="file"
              name="image"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
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
