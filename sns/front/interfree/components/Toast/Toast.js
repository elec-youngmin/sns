import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

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
