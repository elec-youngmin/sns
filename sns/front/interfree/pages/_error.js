import React from "react";

import BottomTabs from "../components/layout/BottomTabs";

const _error = () => {
  return (
    <div>
      <BottomTabs />
      <p> 서버에러가 발생했습니다.</p>
    </div>
  );
};

export default _error;
