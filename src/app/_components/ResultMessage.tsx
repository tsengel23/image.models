"use client";

import { FileText } from "lucide-react";

type ResultMessage = {
  title: string;
  text: string;
  //   result: string;
  //   image?: "";
};

export const ResultMessage = ({
  title,
  text,
  //   result,
  //   image,
}: ResultMessage) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5" />
        <h2 className="text-black font-semibold text-xl">{title}</h2>
      </div>
      <p className="text-[#71717A] font-normal text-sm">{text}</p>
      {/* <div>{result}</div> */}
    </div>
  );
};
