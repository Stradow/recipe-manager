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
    return <p className="text-center p-8">Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="border-b border-[#D28625] pb-4 mb-6">
        <h1 className="text-xl font-semibold text-[#3A2A1A]">
          {isEditMode ? "Edit Recipe" : "Create New Recipe"}
        </h1>
      </div>
      <RecipeForm
        initialData={recipe}
        onSubmit={handleFormSubmit}
        isEditMode={isEditMode}
      />
    </div>
  );
};
export default CreateEditRecipePage;
