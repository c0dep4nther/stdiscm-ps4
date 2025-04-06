export async function POST(request) {
  const { courseId } = await request.json();
  console.log("Enrolled in course:", courseId);
  return Response.json({ message: "Enrolled successfully" });
}