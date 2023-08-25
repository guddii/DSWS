import { getSolidDataset } from "@inrupt/solid-client";
import { NextResponse } from "next/server";
import { Session } from "@inrupt/solid-client-authn-node";

interface IControllerIssueAccessRequest {
  request: Request;
  session: Session;
}

export const controllerGetReferenceDataset = async ({
  request,
  session,
}: IControllerIssueAccessRequest): Promise<any> => {
  if (session.info.isLoggedIn) {
    const searchParams = new URL(request.url).searchParams;
    const referenceUrl = searchParams.get("referenceUrl");

    if (!referenceUrl) {
      return NextResponse.json(
        { error: "referenceUrl parameter is missing" },
        { status: 400 }
      );
    }

    try {
      const dataset = await getSolidDataset(referenceUrl, {
        fetch: session.fetch,
      });

      return NextResponse.json(dataset, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response.status }
      );
    }
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
};
