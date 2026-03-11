// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const prompt = body?.prompt?.trim();

//     if (!prompt) {
//       return new Response(JSON.stringify({ error: "Prompt is required" }), {
//         status: 400,
//       });
//     }

//     const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

//     const imageRes = await fetch(imageUrl);

//     if (!imageRes.ok) {
//       throw new Error("Image generation failed");
//     }

//     return new Response(imageRes.body, {
//       headers: { "Content-Type": "image/png" },
//     });
//   } catch (err) {
//     console.error("POST /image error:", err);

//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const prompt = body?.prompt?.trim();

//     if (!prompt) {
//       return new Response(JSON.stringify({ error: "Prompt is required" }), {
//         status: 400,
//       });
//     }
//     // const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
//     const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&model=flux`;
//     const imageRes = await fetch(imageUrl, {
//       signal: AbortSignal.timeout(30000), //30 second timeout
//     });

//     if (!imageRes.ok) {
//       const errText = await imageRes.text();
//       console.error("Pollinations error:", imageRes.status, errText);
//       throw new Error(`image generation failed: ${imageRes.status}`);
//     }

//     // Stream биш, buffer болгон авах
//     const imageBuffer = await imageRes.arrayBuffer();

//     return new Response(imageBuffer, {
//       headers: {
//         "Content-Type": "image/jpeg",
//         "Cache-Control": "no-store",
//       },
//     });
//   } catch (err) {
//     console.error("POST /image error:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt?.trim();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
      });
    }

    const imageRes = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
        signal: AbortSignal.timeout(60000),
      },
    );

    if (!imageRes.ok) {
      const errText = await imageRes.text();
      console.error("HuggingFace error:", imageRes.status, errText);
      throw new Error(`Image generation failed: ${imageRes.status}`);
    }

    const imageBuffer = await imageRes.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("POST /image error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
