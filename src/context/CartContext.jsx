import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size = 10) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1, size }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQty = (id, size, qty) => {
    if (qty < 1) { removeFromCart(id, size); return; }
    setCart((prev) =>
      prev.map((item) => (item.id === id && item.size === size ? { ...item, qty } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
