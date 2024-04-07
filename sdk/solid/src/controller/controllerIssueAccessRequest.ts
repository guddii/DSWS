import { AccessModes } from "@inrupt/solid-client";
import { NextResponse } from "next/server";
import { Session } from "@inrupt/solid-client-authn-node";
import { issueAccessRequest } from "@inrupt/solid-client-access-grants";
import type { IssueAccessRequestParameters } from "@inrupt/solid-client-access-grants/src/gConsent/type/IssueAccessRequestParameters";
import type { AccessBaseOptions } from "@inrupt/solid-client-access-grants/src/gConsent/type/AccessBaseOptions";

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

    if (!webId) {
      throw new Error("webId is unset");
    }

    if (!resources.length) {
      throw new Error("resources are unset");
    }

    const params: IssueAccessRequestParameters = {
      access,
      resourceOwner: webId,
      resources,
    };
    const options: AccessBaseOptions & { returnLegacyJsonld: false } = {
      returnLegacyJsonld: false,
      fetch: session.fetch,
    };

    const accessRequestVc = await issueAccessRequest(params, options);

    return NextResponse.json(accessRequestVc, { status: 200 });
  }

  throw new Error("session is not logged in");
};
