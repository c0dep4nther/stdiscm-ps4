export async function GET() {
    const response = await fetch("http://localhost:5002/api/courses/");
    const courses = await response.json();
    return Response.json(courses);
}