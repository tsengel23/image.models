"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabTitle } from "./TabTitle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function TabsModel() {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <div className="w-full h-fit flex flex-col">
      <Tabs defaultValue="analysis" className="">
        <TabsList className="w-fit border">
          <TabsTrigger value="analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
          <TabsTrigger value="creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="">
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
          </div>
        </TabsContent>
        <TabsContent value="ingredient">
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
          </div>
        </TabsContent>
        <TabsContent value="creator">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
