import { AccessModes } from "@inrupt/solid-client";
import { NextResponse } from "next/server";
import { Session } from "@inrupt/solid-client-authn-node";
import { issueAccessRequest } from "@inrupt/solid-client-access-grants";

interface IControllerIssueAccessRequest {
  request: Request;
  session: Session;
  access: Partial<AccessModes>;
}

export const controllerIssueAccessRequest = async ({
  request,
  session,
  access,
}: IControllerIssueAccessRequest): Promise<any> => {
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

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
