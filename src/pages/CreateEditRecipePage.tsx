import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { Recipe } from "../types/Recipe";
import { recipeService } from "../api/recipes.api";

const CreateEditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      fetchRecipe();
    }
  }, [id, isEditMode]);

  const fetchRecipe = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await recipeService.getRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.log("Error fetching recipe :", error);
      setError("Failed to load recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    try {
      if (isEditMode && id) {
        await recipeService.updateRecipe(id, formData);
      } else {
        await recipeService.createRecipe(formData);
      }
      nav("/recipes");
    } catch (error) {
      console.log("Error saving recipe :", error);
      setError("Failed to save recipe. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {isEditMode ? "Edit Recipe" : "Create New Recipe"}
        </h1>
        <RecipeForm
          initialData={recipe}
          onSubmit={handleFormSubmit}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};
export default CreateEditRecipePage;
