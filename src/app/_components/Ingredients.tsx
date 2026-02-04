"use client";

import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { FileText, Image } from "lucide-react";

export const Ingredients = () => {
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
          iconClassName="w-5 h-5 text-orange-600"
          title={"Identified Ingredients"}
          text={"First, enter your text to recognize an ingredients."}
        />
      </div>
    </div>
  );
};
