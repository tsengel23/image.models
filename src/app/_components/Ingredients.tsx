"use client";

import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { FileText, Image } from "lucide-react";
import { useState } from "react";

export const Ingredients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  return (
    <div>
      <TabTitle title={"Ingredient recognition"} />
      <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        Describe the food, and AI will detect the ingredients.
      </Label>
      <div className=" flex flex-col items-end gap-2">
        <Textarea
          placeholder="Орц тодорхойлох"
          className="h-40 resize-none text-sm"
        />
        <Button variant={"outline"} type="submit" className="">
          Generate
        </Button>
        <ResultMessage
          icon={FileText}
          iconClassName="w-5 h-5 text-orange-400"
          title={"Identified Ingredients"}
          // text={"First, enter your text to recognize an ingredients."}
        />
      </div>
      <div className="text-[#71717A] text-sm font-normal">
        {isLoading
          ? "Analyzing image..."
          : result
            ? result
            : "First, enter your image to recognize ingredients."}
      </div>
    </div>
  );
};
