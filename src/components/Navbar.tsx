import RecipeLogo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-[#F7F2F1] p-4 rounded-xl shadow-md">
      <Link to="/">
        <img src={RecipeLogo} alt="Recipe Book Logo" className="h-20 w-auto" />
      </Link>
      <Link to="/recipes/new">
        <button className="cursor-pointer flex items-center gap-2 rounded-md bg-[#D28625] px-4 py-2 text-sm font-semibold text-white hover:bg-[#AB9983] transition">
          <Plus size={16} /> Add Recipe
        </button>
      </Link>
    </nav>
  );
};
export default Navbar;
