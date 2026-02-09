import RecipeLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#F7F2F1] p-4 rounded-xl">
      <Link to="/">
        <img src={RecipeLogo} alt="Recipe Book Logo" className="h-20 w-auto" />
      </Link>
      <Link to="/recipes/new">
        <button className="cursor-pointer rounded-md bg-[#D28625] px-3 py-2 text-sm font-semibold text-white hover:bg-[#AB9983]">
          + Add Recipe
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;
