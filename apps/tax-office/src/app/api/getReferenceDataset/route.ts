import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerGetReferenceDataset } from "solid";

/**
 * This handles the fetching of a referenced dataset
 * @param request
 */
export async function GET(request: Request) {
  try {
    const session = await getAgentUserSession();
    return await controllerGetReferenceDataset({
      request,
      session,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
