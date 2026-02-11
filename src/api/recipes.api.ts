import apiClient from "./Api.client";
import { Recipe } from "../types/Recipe";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
};

export const recipeService = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    const { data } = await apiClient.get("/recipes");
    return data;
  },

  getRecipeById: async (id: string): Promise<Recipe> => {
    const { data } = await apiClient.get(`/recipes/${id}`);
    return data;
  },

  createRecipe: async (formData: FormData): Promise<Recipe> => {
    checkAuth();
    const { data } = await apiClient.post("/recipes", formData);
    return data;
  },

  updateRecipe: async (id: string, formData: FormData): Promise<Recipe> => {
    checkAuth();
    const { data } = await apiClient.put(`/recipes/${id}`, formData);
    return data;
  },

  deleteRecipe: async (id: string): Promise<void> => {
    checkAuth();
    await apiClient.delete(`/recipes/${id}`);
  },
};
