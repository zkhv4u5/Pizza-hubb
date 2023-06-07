import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./menuItem.css"; 
import "../images/pep.png" 
import CartContext from "./CartContext";



const MenuCard = ({menu, handleAddToCart}) => {
  const { addToCart } = useContext(CartContext);
  console.log(`../images/${menu.image_url}`);
  return(
    <div className="card" style={{width: '18rem', margin: '10px'}}>
      <div className="card-body">
        <h5 className="card-title">{menu.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted" >{menu.price}</h6>
        <p className="card-subtitle mb-2 p">{menu.description}</p>
        <img className="picture" src={`${process.env.PUBLIC_URL}/images/${menu.image_url}`} alt="Menu Item" />
        <div className="mt-3">
        <button className="btn btn-primary" onClick={() => console.log(addToCart(menu)) } >Add to Cart</button> 
        </div>
        </div>
      </div>  
  );
}
export default function MenuList() {
 const [items, setMenu] = useState([]);

 useEffect(() => {
   async function getMenu() {
     const response = await fetch(`http://localhost:5050/api/menu/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const items = await response.json();
     console.log(items);
     setMenu(items);
   }

   getMenu().catch(error => console.error(error));

   return;
 }, [items.length]);

function menuList() {
  return items.map((menu, index) => {
    return (
      <MenuCard
        key={index}
        menu={menu}
      />
    );
  });
}

 return (
  <div>
    <h3>Menu</h3>
    <div className="d-flex flex-wrap justify-content-start" style={{ marginTop: 20 }}>
      {menuList()}
    </div>
  </div>
);
}