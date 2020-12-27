import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { frontUrl } from "../config/config";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(`${frontUrl}/allPostsBoard/`);
  }, []);

  return <></>;
};

export default Index;
