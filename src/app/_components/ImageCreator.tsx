"use client";

import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";

export const ImageCreator = () => {
  return (
    <div>
      <TabTitle title={"Food image creator"} />
      <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        What food image do you want? Describe it briefly.
      </Label>
      <div className=" flex flex-col items-end gap-2">
        <Textarea
          placeholder="Хоолны тайлбар"
          className="h-40 resize-none text-sm"
        />
        <Button variant={"outline"} type="submit" className="">
          Generate
        </Button>
        <ResultMessage
          title={"Result"}
          text={"First, enter your text to generate an image."}
        />
      </div>
    </div>
  );
};
