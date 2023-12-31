import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerGrantReferenceAccess } from "solid";

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    return controllerGrantReferenceAccess({
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
