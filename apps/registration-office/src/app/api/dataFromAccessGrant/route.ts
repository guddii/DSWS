import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerDataFromAccessGrant } from "solid";

export async function GET(request: Request) {
  try {
    const session = await getAgentUserSession();
    return controllerDataFromAccessGrant({ request, session });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
