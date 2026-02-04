"use client";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { useState } from "react";
import { TabTitle } from "./TabTitle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ImageAnalysis = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <TabTitle title={"Image analysis"} />
      <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        Upload a food photo, and AI will detect the ingredients.
      </Label>
      <div className="flex flex-col gap-2 items-end w-full ">
        <div className="relative w-full">
          <Input
            type="file"
            className="pr-28"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFileName(file ? file.name : null);
            }}
          />

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground truncate max-w-[140px]">
            {fileName || "JPG, PNG"}
          </span>
        </div>

        {/* <div className="relative w-full">
              <Input id="picture" type="file" />
              <span className="absolute text-muted-foreground text-sm   right-6 top-2">
                JPG, PNG
              </span>
            </div> */}

        <Button variant={"outline"} type="submit" className="">
          Generate
        </Button>
        <ResultMessage
          title={"Here is the summary"}
          text={"First, enter your image to recognize an ingredients."}
        />
      </div>
    </div>
  );
};
