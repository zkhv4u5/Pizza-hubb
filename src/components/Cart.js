import React, { useContext } from "react";
import CartContext from "./CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/*const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart(); */

function Cart(props) {
  const { cart } = useContext(CartContext);
  const { cartItems, setCartItems } = props;

  const handleRemoveFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== product.id)
    );
  };

  const handleIncreaseItemCount = (product) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );
    });
  };

  const handleDecreaseItemCount = (product) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === product.id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div>
      <div>
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
      </div>
      ))}
      </div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price / 100} x {item.count}
            <button onClick={() => handleDecreaseItemCount(item)}>-</button>
            <button onClick={() => handleIncreaseItemCount(item)}>+</button>
            <button onClick={() => handleRemoveFromCart(item)}>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
          </li>
        ))}
      </ul>
      <h3>Subtotal: ${getTotalPrice() / 100}</h3>
      {/*Button with link to Checkout page*/}
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );}

export default Cart;
