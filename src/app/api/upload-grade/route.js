export async function POST(request) {
  const gradeEntry = await request.json();
  console.log("Grade uploaded:", gradeEntry);
  return Response.json({ status: "success" });
}