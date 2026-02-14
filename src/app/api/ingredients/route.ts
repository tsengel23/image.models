export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) return new Response("Prompt is required", { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
