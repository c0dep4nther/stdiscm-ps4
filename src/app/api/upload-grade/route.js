export async function POST(request) {
  try {
    const baseUrl = process.env.GRADE_SERVICE_URL;
    const gradeEntry = await request.json();

    // log the gradeEntry for debugging
    console.log("Grade Entry:", gradeEntry);

    // POST the grade data to the database
    const response = await fetch(`${baseUrl}/api/grades/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gradeEntry),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload grade: ${response.status}`);
    }

    console.log("Grade uploaded:", gradeEntry);
    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Error processing grade upload:", error);
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
