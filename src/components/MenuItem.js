import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const menu = (props) => (
 <tr>
   <td>{props.menu.name}</td>
   <td>{props.menu.position}</td>
   <td>{props.menu.level}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.menu._id}`}>Add to cart</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.addCart(props.menu._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function MenuList() {
 const [menus, setMenus] = useState([]);
 
 // This method fetches the menus from the database.
 useEffect(() => {
   async function getMenu() {
     const response = await fetch(`http://localhost:5050/menu/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const menus = await response.json();
     setMenus(menus);
   }
 
   getMenu();
 
   return;
 }, [menus.length]);
 
}