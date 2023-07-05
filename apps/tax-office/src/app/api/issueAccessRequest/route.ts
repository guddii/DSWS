import { NextResponse } from "next/server";
import { issueAccessRequest } from "@inrupt/solid-client-access-grants";
import { getTaxOfficeUserSession } from "../../session";
import { AccessModes } from "@inrupt/solid-client";

/**
 * A generic request handler for issue access requests
 * @param request
 * @param access
 */
const requestHandler = async (
  request: Request,
  access: Partial<AccessModes>
) => {
  const session = await getTaxOfficeUserSession();

  if (session.info.isLoggedIn) {
    const searchParams = new URL(request.url).searchParams;
    const webId = searchParams.get("webId");
    const resources = searchParams.getAll("resource");

    if (webId && resources.length) {
      const accessRequestVc = await issueAccessRequest(
        {
          access,
          resources,
          resourceOwner: webId,
        },
        {
          fetch: session.fetch,
        }
      );

      return NextResponse.json(accessRequestVc, { status: 200 });
    }
  }

  return NextResponse.error();
};

/**
 * This handles the reading of an issue access request function
 * @param request
 * @constructor
 */
export async function GET(request: Request) {
  return await requestHandler(request, {
    read: true,
  });
}
