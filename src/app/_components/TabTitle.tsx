"use client";

import { Button } from "@/components/ui/button";
import { RotateCw, Sparkles } from "lucide-react";
// import { TabTitleProps } from "../../../types/Tabs";

type TabTitle = {
  title: string;
};

export const TabTitle = ({ title }: TabTitle) => {
  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-[#09090B] text-xl font-semibold leading-7 flex gap-2 items-center">
        <span>
          <Sparkles className="w-6 h-6 text-blue-500" />
        </span>
        {title}
      </p>
      <Button
        type="submit"
        variant={"outline"}
        className="h-10 w-10 rounded-lg"
      >
        <RotateCw />
      </Button>
    </div>
  );
};
