import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerIssueAccessRequest } from "solid";

/**
 * This handles the reading of an issue access request function
 * @param request
 * @constructor
 */
export async function GET(request: Request) {
  try {
    const session = await getAgentUserSession();
    const access = {
      read: true,
    };
    return await controllerIssueAccessRequest({
      request,
      session,
      access,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
