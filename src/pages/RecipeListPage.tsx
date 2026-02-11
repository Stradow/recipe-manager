import { Recipe } from "../types/Recipe";
import RecipeCard from "../components/RecipeCard";
import { useState, useEffect } from "react";
import { recipeService } from "../api/recipes.api";
import SearchBar from "../components/SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-md border boreder-[#D28625] bg-white px-4 py-2 text-[#D28625] hover:bg-[#F7F2F1] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md font-semibold transition ${
                        currentPage === page
                          ? "bg-[#D28625] text-white"
                          : "border border-[#D28625] text-[#D28625] hover:bg-[#F7F2F1]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 rounded-md border border-[#D28625] bg-white px-4 py-2 text-[#D28625] hover:bg-[#F7F2F1] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredRecipes.length)} of{" "}
            {filteredRecipes.length} recipes
          </p>
        </>
      )}
    </div>
  );
};
export default RecipeListPage;
