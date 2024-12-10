import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="p-5 border-t text-[var(--text-color)] flex justify-center">
      <div className="container">
        <div className="flex justify-between text-[13px]">
          <span className="flex gap-2 items-center">
            طراحی شده با
            <HeartIcon size={15} />
          </span>
          <span>کپی رایت {new Date().getFullYear()} &copy;</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
