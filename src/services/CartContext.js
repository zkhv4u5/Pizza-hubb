import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
   cartItems: [], 
   setCartItems: () => {},
   totalItems: 0,
   setTotalItems: () => {},
  });

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.count;
    });
    setTotalItems(total);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{cartItems, setCartItems, totalItems, setTotalItems}}>
      {children}
    </CartContext.Provider>
  );
};
