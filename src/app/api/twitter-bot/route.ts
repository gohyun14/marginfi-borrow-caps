export async function GET(request: Request) {
  const response = new Response(JSON.stringify({ message: "success" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
