export async function GET() {
  const baseUrl = process.env.GRADE_SERVICE_URL;
  const response = await fetch(`${baseUrl}/api/grades/getAll`);
  const courses = await response.json();
  return Response.json(courses);
}
