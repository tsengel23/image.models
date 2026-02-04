"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ImageAnalysis } from "./ImageAnalysis";
import { Ingredients } from "./Ingredients";
import { ImageCreator } from "./ImageCreator";

export function TabsModel() {
  return (
    <div className="w-full h-fit flex flex-col">
      <Tabs defaultValue="analysis" className="">
        <TabsList className="w-fit border">
          <TabsTrigger value="analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
          <TabsTrigger value="creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="analysis" className="">
          <ImageAnalysis />
        </TabsContent>
        <TabsContent value="ingredient">
          <Ingredients />
        </TabsContent>
        <TabsContent value="creator">
          <ImageCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
