// /frontend/app/api/blockchain/route.js
// Main proxy route handler for all blockchain operations

import { NextRequest } from "next/server";

const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://127.0.0.1:5000";

async function proxyRequest(request: NextRequest, endpoint = "") {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    // Build Flask URL
    const flaskUrl = `${FLASK_BASE_URL}${endpoint}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;

    // Get request body if it exists
    let body = null;

    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.text();
    }

    // Proxy headers (excluding host and other problematic ones)
    const headers: Record<string, string> = {};

    for (const [key, value] of Array.from(request.headers.entries())) {
      if (
        !["host", "connection", "content-length"].includes(key.toLowerCase())
      ) {
        headers[key] = value;
      }
    }

    // Make request to Flask
    const response = await fetch(flaskUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    // Get response data
    const data = await response.text();

    // Return response with CORS headers
    return new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    console.error("Proxy error:", error);

    return new Response(
      JSON.stringify({
        error: "Proxy error",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
