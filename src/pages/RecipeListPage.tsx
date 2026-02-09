import { Recipe } from "../types/Recipe";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { recipeService } from "../api/recipes.api";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) return <p className="text-center p-8">Loading recipes...</p>;

  return (
    <div className="p-6">
      <div className="border-b border-[#D28625] pb-4 mb-6">
        <h2 className="text-xl font-semibold text-[#3A2A1A]">Your Recipes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};
export default RecipeListPage;
