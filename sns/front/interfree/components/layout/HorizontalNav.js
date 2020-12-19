import React from "react";
import { useMediaQuery } from "react-responsive";

import DesktopHorizontalNav from "./DesktopHorizontalNav";
import MobileHorizontalNav from "./MobileHorizontalNav";

const HorizontalNav = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 985px)",
  });
  return (
    <div>
      {isTabletOrMobileDevice ? (
        <MobileHorizontalNav />
      ) : (
        <DesktopHorizontalNav />
      )}
    </div>
  );
};

export default HorizontalNav;
