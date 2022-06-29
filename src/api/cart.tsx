import { Size } from "@lib/product-consts";
import React, { createContext, useReducer } from "react";

export interface ICartItem {
  id: string;
  quantity: number;
  size: Size;
}

const initialState = {
  cart: [] as ICartItem[],
};

const reducer = (
  state: { cart: ICartItem[] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "add":
      return {
        cart: [...state.cart, action.payload],
      };
    case "remove":
      return {
        cart: state.cart.filter(
          (item: { id: any }) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const CartContext = createContext({
  state: initialState,
  dispatch: ({ type, payload }: { type: any; payload: any }) => {},
});

export const CartProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
