import { useEffect, useState } from "react";

export const useChangeTheme = (
  themeFromLocalStorage: string,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [theme, setTheme] = useState<string>(themeFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const html = document.querySelector("html")!;
    html.dataset.theme = theme;
  }, [theme]);

  return [theme, setTheme];
};
