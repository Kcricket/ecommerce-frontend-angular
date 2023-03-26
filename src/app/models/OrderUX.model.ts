import { AddressUX } from "./AddressUX.model";
import { Cart } from "./Cart.model";
import { ProductUX } from "./ProductUX.model";
import { User } from "./User.model";

export interface OrderUX {
  id: number;
  user:User;
  userAddress: AddressUX;
  product: ProductUX;
  paymentMethod: {
    name: String;
    cardNumber: String;
    expirationDate: String;
    cvv: String;
  };
  deliveryMethod: String;
  paymentStatus: String;
  orderStatus: string;
  orderPrice: number;
  orderDate: String;
}
