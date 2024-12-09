import { useChangeTheme } from "../customHooks/useChangeTheme";

const Header = () => {
  const themeFromLocalStorage = localStorage.getItem("theme") || "light";
  const [setTheme] = useChangeTheme(themeFromLocalStorage);

  return (
    <header className="p-5 px-20 shadow shadow-[var(--shadow-color)]">
      <div className="container flex items-center justify-between">
        <div className="text-white">right side content</div>

        <div
          className="text-[var(--primary)]"
          onClick={() =>
            setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
          }
        >
          change theme
        </div>
      </div>
    </header>
  );
};

export default Header;
