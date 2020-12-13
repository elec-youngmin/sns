import React from "react";
import { useRouter } from "next/router";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
const TestMenu = () => {
  return (
    <Menu style={{ padding: "80px" }}>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>

      <MenuItem>3</MenuItem>

      <MenuItem>4</MenuItem>
    </Menu>
  );
};

export default TestMenu;
