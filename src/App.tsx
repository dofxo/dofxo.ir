import Experience from "./components/experience/Experience.tsx";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import HeroSection from "./components/HeroSection.tsx";
import Projects from "./components/projects/Projects.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Skills from "./components/Skills.tsx";
import { MainContext } from "./context/index.ts";
import { useChangeTheme } from "./customHooks/useChangeTheme.ts";
import TitleAdder from "./HOC/TitleAdder.tsx";

const App = () => {
  const themeFromLocalStorage = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useChangeTheme(themeFromLocalStorage);

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
      <Header />
      <main className="grid gap-[100px] pb-10">
        <HeroSection />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
      <ScrollToTop />
    </MainContext.Provider>
  );
};

export default TitleAdder(App, "Mohammad Kargar | محمد کارگر");
