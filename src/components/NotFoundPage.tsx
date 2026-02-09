import { Link } from "react-router";
import NotFound from "../assets/images/notfound.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#F7F2F1] pt-20">
      <div className="flex flex-col items-center">
        <h1 className="font-['Cormorant'] font-bold text-[#3A2A1A] text-9xl leading-none mt-6">
          404
        </h1>
        <img src={NotFound} className="w-60" />
        <h3 className="mt-2 text-[#3A2A1A] text-center max-w-md">
          The page you are looking for <br />
          doesn’t seem to exist
        </h3>
      </div>

      <Link to="/">
        <button className="mt-8 bg-[#D28625] hover:opacity-90 text-white font-medium py-3 px-6 rounded-xl transition cursor-pointer">
          GO BACK HOME
        </button>
      </Link>
    </div>
  );
};
export default NotFoundPage;
