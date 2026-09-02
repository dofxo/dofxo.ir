import Experience from "./experience/Experience.tsx";
import HeroSection from "./HeroSection.tsx";
import Projects from "./projects/Projects.tsx";
import Skills from "./Skills.tsx";
import { Navigate, useParams } from "react-router-dom";

export const Home = () => (
	<main className="grid gap-[100px] pb-10">
		<HeroSection />
		<Skills />
		<Experience />
		<Projects />
	</main>
);

// Keeps old links like dofxo.ir/fa and dofxo.ir/en working
export const LangHome = () => {
	const { lang } = useParams<{ lang: string }>();
	if (lang !== "fa" && lang !== "en") return <Navigate to="/" replace />;
	return <Home />;
};
