import { log } from "node:console";

export async function POST(req: Request) {
  try {
    // hereglegchees zurag avna
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;
    //  zurag bgaa eshiig shalgah
    if (!imageFile) {
      return Response.json({ error: "Image is required" }, { status: 400 });
    }

    // zurgiig bytes bolgono
    const bytes = await imageFile.arrayBuffer();

    // huggingFace api-ruu ilgeeh
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: Buffer.from(bytes),
      },
    );

    // hariu shalgah
    if (!response) {
      return Response.json(
        { error: "image can not extracted" },
        { status: 500 },
      );
    }
    // ur dung butsaah
    const result = await response.json();
    return Response.json({
      caption: result[0]?.generated_text || "Can not defined",
    });
  } catch (error) {
    // aldaa barih
    console.error("Error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
