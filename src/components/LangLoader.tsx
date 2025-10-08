import { useContext, useEffect } from "react";
import { MainContext } from "../context/index.ts";

const LangLoader = () => {
  const { setLang } = useContext(MainContext);

  useEffect(() => {
    const url = window.location.href;
    const langFromUrl = url.split("/")[3] as "fa" | "en";
    if (langFromUrl === "fa" || langFromUrl === "en") {
      setLang(langFromUrl);
    }
  }, []);

  return null;
};

export default LangLoader;
