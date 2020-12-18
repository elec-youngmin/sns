import React from "react";
import { useRouter } from "next/router";
import Menu, { SubMenu, MenuItem, Divider } from "rc-menu";
import "rc-menu/assets/index.css";
const TestMenu = () => {
  return (
    <Menu mode="horizontal" style={{ padding: "80px" }}>
      <MenuItem>1</MenuItem>
      <MenuItem>1</MenuItem>

      <MenuItem>1</MenuItem>

      <MenuItem>1</MenuItem>
    </Menu>
  );
};

export default TestMenu;
