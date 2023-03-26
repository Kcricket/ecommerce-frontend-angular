import { Category } from './Category.model';
import { FileHandle } from "./File-handle.model";

export interface ProductUX {
  id: number;
  title: string;
  price: number;
  category: Category;
  parameters: Map<string, string>;
  weight: number;
  volume: number;
  quantityInStock: number;
  productImages: FileHandle[];
}
