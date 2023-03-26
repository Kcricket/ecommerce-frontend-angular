import { User } from "./User.model";

export interface AddressUX {
  id: number;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  home: string;
  apartment: string;
  user: User;

}
