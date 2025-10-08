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
import { useEffect, useState } from "react";
import LangDirectionSetter from "./components/LangDirectionSetter.tsx";
import LangLoader from "./components/LangLoader.tsx";
import en from "./lang/en.json";
import fa from "./lang/fa.json";

const App = () => {
	const themeFromLocalStorage = localStorage.getItem("theme") || "light";
	const [theme, setTheme] = useChangeTheme(themeFromLocalStorage);
	const [lang, setLang] = useState<"fa" | "en">("fa");
	const [translations, setTranslations] = useState(en);

	// set lang value
	useEffect(() => {
		const url = window.location.href;
		const currentLang = url.split("/")[3] as "fa" | "en";
		if (currentLang === "fa" || currentLang === "en") {
			setLang(currentLang);
		}
	}, []);

	// Whenever lang changes, update translations
	useEffect(() => {
		switch (lang) {
			case "fa":
				setTranslations(fa);
				break;
			case "en":
			default:
				setTranslations(en);
		}
	}, [lang]);

	return (
		<MainContext.Provider value={{ theme, setTheme, setLang, lang, translations }}>
			<Header />
			<LangDirectionSetter />
			<LangLoader />

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
