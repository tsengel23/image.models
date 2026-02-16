// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    // 1️⃣ Body авах
    const { message } = await req.json();

    // 2️⃣ Validation
    if (!message || message.trim().length === 0) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }
    // 3️⃣ API key шалгах
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key is not configured" },
        { status: 500 },
      );
    } // 3️⃣ AI дуудах
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // const result = await model.generateContent({
    //   contents: [{ role: "user", parts: [{ text: message }] }],
    //   generationConfig: {
    //     maxOutputTokens: 120,

    //   },
    // }); // <---- hervee irj bgaa chat-iin urtad limit togtoomoor bval uuniig ashiglana!!!!!
    const result = await model.generateContent(message);
    const text = result.response.text();

    // 4️⃣ Response
    return Response.json({ reply: text });
  } catch (error) {
    // 5️⃣ Error
    console.error("Chat error:", error);
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}
