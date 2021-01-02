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
