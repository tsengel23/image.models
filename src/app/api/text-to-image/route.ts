// export async function POST(req: Request) {
//   const { prompt } = await req.json();

//   const encodedPrompt = encodeURIComponent(prompt.trim());
//   console.log(encodedPrompt, "encodedPrompt");

//   const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

//   const imageRes = await fetch(imageUrl);
//   console.log("imageres", imageRes);

//   if (!imageRes.ok) {
//     return new Response("Failed to generate image", { status: 500 });
//   }

//   return new Response(imageRes.body, {
//     headers: {
//       "Content-Type": "image/png",
//     },
//   });
// }

//
//
//
// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return new Response("Prompt is required", { status: 400 });
//     }

//     const encodedPrompt = encodeURIComponent(prompt.trim());
//     const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

//     const imageRes = await fetch(imageUrl);

//     if (!imageRes.ok) {
//       return new Response("Failed to generate image", { status: 500 });
//     }

//     return new Response(imageRes.body, {
//       headers: {
//         "Content-Type": "image/png",
//       },
//     });
//   } catch (error) {
//     return new Response("Server error", { status: 500 });
//   }
// }
//
//
//
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
