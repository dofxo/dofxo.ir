import { MainContext } from "@/context";
import { Sun, Moon } from "lucide-react";
import { useContext } from "react";

const Header = () => {
  const { theme, setTheme } = useContext(MainContext);
  return (
    <header className="p-5 px-20 shadow shadow-[var(--shadow-color)]">
      <div className="container flex items-center justify-between">
        <div className="text-white">right side content</div>

        <button
          className="hover:bg-gray-50 p-1 rounded transition"
          onClick={() =>
            setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
          }
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
