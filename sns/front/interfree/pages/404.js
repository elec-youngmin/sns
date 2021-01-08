import { useRouter } from "next/router";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionRow,
} from "../styledComponents/layout/Session";

import { Col } from "react-bootstrap";

const Custom404 = () => {
  const router = useRouter();

  return (
    <div>
      <SessionRow>
        <Col md={5}>
          <SessionDiv>
            <SessionTitle>404 에러</SessionTitle>

            <SessionP>현재 페이지를 찾을 수 없어요.</SessionP>
            <SessionP>요청한 페이지가 확실하다면 다시 시도하세요.</SessionP>
            <SessionButton onClick={() => router.back()}>
              뒤로가기
            </SessionButton>
          </SessionDiv>
        </Col>
      </SessionRow>
    </div>
  );
};
export default Custom404;
