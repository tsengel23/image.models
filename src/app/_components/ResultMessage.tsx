"use client";

import { FileText, LucideIcon } from "lucide-react";

type ResultMessageProps = {
  title: string;
  // text: string;
  icon?: LucideIcon;
  iconClassName?: string;
  //   result: string;
  //   image?: "";
};

export const ResultMessage = ({
  title,
  // text,
  icon: Icon = FileText,
  iconClassName = "w-5 h-5 text-orange-400",
  //   result,
  //   image,
}: ResultMessageProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <Icon className={iconClassName} />
        <h2 className="text-black font-semibold text-xl">{title}</h2>
      </div>
      {/* <p className="text-[#71717A] font-normal text-sm">{text}</p> */}
      {/* <div>{result}</div> */}
    </div>
  );
};
