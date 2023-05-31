import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Menu = (props) => (
 <tr>
   <td>{props.menu.name}</td>
   <td>{props.menu.price}</td>
   <td>{props.menu.ingredents}</td>
 </tr>
);
 
export default function MenuList() {
 const [items, setMenu] = useState([]);
 
 // This method fetches the items from the database.
 useEffect(() => {
   async function getMenu() {
     const response = await fetch(`http://localhost:5050/menu/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const items = await response.json();
     setMenu(items);
   }
 
   getMenu();
 
   return;
 }, [items.length]);
 
 function menuList() {
  return Menu.map((name,price,ingredents) => {
    return (
      <Menu
        name={name}
        price={price}
        ingredents={ingredents}
      />
    );
  });
}

 return (
  <div>
    <h3>Menu</h3>
    <table className="table table-striped" style={{ marginTop: 20 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{menuList()}</tbody>
    </table>
  </div>
);
}
 
