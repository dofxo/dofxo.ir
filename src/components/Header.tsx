import { MainContext } from "@/context";
import { Sun, Moon, User } from "lucide-react";
import { useContext } from "react";

const iconSize = 20;
const iconStyles = "hover:bg-gray-50 p-1 rounded transition";

const Header = () => {
  const { theme, setTheme } = useContext(MainContext);
  return (
    <header className="p-5 px-20 shadow shadow-[var(--shadow-color)]">
      <div className="container flex items-center justify-between">
        <a href="/" className="text-2xl text-[var(--primary)] font-[SourGummy]">
          {`</dofxo>`}
        </a>

        <div className="flex gap-5">
          <button
            className={iconStyles}
            onClick={() =>
              setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
            }
          >
            {theme === "dark" ? (
              <Sun size={iconSize} color="var(--primary)" />
            ) : (
              <Moon size={iconSize} color="var(--primary)" />
            )}
          </button>
          <button className={iconStyles}>
            <User size={iconSize} color="var(--primary)" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
