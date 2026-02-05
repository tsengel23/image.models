"use client";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { useState, useRef } from "react";
import { TabTitle } from "./TabTitle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Loader2 } from "lucide-react";

import { pipeline } from "@huggingface/transformers";

export const ImageAnalysis = () => {
  // const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const captionerRef = useRef<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setResult(null);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
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
      <TabTitle title={"Image analysis"} onReset={handleReset} />
      <p className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        Upload a food photo, and AI will detect the ingredients.
      </p>
      <div className="flex flex-col gap-2 items-end w-full ">
        <div className="w-full flex items-center gap-4">
          <Label
            htmlFor="file-upload"
            className="cursor-pointer text-sm font-medium"
          >
            Choose File
          </Label>
          <span className="text-sm text-muted-foreground">
            {selectedFile ? selectedFile.name : "JPG, PNG"}
          </span>
          <Input
            id="file-upload"
            accept=".jpg,.jpeg,.png"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {/* <span className="text-sm text-muted-foreground"></span> */}
        </div>

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
          iconClassName="w-5 h-5 text-orange-600"
          title={"Here is the summary"}
          text={"First, enter your image to recognize an ingredients."}
        />
      </div>
    </div>
  );
};