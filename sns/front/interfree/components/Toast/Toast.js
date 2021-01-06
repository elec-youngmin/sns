//사용자 알림 설정

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <>
      <ToastContainer
        autoClose={4000}
        closeOnClick={false}
        style={{ textAlign: "center" }}
      />
    </>
  );
};

export default Toast;
