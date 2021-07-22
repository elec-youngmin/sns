// 이 컴포넌트에서 화면 크기에 따라 모바일 가로 네비게이션을 렌더링 할지 데스크탑 가소 네비게이션을 렌더링 할지 지정함.
// 화면 넓이가 985px까지 모바일 렌더링, 화면 넓이가 986px 이상이면 데스크탑 렌더링

import React from "react";
import Media from "react-media";

import DesktopHorizontalNav from "./DesktopHorizontalNav";
import MobileHorizontalNav from "./MobileHorizontalNav";

const HorizontalNav = () => {
  const initialState = {
    device: "mobile",
  };

  return (
    <div>
      <Media
        queries={{ medium: "(max-width: 985px)" }}
        defaultMatches={{ medium: initialState.device === "desktop" }}
        render={() => <MobileHorizontalNav />}
      />

      <Media
        queries={{ medium: "(min-width: 986px)" }}
        defaultMatches={{ medium: initialState.device === "desktop" }}
        render={() => <DesktopHorizontalNav />}
      />
    </div>
  );
};

export default HorizontalNav;
