"use client";
import { FileText, Image } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export const ImageCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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
        {/* <Button disabled size="sm">
          <Spinner data-icon="inline-start" />
          Loading...
        </Button> */}
        <Button variant={"outline"} type="submit" className="">
          Generate
        </Button>
        <ResultMessage
          icon={Image}
          iconClassName="w-5 h-5 text-green-400"
          title={"Result"}
          // text={"First, enter your text to generate an image."}
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
