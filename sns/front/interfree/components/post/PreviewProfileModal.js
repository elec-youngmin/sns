import React from "react";

import UserProfileCard from "../allPost/UserProfileCard";

import { useSelector } from "react-redux";

import { Modal, Button } from "react-bootstrap";

const PreviewProfileModal = (props) => {
  const { user } = useSelector((state) => state.user);

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
            공개 프로필 미리보기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserProfileCard
            profileImg={
              user.ProfileImgSrcs.length === 0
                ? "userImage.jpg"
                : user.ProfileImgSrcs[0].src
            }
            nickname={user.nickname}
            introduce={user.introduce}
            postsCount={user.postsCount}
            followCount={user.followCount}
            followingCount={user.followingCount}
            shareLink={user.ShareLink}
            where={user.where}
          />
        </Modal.Body>
        <Modal.Footer class="col-lg-12">
          <Button
            class="btn float-right"
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

export default PreviewProfileModal;
