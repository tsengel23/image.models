export async function POST(req: Request) {
  const { promt } = await req.json();

  const encodedPromt = encodeURIComponent(promt.trim());

  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPromt}`;

  const imageRes = await fetch(imageUrl);

  if (!imageRes.ok) {
    return new Response("Failed to generate image", { status: 500 });
  }

  return new Response(imageRes.body, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
