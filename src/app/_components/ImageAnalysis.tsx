"use client"; // image analysis component-iig frontend tald ajiluulahad ashiglana
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { useState, useRef } from "react";
import { TabTitle } from "./TabTitle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Image, Loader2, Trash } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

export const ImageAnalysis = () => {
  // const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  // const [loading, setLoading] = useState<boolean>(false);

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
      <TabTitle title={"Image analysis"} onReset={handleReset} />
      <p className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        Upload a food photo, and AI will detect the ingredients.
      </p>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-col gap-2 w-full ">
          <div className="w-full flex items-center gap-4 border p-2 rounded-lg gap-2 ">
            <Label
              htmlFor="file-upload"
              className="cursor-pointer text-sm font-medium"
            >
              Choose File
              <span className="text-sm text-muted-foreground">
                {selectedFile ? selectedFile.name : "JPG, PNG"}
              </span>
              <Input
                id="file-upload"
                accept=".jpg,.jpeg,.png,.webp"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </Label>
          </div>

          {imagePreview && (
            <div className="relative w-60 h-40">
              <img
                src={imagePreview}
                alt="preview"
                className="w-60 h-40 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant={"outline"}
                className="absolute bottom-2 right-2"
                onClick={() => {
                  setImagePreview(null);
                  setResult(null);
                }}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          )}
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
      </div>

      <ResultMessage
        icon={FileText}
        iconClassName="w-5 h-5 text-orange-400"
        title={"Here is the summary"}
      />
      <div className="text-[#71717A] text-sm font-normal border border-gray-200 rounded-md p-2">
        {isLoading
          ? "Analyzing image..."
          : result
            ? result
            : "First, enter your image to recognize ingredients."}
      </div>
    </div>
  );
};

// "use client"; // image analysis component-iig server tald ajiluulahad ashiglana
// import { Button } from "@/components/ui/button";
// import { ResultMessage } from "./ResultMessage";
// import { useState } from "react";
// import { TabTitle } from "./TabTitle";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { FileText, Image, Loader2, Trash } from "lucide-react";

// export const ImageAnalysis = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);

//       // Create preview URL
//       const url = URL.createObjectURL(file);
//       setImagePreview(url);
//       setResult(null);
//       setError(null);
//     }
//   };

//   const handleReset = () => {
//     setSelectedFile(null);
//     setImagePreview(null);
//     setResult(null);
//     setError(null);
//   };

//   const handleGenerate = async () => {
//     if (!imagePreview) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile as File);
//       const res = await fetch("/api/image-analysis", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to analyze image");
//       }

//       const data = await res.json();
//       setResult(data.caption);
//     } catch (err) {
//       console.error("Error:", err);
//       setError(err instanceof Error ? err.message : "Error occurred");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <TabTitle title={"Image analysis"} onReset={handleReset} />
//       <p className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
//         Upload a food photo, and AI will detect the ingredients.
//       </p>
//       <div className="flex flex-col items-end gap-2">
//         <div className="flex flex-col gap-2 w-full ">
//           <div className="w-full flex items-center gap-4 border p-2 rounded-lg gap-2 ">
//             <Label
//               htmlFor="file-upload"
//               className="cursor-pointer text-sm font-medium"
//             >
//               Choose File
//               <span className="text-sm text-muted-foreground">
//                 {selectedFile ? selectedFile.name : "JPG, PNG"}
//               </span>
//               <Input
//                 id="file-upload"
//                 accept=".jpg,.jpeg,.png,.webp"
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </Label>
//           </div>

//           {imagePreview && (
//             <div className="relative w-60 h-40">
//               <img
//                 src={imagePreview}
//                 alt="preview"
//                 className="w-60 h-40 object-cover rounded-lg"
//               />
//               <Button
//                 size="icon"
//                 variant={"outline"}
//                 className="absolute bottom-2 right-2"
//                 onClick={handleReset}
//               >
//                 <Trash className="w-4 h-4" />
//               </Button>
//             </div>
//           )}
//         </div>
//         <Button
//           variant={"outline"}
//           type="button"
//           className=""
//           onClick={handleGenerate}
//           disabled={!selectedFile || isLoading}
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Analyzing...
//             </>
//           ) : (
//             "Generate"
//           )}
//         </Button>
//       </div>

//       <ResultMessage
//         icon={FileText}
//         iconClassName="w-5 h-5 text-orange-400"
//         title={"Here is the summary"}
//       />
//       <div className="text-[#71717A] text-sm font-normal border border-gray-200 rounded-md p-2">
//         {isLoading ? (
//           "Analyzing image..."
//         ) : error ? (
//           <span className="text-red-500">{error}</span>
//         ) : result ? (
//           result
//         ) : (
//           "First, enter your image to recognize ingredients."
//         )}
//       </div>
//     </div>
//   );
// };
