import { NextResponse } from "next/server";
import { issueAccessRequest } from "@inrupt/solid-client-access-grants";
import { getTaxOfficeUserSession } from "../session";

export async function GET(request: Request) {
  const session = await getTaxOfficeUserSession();

  if (session.info.isLoggedIn) {
    const searchParams = new URL(request.url).searchParams;
    const webId = searchParams.get("webId");
    const resource = searchParams.get("resource");

    if (webId && resource) {
      const accessRequestVc = await issueAccessRequest(
        {
          access: {
            read: true,
          },
          resources: [resource],
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
}
