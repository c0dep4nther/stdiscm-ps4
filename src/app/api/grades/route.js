export async function GET() {
  return Response.json([
    { course: "Intro to AI", grade: "A" },
    { course: "Data Structures", grade: "B+" }

  ]);
}