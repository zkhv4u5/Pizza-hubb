import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Home.css";
import { ClassNames } from "@emotion/react";
import MenuList from "../components/MenuItem";


function MenuPage() {
return(
<div className="menu-container">
  <MenuList>
  </MenuList>
</div>
)
}
export default MenuPage;