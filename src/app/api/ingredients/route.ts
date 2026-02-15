import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key is not configured" },
        { status: 500 },
      );
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = `You are a culinary expert. The user will describe a food. List all ingredients needed.
    Be concise. Use bullet points.`;

    const fullPrompt = `${systemPrompt}\n\nFood: ${prompt.trim()}`;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return Response.json({ ingredients: text });
  } catch (error) {
    console.error("ingredients error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
