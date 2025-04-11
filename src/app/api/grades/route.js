export async function GET() {
  const response = await fetch("http://localhost:5003/api/grades/getAll");
  const courses = await response.json();
  return Response.json(courses);
}