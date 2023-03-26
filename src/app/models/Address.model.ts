import { User } from "./User.model";

export interface Address {
  //id: number;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  home: string;
  apartment: string;
  user: User;

}
