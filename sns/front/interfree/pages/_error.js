import { useRouter } from "next/router";

import {
  SessionDiv,
  SessionP,
  SessionTitle,
  SessionButton,
  SessionRow,
} from "../styledComponents/layout/Session";

import { Col } from "react-bootstrap";

const _error = () => {
  const router = useRouter();

  return (
    <div>
      <SessionRow>
        <Col md={5}>
          <SessionDiv>
            <SessionTitle>서버 에러</SessionTitle>

            <SessionP>서버에러가 발생했습니다.</SessionP>

            <SessionP>
              서버에러가 계속 발생한다면 mintzerocode@gmail.com으로 에러 상황을
              보내주세요.
            </SessionP>

            <SessionButton onClick={() => router.back()}>
              뒤로가기
            </SessionButton>
          </SessionDiv>
        </Col>
      </SessionRow>
    </div>
  );
};

export default _error;
