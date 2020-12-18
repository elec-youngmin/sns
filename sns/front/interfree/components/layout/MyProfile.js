import React, { useCallback } from "react";
import Avatar from "react-avatar";

import { useDispatch, useSelector } from "react-redux";
import { PROFILE_IMAGE_UPLOAD_REQUEST } from "../../reducers/user";

import { Row, Col, Table, Button } from "react-bootstrap";

import { backUrl } from "../../config/config";

const MyProfile = () => {
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
    <>
      <Row
        style={{
          backgroundColor: "white",
          border: "1px solid #F0FFFF",
          borderRadius: "5px",
          boxShadow: "1px 1px 3px 3px #ccc",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Col md={5}>
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
                  }}
                ></img>
              ) : (
                <Avatar
                  name={user.nickname}
                  style={{
                    minWidth: "180px",
                    minHeight: "180px",
                    maxWidth: "180px",
                    maxHeight: "180px",
                  }}
                />
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
        </Col>
        <Col md={7}>
          <br />
          <Table>
            <tbody>
              <tr class="text-center">
                <td colSpan="3">
                  <h4>
                    {/* {user.nickname} */}
                    <Button
                      variant="primary"
                      onClick={() => {
                        setModalShow(true);
                      }}
                    >
                      공개 프로필 미리보기
                    </Button>
                  </h4>
                </td>
              </tr>

              <tr>
                <td>
                  <span style={{ marginRight: "10px" }}>포스트</span>
                  <span>{user.postsCount}</span>
                </td>
                <td>
                  <span style={{ marginRight: "10px" }}>팔로워</span>
                  <span>{user.followCount}</span>
                </td>
                <td>
                  <span style={{ marginRight: "10px" }}>팔로우</span>
                  {user.followingCount}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default MyProfile;
