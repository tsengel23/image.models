import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    // 1️⃣ Body авах
    const { message } = await req.json();

    // 2️⃣ Validation
    if (!message || message.trim().length === 0) {
      return Response.json({ error: "Messeage is required" }, { status: 400 });
    }

    // 3️⃣ AI дуудах
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({ model: "gemini-2.0-flash" });
    const response = await chat.sendMessage({ message });

    // 4️⃣ Response
    return Response.json({ reply: response.text });
  } catch (error) {
    // 5️⃣ Error
    console.error("Chat error:", error);
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}

//
//

// import { GoogleGenAI } from "@google/genai";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json().catch(() => null);
//     const message =
//       typeof body?.message === "string" ? body.message.trim() : "";

//     if (!message) {
//       return Response.json({ error: "Message is required" }, { status: 400 });
//     }

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return Response.json(
//         { error: "GEMINI_API_KEY is not configured" },
//         { status: 500 }
//       );
//     }

//     const ai = new GoogleGenAI({ apiKey });

//     // ✅ Chat session
//     const chat = ai.chats.create({ model: "gemini-2.0-flash" });

//     // ⚠️ SDK чинь sendMessage-д яг ямар shape хүсдэг нь хувилбараас хамаарна.
//     // Чинийх шиг { message } ажиллаж байвал OK.
//     // Хэрвээ алдаа өгвөл доорх хувилбарыг хэрэглэнэ:
//     const response = await chat.sendMessage({ message });

//     return Response.json({ reply: response.text ?? "" });
//   } catch (error) {
//     console.error("Chat error:", error);
//     return Response.json(
//       { error: "Failed to process message" },
//       { status: 500 }
//     );
//   }
// }
