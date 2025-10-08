import { MainContext } from "@/context";
import { Sun, Moon, User2 } from "lucide-react";
import { useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { socials } from "@/data/socials";

const iconSize = 15;
const iconStyles = "hover:bg-[var(--hover-color)] p-1 rounded transition";

const Header = () => {
	const { theme, setTheme, translations, lang, setLang } = useContext(MainContext);

	const toggleLang = () => {
		const newLang = lang === "fa" ? "en" : "fa";
		setLang(newLang);
	};

	return (
		<header className="sticky top-0 bg-[var(--bg-color)] z-[1000] py-5 md:p-5 shadow shadow-[var(--shadow-color)] flex justify-center">
			<div className="container flex items-center justify-between">
				<a href="/" className="text-2xl text-[var(--primary)] font-[SourGummy]">
					{`</dofxo>`}
				</a>

				<div className="flex gap-5 items-center">
					{/* Language Switcher */}
					<button
						onClick={toggleLang}
						className="flex items-center gap-2 transition hover:scale-105"
						title={lang === "fa" ? "Switch to English" : "تغییر به فارسی"}
					>
						{lang === "fa" ? (
							<div className="flex items-center gap-2">
								<span className="text-[var(--text-color)] text-sm font-medium">
									{translations.switchLanguage || "English"}
								</span>
								<ReactCountryFlag countryCode="US" svg style={{ fontSize: "1.5rem" }} />
							</div>
						) : (
							<div className="flex items-center gap-2">
								<span className="text-[var(--text-color)] text-xs font-medium">
									{translations.switchLanguage || "فارسی"}
								</span>
								<ReactCountryFlag countryCode="IR" svg style={{ fontSize: "1.5rem" }} />
							</div>
						)}
					</button>

					{/* Theme Switch */}
					<button
						className={iconStyles}
						onClick={() => setTheme((prev: string) => (prev === "light" ? "dark" : "light"))}
					>
						{theme === "dark" ? (
							<Sun size={iconSize} color="var(--primary)" />
						) : (
							<Moon size={iconSize} color="var(--primary)" />
						)}
					</button>

					{/* Social Media Popover */}
					<Popover>
						<PopoverTrigger className={`${iconSize}px`}>
							<User2 className={iconStyles} color="var(--primary)" />
						</PopoverTrigger>
						<PopoverContent className="bg-[var(--bg-color)] flex flex-col ml-5 gap-5">
							<h5 className="text-[var(--text-color)] font-bold">{translations.socialMedia}</h5>
							<div className="button-wrapper flex flex-wrap gap-5">
								{socials.map((icon, idx) => (
									<Button key={idx} variant="outline" asChild>
										<a href={icon.link} target="_blank" rel="noopener noreferrer">
											<icon.icon color="var(--text-color)" />
											<span className="text-[var(--text-color)] ">{icon.text[lang]}</span>
										</a>
									</Button>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
};

export default Header;
