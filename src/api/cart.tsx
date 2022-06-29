import { Size } from "@lib/product-consts";
import React, { createContext, useReducer } from "react";

export interface ICartItem {
  id: string;
  quantity: number;
  size: Size;
  itemPrice: number;
}

class Cart {
  private items: Map<string, ICartItem>;

  constructor() {
    this.items = new Map();
  }

  addItem(item: ICartItem) {
    const existingItem = this.items.get(item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.set(item.id, item);
    }
    return this;
  }

  removeItem(item: ICartItem) {
    const existingItem = this.items.get(item.id);
    if (existingItem) {
      existingItem.quantity -= item.quantity;
      if (existingItem.quantity === 0) {
        this.items.delete(item.id);
      }
    }
    return this;
  }

  withNewItem(item: ICartItem) {
    const cart = new Cart();
    cart.items = this.items;
    cart.addItem(item);
    return cart;
  }

  withRemovedItem(item: ICartItem) {
    const cart = new Cart();
    cart.items = this.items;
    cart.removeItem(item);
    return cart;
  }

  deleteItem(item: ICartItem) {
    this.items.delete(item.id);
  }

  getItems() {
    return [...this.items.values()];
  }

  getTotal() {
    return this.getItems().reduce((total, item) => {
      return total + item.itemPrice * item.quantity;
    }, 0);
  }

  getItemCount() {
    return this.getItems().reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }
}

const initialState = {
  cart: new Cart(),
};

const reducer = (
  state: { cart: Cart },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "add":
      console.log("add", action.payload);
      return {
        cart: state.cart.withNewItem(action.payload),
      };
    case "remove":
      return {
        cart: state.cart.withRemovedItem(action.payload),
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
