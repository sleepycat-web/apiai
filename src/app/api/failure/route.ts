import { NextResponse } from "next/server";

export async function POST(request : Request) {
  // Get API key from headers
  const apiKey =
    request.headers.get("x-api-key") ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Get API key from environment variable
  const VALID_API_KEY = process.env.API_KEY;

  // Validate API key
  if (!apiKey || !VALID_API_KEY || apiKey !== VALID_API_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized: Invalid or missing API key",
        timestamp: new Date().toISOString(),
      },
      { status: 401 }
    );
  }

  // Always return failure
  return NextResponse.json(
    {
      success: false,
      error: "Operation failed as expected",
      details: {
        error_code: "SIMULATED_FAILURE",
        message: "This endpoint always returns failure for testing purposes",
        failed_at: new Date().toISOString(),
        request_id: Math.random().toString(36).substring(7),
      },
      timestamp: new Date().toISOString(),
    },
    { status: 400 }
  );
}
