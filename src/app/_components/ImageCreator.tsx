"use client";
import { FileText, Image, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TabTitle } from "./TabTitle";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResultMessage } from "./ResultMessage";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
/*
  ImageCreator component

  Энэ компонент нь хэрэглэгчээс хоолны дүрс үүсгэх (text -> image) эсвэл зурагнаас тайлбар гаргах
  зорилготой интерфэйсийн хэсэг юм. Одоогийн хэрэгжүүлэлт нь UI болон хэд хэдэн state-ыг агуулна,
  мөн дотор нь өөрчлөлт, модель дуудахад ашиглах логик байрлана (эх кодонд зарим хувьсагчууд
  жишээ байдлаар ашиглагдаж байгаа боловч энд тодорхойлолт нь тайлбарлагдсан).

  Тайлбар:
  - isLoading: генераци/анализ үр дүнг хүлээж байгааг харуулах
  - result: гарсан текст үр дүн (caption буюу генерацийн текст)
  - isModelLoading: модель, pipeline зэргийг ачаалж байгааг тэмдэглэх

  Анхаарах зүйл: Орон нутгийн зарим хувьсагч (жишээ нь captionerRef, pipeline, imagePreview)
  энэ файлын өөр хэсэгт тодорхойлогдоогүй байна — тэдгээр нь гаднаас нийлүүлэгдсэн гэж үзсэн.
*/
export const ImageCreator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);

  const handleReset = () => {
    // Хэрэглэгчийн үр дүнг цэвэрлэх функцийг гүйцэтгэнэ.
    // Жишээнд зөвхөн result-г null болгох замаар UI-ийг анхны төлөвт оруулна.
    setResult(null);
  };

  const handleGenerate = async () => {
    // Энэ функц нь дүрсийг тайлбарлах (caption) зориулалтаар биетийн pipeline-ийг ажиллуулна.
    // Анхаарах: `imagePreview`, `captionerRef`, `pipeline` зэрэг хувьсагч/функцүүд нь
    // энд тодорхойлогдоогүй тул гадагшаас нийлүүлэгдэх эсвэл дээр нэмэх шаардлагатай.
    if (!imagePreview) return;
    setIsLoading(true);
    try {
      // Модель эхлээд ачаалагдаагүй бол pipeline-ээс авах гэж оролдоно
      if (!captionerRef.current) {
        setIsModelLoading(true);
        captionerRef.current = await pipeline(
          "image-to-text",
          "Xenova/vit-gpt2-image-captioning",
        );
        setIsModelLoading(false);
      }

      // Модель рүү дүрс илгээх ба гарсан үр дүнгээ result-д онооно
      const output = await captionerRef.current(imagePreview);

      if (Array.isArray(output) && output.length > 0) {
        const caption = (output[0] as { generated_text: string })
          .generated_text;
        setResult(caption);
      }
    } catch (error) {
      // Алдаа тохиолдвол консол руу хэвлээд хэрэглэгчид энгийн зурвас харуулна
      console.error("Error generating caption:", error);
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <TabTitle title={"Food image creator"} onReset={handleReset} />
      <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
        What food image do you want? Describe it briefly.
      </Label>
      <div className=" flex flex-col items-end gap-2">
        <Textarea
          placeholder="Хоолны тайлбар"
          className="h-40 resize-none text-sm"
        />

        <Button
          variant={"outline"}
          type="button"
          className=""
          onClick={handleGenerate}
          disabled={isLoading}
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

// "use client";
// import { FileText, Image } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import { TabTitle } from "./TabTitle";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { ResultMessage } from "./ResultMessage";
// import { Spinner } from "@/components/ui/spinner";
// import { useState } from "react";

// export const ImageCreator = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState<string | null>(null);
//   return (
//     <div>
//       <TabTitle title={"Food image creator"} />
//       <Label className="text-[#71717A] font-normal text-sm tracking-normal leading-5 my-2">
//         What food image do you want? Describe it briefly.
//       </Label>
//       <div className=" flex flex-col items-end gap-2">
//         <Textarea
//           placeholder="Хоолны тайлбар"
//           className="h-40 resize-none text-sm"
//         />
//         {/* <Button disabled size="sm">
//           <Spinner data-icon="inline-start" />
//           Loading...
//         </Button> */}
//         <Button variant={"outline"} type="submit" className="">
//           Generate
//         </Button>
//         <ResultMessage
//           icon={Image}
//           iconClassName="w-5 h-5 text-green-400"
//           title={"Result"}
//           // text={"First, enter your text to generate an image."}
//         />
//       </div>
//       <div className="text-[#71717A] text-sm font-normal">
//         {isLoading
//           ? "Analyzing image..."
//           : result
//             ? result
//             : "First, enter your image to recognize ingredients."}
//       </div>
//     </div>
//   );
// };
