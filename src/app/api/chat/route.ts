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
    console.log("API: apiKey", apiKey);
    if (!apiKey) {
      return Response.json(
        { error: "API key is not configured" },
        { status: 500 },
      );
    } // 3️⃣ AI дуудах
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
//         { status: 500 },
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
//       { status: 500 },
//     );
//   }
// }

// bagsh

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { messages } = await request.json();

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey)
//       return NextResponse.json(
//         { error: "GEMINI_API_KEY is not configured" },
//         { status: 500 },
//       );

//     const ai = new GoogleGenAI({ apiKey });

//     const history = messages.slice(0, -1).map((msg: Message) => ({
//       role: msg.role === "assistant" ? "model" : "user",
//       parts: [{ text: msg.content }],
//     }));

//     const lastMessage = messages[messages.length - 1];

//     const chat = ai.chats.create({
//       model: "gemini-2.0-flash",
//       history,
//       config: {
//         systemInstruction:
//           "You are a helpful AI assistant specializing in food, recipes, and ingredients. Provide concise, friendly responses.",
//       },
//     });

//     const response = await chat.sendMessage({
//       message: lastMessage.content,
//     });

//     const assistantMessage =
//       response.text || "Sorry, I couldn't generate a response.";

//     return NextResponse.json({ message: assistantMessage });
//   } catch (error) {
//     console.error("Error in chat API:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

//chatGPT
// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body: { messages: Message[] } = await request.json();
//     const messages = body.messages;

//     if (!Array.isArray(messages) || messages.length === 0) {
//       return NextResponse.json(
//         { error: "messages is required" },
//         { status: 400 },
//       );
//     }

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "GEMINI_API_KEY is not configured" },
//         { status: 500 },
//       );
//     }

//     const ai = new GoogleGenAI({ apiKey });

//     // ✅ Сүүлийн 10 message л явуулна (quota хамгаална)
//     const trimmed = messages.slice(-10);

//     const history = trimmed.slice(0, -1).map((msg) => ({
//       role: msg.role === "assistant" ? "model" : "user",
//       parts: [{ text: msg.content }],
//     }));

//     const lastMessage = trimmed[trimmed.length - 1];

//     const chat = ai.chats.create({
//       model: "gemini-2.0-flash",
//       history,
//       config: {
//         systemInstruction:
//           "You are a helpful AI assistant specializing in food, recipes, and ingredients. Provide concise, friendly responses.",
//       },
//     });

//     const response = await chat.sendMessage({
//       message: lastMessage.content,
//     });

//     return NextResponse.json({
//       message:
//         typeof response.text === "string"
//           ? response.text
//           : "Sorry, I couldn't generate a response.",
//     });
//   } catch (error) {
//     console.error("Chat API error:", error);

//     return NextResponse.json(
//       { error: "Something went wrong on the server." },
//       { status: 500 },
//     );
//   }
// }
