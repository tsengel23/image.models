"use client";

import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";

export const Ingredients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  const handleReset = () => {
    setPrompt("");

    setResult(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch ingredients");
      }

      const data = await res.json();
      setResult(data.ingredients);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Catch error!");
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
          value={prompt}
          placeholder="Орц тодорхойлох"
          className="h-40 resize-none text-sm"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          variant={"outline"}
          type="button"
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Generate"
          )}
        </Button>
        <ResultMessage
          icon={FileText}
          iconClassName="w-5 h-5 text-orange-400"
          title={"Identified Ingredients"}
        />
      </div>
      <div className="text-[#71717A] text-sm font-normal">
        {isLoading
          ? "Analyzing ingredients..."
          : result
            ? result
            : "First, enter your text to recognize ingredients."}
      </div>
    </div>
  );
};
