import { createContext } from "react";
import en from "../lang/en.json";
import fa from "../lang/fa.json";

type ContextType = {
  theme: string;
  lang: "fa" | "en";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setLang: React.Dispatch<React.SetStateAction<"fa" | "en">>;
  translations: Record<string, string>;
};

export const MainContext = createContext<ContextType>({
  lang: "fa",
  setLang: () => {},
  theme: "",
  setTheme: () => {},
  translations: {},
});
