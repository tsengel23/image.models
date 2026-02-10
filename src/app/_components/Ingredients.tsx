"use client";

import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { FileText, Image, Loader2 } from "lucide-react";
import { useState } from "react";

export const Ingredients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleReset = () => {
    // setSelectedFile(null);
    // setImagePreview(null);
    setResult(null);
  };

  const handleGenerate = async () => {
    if (!imagePreview) return;
    setIsLoading(true);
    try {
      if (!captionerRef.current) {
        setIsModelLoading(true);
        captionerRef.current = await pipeline(
          "image-to-text",
          "Xenova/vit-gpt2-image-captioning",
        );
        setIsModelLoading(false);
      }
      //Run inference
      const output = await captionerRef.current(imagePreview);

      if (Array.isArray(output) && output.length > 0) {
        const caption = (output[0] as { generated_text: string })
          .generated_text;
        setResult(caption);
      }
    } catch (error) {
      console.error("Error generating caption:", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <TabTitle title={"Ingredient recognition"} onReset={handleReset} />
      <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        Describe the food, and AI will detect the ingredients.
      </Label>
      <div className=" flex flex-col items-end gap-2">
        <Textarea
          placeholder="Орц тодорхойлох"
          className="h-40 resize-none text-sm"
        />
        <Button
          variant={"outline"}
          type="button"
          className=""
          onClick={handleGenerate}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isModelLoading ? "Loading model..." : "Analyzing..."}
            </>
          ) : (
            "Generate"
          )}
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
