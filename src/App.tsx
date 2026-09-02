import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import { Home, LangHome } from "./components/HomeSections.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import VaultPage from "./components/vault/VaultPage.tsx";
import { MainContext } from "./context/index.ts";
import { useChangeTheme } from "./customHooks/useChangeTheme.ts";
import TitleAdder from "./HOC/TitleAdder.tsx";
import { useEffect, useState } from "react";
import LangDirectionSetter from "./components/LangDirectionSetter.tsx";
import LangLoader from "./components/LangLoader.tsx";
import en from "./lang/en.json";
import fa from "./lang/fa.json";
import { Navigate, Route, Routes } from "react-router-dom";

const getInitialLang = (): "fa" | "en" => {
	// URL-prefixed routes (/fa, /en) win over the stored preference
	const fromUrl = window.location.href.split("/")[3];
	if (fromUrl === "fa" || fromUrl === "en") return fromUrl;

	const stored = localStorage.getItem("lang");
	return stored === "fa" || stored === "en" ? stored : "fa";
};

const App = () => {
	const themeFromLocalStorage = localStorage.getItem("theme") || "light";
	const [theme, setTheme] = useChangeTheme(themeFromLocalStorage);
	const [lang, setLang] = useState<"fa" | "en">(getInitialLang);
	const [translations, setTranslations] = useState(en);

	// Persist the chosen language so every page (including /vault) keeps it
	useEffect(() => {
		localStorage.setItem("lang", lang);
	}, [lang]);

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
			<LangDirectionSetter />
			<LangLoader />

			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vault" element={<VaultPage />} />
				<Route path="/:lang" element={<LangHome />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

			<Footer />
			<ScrollToTop />
		</MainContext.Provider>
	);
};

export default TitleAdder(App, "Mohammad Kargar | محمد کارگر");
