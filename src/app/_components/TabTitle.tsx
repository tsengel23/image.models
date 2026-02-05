"use client";

import { Button } from "@/components/ui/button";
import { RotateCw, Sparkles } from "lucide-react";
// import { TabTitleProps } from "../../../types/Tabs";

type TabTitle = {
  title: string;
  onReset?: () => void;
};

export const TabTitle = ({ title, onReset }: TabTitle) => {
  return (
    <div className="flex justify-between items-center w-full">
      <p className="text-[#09090B] text-xl font-semibold leading-7 flex gap-2 items-center">
        <span>
          <Sparkles className="w-6 h-6 text-blue-500" />
        </span>
        {title}
      </p>
      <Button
        type="button"
        variant={"outline"}
        className="h-10 w-10 rounded-lg"
        onClick={onReset}
        disabled={!onReset}
      >
        <RotateCw />
      </Button>
    </div>
  );
};
