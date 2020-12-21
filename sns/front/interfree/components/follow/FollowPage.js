import React from "react";

import FollowUsercard from "./FollowUsercard";

import { Row, Col, Container } from "react-bootstrap";

import { useSelector } from "react-redux";

import { backUrl } from "../../config/config";

const FollowPage = () => {
  const { followPosts } = useSelector((state) => state.post);

  return (
    <div>
      {followPosts.map((e) => {
        console.log(e.src);

        return (
          <Container
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            <Row
              style={{
                marginTop: "10px",
              }}
            >
              <img
                src={`${backUrl}/${e.src}`}
                style={{ width: "150px", height: "150px", margin: "0px auto" }}
              />
            </Row>
            <p>{e.nickname}</p>
            <p>{e.introduce}</p>
            <Row
              style={{
                marginBottom: "10px",
              }}
            >
              <Col
                style={{
                  boxSizing: "content-box",
                  border: "3px solid #F5FFFA",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                포스트:{e.postsCount}
              </Col>
              <Col
                style={{
                  boxSizing: "content-box",
                  border: "3px solid #F5FFFA",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                팔로워:{e.followCount}
              </Col>
              <Col
                style={{
                  boxSizing: "content-box",
                  border: "3px solid #F5FFFA",
                  textAlign: "center",
                  padding: "0px",
                }}
              >
                팔로우:{e.followingCount}
              </Col>
            </Row>
            <p>링크:{e.ShareLink}</p>
            <p>사는 곳:{e.ShareLink}</p>
          </Container>
        );
      })}

      {/* <FollowUsercard
            imgSrc={e.src}
            nickname={e.nickname}
            introduce={e.introduce}
            postsCount={e.postsCount}
            followCount={e.followCount}
            followingCount={e.followingCount}
            ShareLink={e.ShareLink}
            where={e.where}
            userId={e.followingId}
          /> */}
    </div>
  );
};

export default FollowPage;
