import React from "react";
import { useRouter } from "next/router";

import { frontUrl } from "../../config/config";

import {
  BoxContainter,
  Img,
} from "../../styledComponents/postBoard/PicturePostBox";

const PicturePostBox = ({ postId, img }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`${frontUrl}/post/${postId}/`);
      }}
    >
      <Img src={img} alt={img} />
    </div>
  );
};

export default PicturePostBox;
