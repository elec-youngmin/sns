import React, { useState } from "react";
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from "react-floating-button-menu";

import WritePostModal from "./WritePostModal";
import SettingModal from "./SettingModal";
import FollowModal from "./FollowModal";
import AudioWirtePostModal from "./AudioWirtePostModal";

import {
  AiFillSetting,
  AiFillEdit,
  AiFillAudio,
  AiFillCaretRight,
} from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";

const FloatingButton = () => {
  const [childButton, setChildButton] = useState(false);
  const [writePostShow, setWritePostShow] = useState(false);
  const [AudioWirtePostShow, setAudioWirtePostShow] = useState(false);
  const [settingShow, setSettingShow] = useState(false);
  const [followShow, setFollowShow] = useState(false);

  return (
    <>
      <WritePostModal
        show={writePostShow}
        onHide={() => setWritePostShow(false)}
      />

      <AudioWirtePostModal
        show={AudioWirtePostShow}
        onHide={() => setAudioWirtePostShow(false)}
      />

      <SettingModal show={settingShow} onHide={() => setSettingShow(false)} />

      <FollowModal show={followShow} onHide={() => setFollowShow(false)} />

      <FloatingMenu
        slideSpeed={300}
        direction="up"
        spacing={8}
        isOpen={childButton}
        style={{
          position: "fixed",
          bottom: "30px",
          left: "30px",
          zIndex: "100",
        }}
      >
        <MainButton
          iconResting={<BsPlus style={{ fontSize: 30 }} nativeColor="black" />}
          iconActive={<BsPlus style={{ fontSize: 40 }} nativeColor="black" />}
          size={56}
          style={{ backgroundColor: "#E6E6FA" }}
          onClick={() => {
            setChildButton(!childButton);
          }}
        />
        <ChildButton
          icon={<AiFillEdit style={{ fontSize: 20 }} nativeColor="black" />}
          size={40}
          style={{ backgroundColor: "white" }}
          onClick={() => setWritePostShow(true)}
        />
        <ChildButton
          icon={<AiFillAudio style={{ fontSize: 20 }} nativeColor="black" />}
          size={40}
          style={{ backgroundColor: "white" }}
          onClick={() => setAudioWirtePostShow(true)}
        />

        <ChildButton
          backgroundColor="white"
          icon={<GoOrganization style={{ fontSize: 20 }} nativeColor="black" />}
          size={40}
          style={{ backgroundColor: "white" }}
          onClick={() => {
            setFollowShow(true);
          }}
        />

        <ChildButton
          backgroundColor="white"
          icon={<AiFillSetting style={{ fontSize: 20 }} nativeColor="black" />}
          size={40}
          onClick={() => {
            setSettingShow(true);
          }}
        />
      </FloatingMenu>
    </>
  );
};

export default FloatingButton;
