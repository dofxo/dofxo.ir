import { projectType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, Link } from "lucide-react";

const Project = ({
  title,
  description,
  role,
  websiteLink,
  sourceCode,
}: projectType) => {
  return (
    <div className="rounded-[10px] h-full px-5 py-3 border border-gray-200 max-w-[345px] flex justify-between flex-col gap-2">
      <div className="content flex flex-col gap-3">
        <h3 className="font-bold text-[var(--text-color)] text-[18px]">
          {title}
        </h3>
        <p className="text-[var(--text-secondary-color)] text-[13px]">
          {description}
        </p>
      </div>
      <Separator className="my-2 bg-gray-200" />
      <div className="project-card-footer flex justify-between items-center">
        <div className="links flex gap-[25px] items-center">
          {websiteLink && (
            <a href={websiteLink} target="_blank">
              <Link size={15} color="var(--text-color)" />
            </a>
          )}
          {sourceCode && (
            <a href={sourceCode} target="_blank">
              <GithubIcon size={15} color="var(--text-color)" />
            </a>
          )}
        </div>
        <span className="text-[var(--text-color)] text-[13px] font-[600]">
          {role}
        </span>
      </div>
    </div>
  );
};

export default Project;
