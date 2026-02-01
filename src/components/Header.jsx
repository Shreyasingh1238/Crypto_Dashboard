import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
   <header
  className="flex items-center justify-between mb-8
  px-6 py-4 rounded-xl
  bg-gray-200 dark:bg-[#0E1625]
  border border-gray-300 dark:border-gray-700
  transition-colors duration-300"
>





      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
  Crypto Dashboard
        </h1>

<p className="text-sm text-gray-600 dark:text-gray-400">
  Real-time cryptocurrency analytics
</p>


      </div>

     <button
  onClick={() => setDarkMode(!darkMode)}
  className="px-4 py-2 rounded-full
  bg-gray-900 text-white
  dark:bg-gray-100 dark:text-gray-900
  border border-gray-400 dark:border-gray-600
  text-sm font-medium
  hover:scale-105 transition"
>
  {darkMode ? "🌙 Dark" : "☀️ Light"}
</button>

    </header>
  );
};

export default Header;
