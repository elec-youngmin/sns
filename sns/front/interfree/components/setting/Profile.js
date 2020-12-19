import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import Loading from "../loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PROFILE_REQUEST } from "../../reducers/user";
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import { BsExclamationTriangle } from "react-icons/bs";
import styled from "styled-components";

const Styledp = styled.p`
  font-size: 25px;
  margin-bottom: 0px;
  @media (max-width: 992px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`;

const Styledinput = styled.input`
  width: 250px;
  @media (max-width: 992px) {
    width: 200px;
  }
  @media (max-width: 772px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 190px;
  }
  @media (max-width: 600px) {
    width: 140px;
  }
`;

const NotReviseAlert = () => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-disabled">수정할 수 없어요.</Tooltip>}
      >
        <span className="d-inline-block">
          <BsExclamationTriangle />
        </span>
      </OverlayTrigger>
    </>
  );
};

const Profile = () => {
  const {
    id,
    email,
    nickname,
    introduce,
    ShareLink,
    where,
    createdAt,
  } = useSelector((state) => state.user.user);
  const {
    changeProfileDone,
    changeProfileError,
    changeProfileLoading,
  } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [introduceValue, setIntroduceValue] = useState(introduce);
  const [shereLinkValue, setShereLinkValue] = useState(ShareLink);
  const [whereValue, setWhereValue] = useState(where);

  const dispatch = useDispatch();
  const dateToFormat = createdAt;

  const dateSet = <Moment format="YYYY/MM/DD">{dateToFormat}</Moment>;

  console.log(dateSet);
  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>닉네임</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={nicknameValue}
                onChange={(e) => {
                  setNicknameValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>
                이메일 <NotReviseAlert />
              </Styledp>
            </td>
            <td>{email}</td>
          </tr>
          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>
                가입일 <NotReviseAlert />
              </Styledp>
            </td>
            <td>
              <Moment format="YYYY/MM/DD">{dateToFormat}</Moment>
            </td>
          </tr>

          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>소개</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                vaule={introduce}
                onChange={(e) => {
                  setIntroduceValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>링크</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={ShareLink}
                onChange={(e) => {
                  setShereLinkValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "0px" }}>
              <Styledp>사는 곳</Styledp>
            </td>
            <td>
              <Styledinput
                type="text"
                value={where}
                onChange={(e) => {
                  setWhereValue(e.target.value);
                }}
              ></Styledinput>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                variant="primary"
                className=" float-right"
                onClick={() => {
                  dispatch({
                    type: CHANGE_PROFILE_REQUEST,
                    data: {
                      id,
                      nicknameValue,
                      introduceValue,
                      shereLinkValue,
                      whereValue,
                    },
                  });
                }}
              >
                반영
              </Button>
              {changeProfileLoading && <Loading />}
              {changeProfileDone && <p>반영이 완료되었습니다.</p>}
              {changeProfileError && <p>에러가 발생했습니다.</p>}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default Profile;
