import { Ingredient } from "./Ingredient";

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  instructions: string;
  imageUrl?: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
};
