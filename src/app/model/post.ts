import {Image} from "./image";

export interface Post {
  id: number;
  content: string;
  description: string;
  title: string;
  categoryId: bigint;
  imageDTO: Image
}
