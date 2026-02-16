"use client";

import { FileText, LucideIcon } from "lucide-react";

type ResultMessageProps = {
  title: string;
  icon?: LucideIcon;
  iconClassName?: string;
};

export const ResultMessage = ({
  title,
  icon: Icon = FileText,
  iconClassName = "w-5 h-5 text-orange-400",
}: ResultMessageProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <Icon className={iconClassName} />
        <h2 className="text-black font-semibold text-xl">{title}</h2>
      </div>
    </div>
  );
};
