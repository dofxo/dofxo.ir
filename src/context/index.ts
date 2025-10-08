import { createContext } from "react";
type ContextType = {
  theme: string;
  lang: "fa" | "en";
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  setLang: React.Dispatch<React.SetStateAction<"fa" | "en">>;
};

export const MainContext = createContext<ContextType>({
  lang: "fa",
  setLang: () => {},
  theme: "",
  setTheme: () => {},
});
