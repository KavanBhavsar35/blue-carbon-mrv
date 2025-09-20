const FLASK_BASE_URL = "http://127.0.0.1:5000";

export async function GET() {
  try {
    const response = await fetch(`${FLASK_BASE_URL}/dashboard-data`);
    const data = await response.json();

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
