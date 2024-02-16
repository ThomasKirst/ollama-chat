export const runtime = "edge";

export async function POST(req: Request) {
  const {messages} = await req.json();

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral",
        messages,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) {
      return new Response("Failed to read response body", {status: 500});
    }

    // TODO: replace by https://sdk.vercel.ai/docs/api-reference/ai-stream
    let readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        while (true) {
          const {done, value} = await reader.read();
          if (done) {
            controller.close();
            break;
          }

          let json = {done: false, message: {content: ""}};
          const rawjson = new TextDecoder().decode(value);

          try {
            json = JSON.parse(rawjson);
          } catch (error) {
            console.error("Invalid JSON:", rawjson);
            throw error;
          }

          if (json.done === false) {
            const textChunk = json.message.content;
            controller.enqueue(encoder.encode(textChunk));
          }
        }
      },
    });

    return new Response(readableStream, {
      headers: {"Content-Type": "text/plain"},
    });
  } catch (e) {
    console.error(e);
    return new Response("Something went wrong adding message", {status: 500});
  }
}
