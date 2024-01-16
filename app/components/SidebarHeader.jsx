import { GoCodeReview } from "react-icons/go";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <GoCodeReview className="w-10 h-10 text-primary" />
      <h2 className="text-xl font-extrabold text-primary mr-auto">
        GPT
        <span className="text-white bg-gradient-to-r from-red-400 to-blue-600 px-2 rounded-lg shadow-md transform hover:scale-110 transition-transform duration-300 ml-1 uppercase">
          Creative
        </span>
      </h2>

      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
