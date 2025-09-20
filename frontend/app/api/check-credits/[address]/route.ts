import { NextRequest } from "next/server";

const FLASK_BASE_URL = "http://127.0.0.1:5000";

interface CheckCreditsParams {
  address: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: CheckCreditsParams },
) {
  try {
    const { address } = params;
    const response = await fetch(`${FLASK_BASE_URL}/check-credits/${address}`);
    const data = await response.json();

    return Response.json(data);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
