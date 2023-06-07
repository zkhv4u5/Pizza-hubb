import React, { useContext } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Cart from '../components/Cart.js';
import { CartContext} from '../services/CartContext.js';
import "./Menu.css";
import { ClassNames } from "@emotion/react";
import MenuList from "../components/MenuItem";


function MenuPage() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, count: 1 },
      ]);
    }
  };

  return(
    <div className="wrapper">
      <MenuList>
      </MenuList>
      <div className="cart">
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>

  )
}
export default MenuPage;