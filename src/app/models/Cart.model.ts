import { ProductUX } from "./ProductUX.model";
import { User } from "./User.model";

export interface Cart {
  user : User;
  product: ProductUX;
}
