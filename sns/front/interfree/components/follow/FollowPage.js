//더 이상 쓸모 없어진 컴포넌트 이상 없으면 삭제

import React from "react";
import Router from "next/router";

import { Row, Col, Container } from "react-bootstrap";

import { useSelector } from "react-redux";

import { frontUrl } from "../../config/config";

const FollowPage = () => {
  const { followPosts } = useSelector((state) => state.post);

  return (
    <div>
      {followPosts.map((e) => {
        return (
          <Container
            style={{
              border: "1px solid #F0FFFF",
              borderRadius: "20px",
              boxShadow: "1px 1px 2px 2px #ccc",
              backgroundColor: "white",
              margin: "20px 0px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              Router.push(`${frontUrl}/user/${e.followingId}`);
            }}
          >
            <Row
              style={{
                margin: "10px 0px 0px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "150px",
                  height: "150px",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontSize: "60px",
                  }}
                >
                  {e.nickname[0]}
                </p>
              </div>
            </Row>
            <p style={{ fontSize: "20px" }}>{e.nickname}</p>
            <p>{e.introduce}</p>
            <Row
              style={{
                marginBottom: "10px",
                fontSize: "20px",
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
            <p style={{ fontSize: "20px" }}>
              링크:{e.ShareLink ? e.ShareLink : "게재되지 않음"}
            </p>
            <p style={{ fontSize: "20px" }}>
              사는 곳:{e.ShareLink ? e.ShareLink : "게재되지 않음"}
            </p>
          </Container>
        );
      })}
    </div>
  );
};

export default FollowPage;
