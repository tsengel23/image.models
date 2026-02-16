export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await fetch(imageUrl);

    if (!imageRes.ok) {
      throw new Error("Image generation failed");
    }

    return new Response(imageRes.body, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (err) {
    console.error("POST /image error:", err);

    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
