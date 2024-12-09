import Header from "./components/Header.tsx";
import { MainContext } from "./context/index.ts";
import { useChangeTheme } from "./customHooks/useChangeTheme.ts";
import TitleAdder from "./HOC/TitleAdder.tsx";

const App = () => {
  const themeFromLocalStorage = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useChangeTheme(themeFromLocalStorage);

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
      <main className="grid gap-[24px]">
        <Header />
      </main>
    </MainContext.Provider>
  );
};

export default TitleAdder(App, "Mohammad Kargar | محمد کارگر");
