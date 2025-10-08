import { useContext, useEffect } from "react";
import { MainContext } from "../context/index.ts";

const LangDirectionSetter = () => {
  const { lang } = useContext(MainContext);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!html) return;

    // Set direction
    html.dir = lang === "fa" ? "rtl" : "ltr";

    // Set html lang attribute
    html.lang = lang;
  }, [lang]);

  return null;
};

export default LangDirectionSetter;
