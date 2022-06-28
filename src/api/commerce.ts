import { Size } from "@lib/product-consts";

export interface ICartItem {
  id: string;
  quantity: number;
  size: Size;
}

export class CartAPI {
  cart: ICartItem[] = [];

  static instance: CartAPI;

  private constructor() {
    this.cart = [];
  }

  public static getInstance(): CartAPI {
    if (!CartAPI.instance) {
      CartAPI.instance = new CartAPI();
    }
    return CartAPI.instance;
  }

  addToCart(product: ICartItem) {
    this.cart.push(product);
  }
  removeFromCart(id: string) {
    this.cart = this.cart.filter((item) => item.id !== id);
  }

  getQuantity(id: string) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      return item.quantity;
    }
    return 0;
  }
  setQuantity(id: string, quantity: number) {
    const item = this.cart.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }
  incrementQuantity(id: string) {
    this.setQuantity(id, this.getQuantity(id) + 1);
  }
  decrementQuantity(id: string) {
    this.setQuantity(id, this.getQuantity(id) - 1);
  }

  getCart() {
    return this.cart;
  }
  getCount() {
    return this.cart.length;
  }
}
