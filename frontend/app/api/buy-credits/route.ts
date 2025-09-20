import { NextRequest } from "next/server";

const FLASK_BASE_URL = "http://127.0.0.1:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${FLASK_BASE_URL}/buy-credits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
