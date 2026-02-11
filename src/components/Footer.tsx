import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-[#F7F2F1] text-[#3A2A1A] text-center py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] mt-8">
      <div className="border-t border-[#D28625] pt-4">
        <p className="mb-4">&copy; 2026 Recipe Manager. All rights reserved.</p>

        <div className="flex justify-center items-center gap-6">
          <a
            href="https://github.com/Stradow/recipe-manager-express"
            target="_blanck"
            className="flex items-center gap-2 hover:text[#D28625] transition-colors duration-200"
            title="Backend Repository"
          >
            <Github size={20} />
            <span className="text=sm">Backend</span>
          </a>

          <a
            href="https://github.com/Stradow/recipe-manager"
            target="_blanck"
            className="flex items-center gap-2 hover:text[#D28625] transition-colors duration-200"
            title="Frontend Repository"
          >
            <Github size={20} />
            <span className="text=sm">Frontend</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
