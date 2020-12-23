import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Loading from "../../components/loading/Loading";
import RePasswordSettingForm from "../../components/setting/RePasswordSettingForm";

import { useDispatch, useSelector } from "react-redux";
import { FIND_PASSWORD_MYCONFIRM_REQUEST } from "../../reducers/user";

const FindPasswordMyConfirm = () => {
  const dispatch = useDispatch();
  const {
    findPasswordMyConfirmLoading,
    findPasswordMyConfirmDone,
    findPasswordMyConfirmError,
    resettingPasswordLoading,
    resettingPasswordDone,
    resettingPasswordError,
  } = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query;

  useMemo(() => {
    dispatch({
      type: FIND_PASSWORD_MYCONFIRM_REQUEST,
      data: { id },
    });
  }, []);

  return (
    <div style={{ paddingTop: "100px" }}>
      {findPasswordMyConfirmLoading && (
          <p>올바른 인증인지 확인하고 있어요.</p>
        ) && <Loading />}

      {findPasswordMyConfirmDone && <RePasswordSettingForm />}
      {findPasswordMyConfirmError && (
        <p>잘못된 요청이거나 유효시간이 지났습니다. 다시 시도 하세요.</p>
      )}
      {resettingPasswordDone && (
          <p>패스워드가 재 설정 되었어요. 변경된 패스워드로 로그인 하세요."</p>
        ) && <Link href="/"></Link>}
    </div>
  );
};

export default FindPasswordMyConfirm;
