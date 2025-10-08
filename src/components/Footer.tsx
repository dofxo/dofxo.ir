import { MainContext } from "@/context";
import { HeartIcon } from "lucide-react";
import { useContext } from "react";

const Footer = () => {
  const {translations} = useContext(MainContext)
  return (
    <footer className="p-5 border-t text-[var(--text-color)] flex justify-center">
      <div className="container">
        <div className="flex justify-between text-[13px]">
          <span className="flex gap-2 items-center">
            {translations.designedVia}
            <HeartIcon size={15} />
          </span>
          <span>{translations.copyRight} {new Date().getFullYear()} &copy;</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
