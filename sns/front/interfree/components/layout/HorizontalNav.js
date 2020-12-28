import React from "react";
import Media from "react-media";

import DesktopHorizontalNav from "./DesktopHorizontalNav";
import MobileHorizontalNav from "./MobileHorizontalNav";

import { useSelector } from "react-redux";

const HorizontalNav = () => {
  return (
    <div>
      <Media query={{ maxWidth: 985 }}>
        {(matches) =>
          matches ? <MobileHorizontalNav /> : <DesktopHorizontalNav />
        }
      </Media>
    </div>
  );
};

export default HorizontalNav;
