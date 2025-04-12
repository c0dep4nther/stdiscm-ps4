export async function GET() {
  const baseUrl = process.env.COURSE_SERVICE_URL;
  const response = await fetch(`${baseUrl}/api/courses/`);
  const courses = await response.json();
  return Response.json(courses);
}
