import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Menu.css";
import { ClassNames } from "@emotion/react";
import MenuList from "../components/MenuItem";


function MenuPage() {
return(
<div className="wrapper">
  <MenuList>
  </MenuList>
</div>
)
}
export default MenuPage;