import { Recipe } from "../types/Recipe";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { recipeService } from "../api/recipes.api";
import SearchBar from "../components/SearchBar";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="text-center p-8">Loading recipes...</p>;

  return (
    <div className="p-6">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search recipes..."
      />
      <div className="border-b border-[#D28625] pb-4 mb-6 mt-6">
        <h2 className="text-xl font-semibold text-[#3A2A1A]">Your Recipes</h2>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {search ? `No recipes found for "${search}"` : "No recipes yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};
export default RecipeListPage;
