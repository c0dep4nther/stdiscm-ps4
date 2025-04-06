export async function POST(request) {
  const { username, password } = await request.json();

  if (username === "student" && password === "password") {
    return Response.json({ token: "fake-jwt-token" });
  }

  return new Response(JSON.stringify({ error: "Invalid credentials" }), {
    status: 401,
  });
}