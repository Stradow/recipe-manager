import { recipeService } from "../api/recipes.api";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Recipe } from "../types/Recipe";

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDeleteRecipe = async () => {
    if (!id) return;

    try {
      await recipeService.deleteRecipe(id);
      nav("/");
    } catch (error) {
      setError("Failed to delete a recipe");
    }
  };

  if (loading) return <p className="text-center p-8">Loading recipe...</p>;
  if (error) return <p className="text-center p-8 text-red-600">{error}</p>;
  if (!recipe) return <p className="text-center p-8">Recipe not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#3A2A1A] mb-3">
              {recipe.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3A2A1A] mb-3 pb-2 border-b border-[#D28625]">
              Ingredients:
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients?.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-start text-gray-700"
                >
                  <span className="mr-2">✓</span>
                  <span>
                    {ingredient.quantity} {ingredient.name}
                  </span>
                </li>
              )) || (
                <p className="text-gray-500 italic">No ingredients listed</p>
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3A2A1A] mb-3 pb-2 border-b border-[#D28625]">
              Instructions:
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Link to="/recipes/:id/edit">
              <button className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white bg-[#D28625] hover:bg-[#AB9983] transition">
                <Pencil size={16} /> Edit
              </button>
            </Link>
            <button
              type="button"
              onClick={handleDeleteRecipe}
              className="flex items-center gap-2 text-sm font-semibold rounded-md border border-[#D4C8BE] bg-white px-4 py-2 text-[#3A2A1A] hover:bg-[#D4C8BE] transition"
            >
              <Trash2 size={16} /> Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeDetailsPage;
