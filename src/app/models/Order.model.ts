import { AddressUX } from "./AddressUX.model";
import { Cart } from "./Cart.model";

export interface Order {
  userAddress: AddressUX;
  cart:Cart[];
  paymentMethod: {
    name: String;
    cardNumber: String;
    expirationDate: String;
    cvv: String;
  };
  deliveryMethod: String;
}
