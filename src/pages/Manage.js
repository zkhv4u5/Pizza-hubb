import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./Home.css";
import { ClassNames } from "@emotion/react";
import ManageComp from "../components/manageComp";


function ManagePage() {
return(
<div className="menu-container">
  <ManageComp>
  </ManageComp>
</div>
)
}
export default ManagePage;