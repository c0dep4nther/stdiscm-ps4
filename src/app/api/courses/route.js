export async function GET() {
    return Response.json([
      { id: 1, name: "Intro to AI", description: "Basics of Artificial Intelligence" },
      { id: 2, name: "Data Structures", description: "Stacks, Queues, Trees, Graphs" }
    ]);
  }