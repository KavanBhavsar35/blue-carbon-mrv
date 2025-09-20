const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://127.0.0.1:5000";

export async function GET() {
  console.log("Fetching accounts...");
  try {
    const response = await fetch(`${FLASK_BASE_URL}/accounts`);
    const data = await response.json();

    console.log("Fetched accounts:", data);

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
