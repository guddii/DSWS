import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerRequestReferenceAccess } from "solid";

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    return controllerRequestReferenceAccess({
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
