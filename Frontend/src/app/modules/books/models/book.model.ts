import { Category } from "../../categories/models/category.model";

export interface Book {
  id: number;
  title: string;
  author: string;
  categories: Array<Category>;
}
