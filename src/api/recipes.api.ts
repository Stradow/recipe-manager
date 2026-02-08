import axios from "axios";
import { Recipe } from "../types/Recipe";

const API_URL = "http://localhost:5005/api";

export const recipeService = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  },

  getRecipeById: async (id: string): Promise<Recipe> => {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  },

  createRecipe: async (data: FormData): Promise<Recipe> => {
    const response = await axios.post(`${API_URL}/recipes`, data);
    return response.data;
  },

  updateRecipe: async (id: string, data: FormData): Promise<Recipe> => {
    const response = await axios.put(`${API_URL}/recipes/${id}`, data);
    return response.data;
  },

  deleteRecipe: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/recipes/${id}`);
  },
};
