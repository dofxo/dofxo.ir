import { MainContext } from "@/context";
import { Sun, Moon, User2 } from "lucide-react";
import { useContext } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { socials } from "@/data/socials";

const iconSize = 15;
const iconStyles = "hover:bg-gray-50 p-1 rounded transition";

const Header = () => {
  const { theme, setTheme } = useContext(MainContext);
  return (
    <header className="py-5 md:p-5 shadow shadow-[var(--shadow-color)] flex justify-center">
      <div className="container flex items-center justify-between">
        <a href="/" className="text-2xl text-[var(--primary)] font-[SourGummy]">
          {`</dofxo>`}
        </a>

        <div className="flex gap-5">
          <button
            className={iconStyles}
            onClick={() =>
              setTheme((prev: string) => (prev === "light" ? "dark" : "light"))
            }
          >
            {theme === "dark" ? (
              <Sun size={iconSize} color="var(--primary)" />
            ) : (
              <Moon size={iconSize} color="var(--primary)" />
            )}
          </button>
          <Popover>
            <PopoverTrigger>
              <User2 size={25} className={iconStyles} color="var(--primary)" />
            </PopoverTrigger>
            <PopoverContent className="bg-[var(--bg-color)] flex flex-col ml-5 gap-5">
              <h5 className="text-[var(--text-color)] font-bold">
                شبکه های اجتماعی
              </h5>
              <div className="button-wrapper flex flex-wrap gap-5">
                {socials.map((icon, idx) => (
                  <Button key={idx} variant="outline" asChild>
                    <a
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <icon.icon color="var(--text-color)" />
                      <span className="text-[var(--text-color)] ">
                        {icon.text}
                      </span>
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
