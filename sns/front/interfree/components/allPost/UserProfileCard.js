import React from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import backUrl from "../../config/config";

const UserProfileCard = ({
  profileImg,
  nickname,
  introduce,
  postsCount,
  followCount,
  followingCount,
  shareLink,
  where,
}) => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        {user.ProfileImgSrcs.length > 0 ? (
          <Card.Img
            class="rounded-circle w-50 p-3 mx-auto d-block"
            alt="profile_image1"
            role="button"
            // src={img.previewURL}
            src={`${backUrl}/${profileImg}`}
          ></Card.Img>
        ) : (
          <Card.Img
            class="rounded-circle w-50 p-3 mx-auto d-block"
            src={`${backUrl}/userImage.jpg`}
            alt="profile_image"
            role="button"
          ></Card.Img>
        )}

        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{nickname}</Card.Title>
          <Card.Text>
            {introduce ? introduce : <p>공개되는 소개가 없습니다.</p>}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" style={{ textAlign: "center" }}>
          <ListGroupItem>포스트 수: {postsCount} </ListGroupItem>
          <ListGroupItem>팔로워 : {followCount}</ListGroupItem>
          <ListGroupItem>팔로우 : {followingCount}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          {!shareLink && !where && <p>추가 정보가 없습니다.</p>}
          {shareLink && (
            <a href={ShareLink} target="_blank">
              {shareLink}
            </a>
          )}
          <br />
          {(where && "사는곳 :", where)}
        </Card.Body>
      </Card>
    </div>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.array,
  following: PropTypes.array,
  posts: PropTypes.array,
};

export default UserProfileCard;
