import { createContext } from "react";
type ContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const MainContext = createContext<ContextType>({
  theme: "",
  setTheme: () => {},
});
