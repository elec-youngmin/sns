import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { frontUrl } from "../config/config";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`${frontUrl}/allPostsBoard/`);
  }, []);

  return <>{/* <LayOut /> */}</>;
};

export default Index;
