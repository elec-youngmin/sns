// 사용자가 액션을 일으키면 액션이 완료될 때 까지 생성되는 로딩창


import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      <Spinner animation="border" size="sm" />
    </>
  );
};

export default Loading;
