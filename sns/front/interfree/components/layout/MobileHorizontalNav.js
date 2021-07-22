// 모바일에서 생성되는 상단 가로 네비게이션 바

import React, { useMemo, useState, useRef } from "react";
import Router from "next/router";

import SliderMenu from "./SliderMenu";
import SearchModal from "./SearchModal";
import Login from "../login/Login";

import {
  MobileContainer,
  MobileSliderButton,
  Logo,
  LogoContainer,
  Div,
  MobileUserButton
} from "../../styledComponents/layout/HorizontalNav";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineBars, AiOutlineUser } from "react-icons/ai";



import { frontUrl } from "../../config/config";

const Menu = () => {

  const dispatch = useDispatch();
  const { logInDone, logOutDone } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.user.user);
  const [searchModalShow, setSearchModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [menubarShow, setMenubarShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);


  useMemo(() => {
    if (logInDone) {
      setMenubarShow(false);
    }
  }, [logInDone]);

  useMemo(() => {
    if (logOutDone) {
      setMenubarShow(false);
    }
  }, [logOutDone]);


  const [showDiv, setShowDiv] = useState(false);

  return (
    <MobileContainer>

      {showDiv && (
        <>
          <SliderMenu showDiv={showDiv} id={id} />
        </>
      )}


      <SearchModal
        show={searchModalShow}
        onHide={() => setSearchModalShow(false)}
      />

      {/* <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} /> */}





      <Div>
        <MobileSliderButton
          onClick={() => {
            setShowDiv(!showDiv);
          }}>
          <AiOutlineBars />
        </MobileSliderButton>
      </Div>




      <div></div>
      <LogoContainer>
        <Logo
          onClick={() => {
            Router.push(`${frontUrl}/allPostsBoard`);
          }}
        >
          interfree
        </Logo>
      </LogoContainer>
      <div></div>

      <Div>
        <MobileUserButton
          onClick={() => {
            setShowDiv(!showDiv);
          }}><AiOutlineUser />
        </MobileUserButton>
      </Div>



    </MobileContainer >
  );
};

export default Menu;
