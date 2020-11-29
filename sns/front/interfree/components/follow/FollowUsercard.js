import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { LOAD_USERPAGE_REQUEST } from "../../reducers/post";

import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const FollowUsercard = ({
  imgSrc,
  nickname,
  introduce,
  postsCount,
  followCount,
  followingCount,
  ShareLink,
  where,
  userId,
}) => {
  const { user, following } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        <Card.Img
          class="rounded-circle w-50 p-3 mx-auto d-block"
          alt="profile_image1"
          role="button"
          // src={img.previewURL}
          src={`http://localhost:80/${imgSrc}`}
          onClick={() => {
            dispatch({
              type: LOAD_USERPAGE_REQUEST,
              data: { userId },
            });
            router.push(`UserPage/${userId}/`);
          }}
        ></Card.Img>

        <Card.Body>
          <Card.Title>{nickname}</Card.Title>
          <Card.Text>
            {introduce ? introduce : <p>공개되는 소개가 없습니다.</p>}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>포스트 수: {postsCount} </ListGroupItem>
          <ListGroupItem>팔로워 : {followCount}</ListGroupItem>
          <ListGroupItem>팔로우 : {followingCount}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          {!ShareLink && !where && <p>추가 정보가 없습니다.</p>}
          {ShareLink && <a href={ShareLink} target="_blank"></a>}
          <br />
          {(where && "사는곳 :", where)}
        </Card.Body>
      </Card>
    </div>
  );
};

// FollowUsercard.propTypes = {
//   user: PropTypes.array,
//   following: PropTypes.array,
//   posts: PropTypes.array,
// };

export default FollowUsercard;
