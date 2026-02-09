import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/Recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const nav = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-lg border border-[#D4C8BE] overflow-hidden hover:shadow-lg transition-shadow bg-white"
      onClick={() => nav(`/recipes/${recipe.id}`)}
    >
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#3A2A1A]">
          {recipe.title}
        </h3>
      </div>
    </div>
  );
};
export default RecipeCard;
