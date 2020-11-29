import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

import PostBoardLoading from "../components/loading/PostBoardLoading";

const Custom404 = () => {
  const router = useRouter();

  return (
    <>
      <h1 style={{ margin: "auto 0px" }}>요청한 페이지가 올바르지 않습니다.</h1>
      <Button onClick={() => router.back()}>뒤로가기</Button>
      <PostBoardLoading />
    </>
  );
};
export default Custom404;
