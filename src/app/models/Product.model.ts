import { Category } from './Category.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: Category;
  parameters: Map<string, string>;
  weight: number;
  volume: number;
  quantityInStock: number;
}
