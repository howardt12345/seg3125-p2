import { Size } from "@lib/product-consts";
import React, { createContext, useReducer } from "react";

export interface ICartItem {
  id: string;
  quantity: number;
  size: Size;
  itemPrice: number;
}

export const TAX = 0.13;

export class Cart {
  private items: ICartItem[] = [];

  constructor(items?: ICartItem[]) {
    this.items = items || [];
  }

  addItem(item: ICartItem) {
    const existingItem = this.items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(item: ICartItem) {
    const existingItem = this.items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      existingItem.quantity -= item.quantity;
      if (existingItem.quantity <= 0) {
        this.items.splice(this.items.indexOf(existingItem), 1);
      }
    }
  }

  deleteItem(item: ICartItem) {
    const existingItem = this.items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      this.items.splice(this.items.indexOf(existingItem), 1);
    }
  }

  setQuantity(item: ICartItem, quantity: number) {
    const existingItem = this.items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      existingItem.quantity = quantity;
    }
  }

  withNewItem(item: ICartItem) {
    const newCart = new Cart(this.items);
    newCart.addItem(item);
    return newCart;
  }

  withRemovedItem(item: ICartItem) {
    const newCart = new Cart(this.items);
    newCart.removeItem(item);
    return newCart;
  }

  withDeletedItem(item: ICartItem) {
    const newCart = new Cart(this.items);
    newCart.deleteItem(item);
    return newCart;
  }

  withSetQuantity(item: ICartItem, quantity: number) {
    const newCart = new Cart(this.items);
    newCart.setQuantity(item, quantity);
    return newCart;
  }

  clear() {
    this.items = [];
  }

  getItems(): ICartItem[] {
    return this.items;
  }

  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) => total + item.itemPrice * item.quantity,
      0
    );
  }

  getTax(): number {
    return this.getSubtotal() * TAX;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getUniqueItems(): ICartItem[] {
    return this.items.reduce((uniqueItems: ICartItem[], item) => {
      const existingItem = uniqueItems.find((i) => i.id === item.id);
      if (!existingItem) {
        uniqueItems.push(item);
      }
      return uniqueItems;
    }, []);
  }
}

const initialState = {
  cart: new Cart(),
};

let lastAction = { type: "", payload: {} };
const reducer = (
  state: { cart: Cart },
  action: { type: any; payload: ICartItem }
) => {
  if (lastAction === action) {
    return {
      cart: state.cart,
    };
  }
  lastAction = action;
  switch (action.type) {
    case "add":
      const newCart = state.cart.withNewItem(action.payload);
      return {
        cart: newCart,
      };
    case "remove":
      const newCart2 = state.cart.withRemovedItem(action.payload);
      return {
        cart: newCart2,
      };
    case "delete":
      const newCart3 = state.cart.withDeletedItem(action.payload);
      return {
        cart: newCart3,
      };
    case "setQuantity":
      const newCart4 = state.cart.withSetQuantity(
        action.payload,
        action.payload.quantity
      );
      return {
        cart: newCart4,
      };
    case "clear":
      state.cart.clear();
      return {
        cart: new Cart(),
      };
    default:
      return state;
  }
};

export const CartContext = createContext({
  state: initialState,
  dispatch: ({ type, payload }: { type: any; payload: ICartItem }) => {},
});

export const CartProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
