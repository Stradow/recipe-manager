import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search recipes...",
}: SearchBarProps) => {
  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#D4C8BE] bg-white focus:outline-none focus:ring-2 focus:ring-[#D28625]"
      />
    </div>
  );
};
export default SearchBar;
