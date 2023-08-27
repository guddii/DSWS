import {
  getAccessGrantFromRedirectUrl,
  getSolidDataset,
} from "@inrupt/solid-client-access-grants";
import { getThing, getThingAll } from "@inrupt/solid-client";
import { NextResponse } from "next/server";
import { Session } from "@inrupt/solid-client-authn-node";

enum DataFromAccessGrantSearchParams {
  RedirectUrl = "redirectUrl",
  WebId = "webId",
}

interface IControllerDataFromAccessGrant {
  request: Request;
  session: Session;
}

export const controllerDataFromAccessGrant = async ({
  request,
  session,
}: IControllerDataFromAccessGrant) => {
  const searchParams = new URL(request.url).searchParams;

  const redirectUrl = searchParams.get(
    DataFromAccessGrantSearchParams.RedirectUrl
  );

  if (redirectUrl) {
    const accessGrantVc = await getAccessGrantFromRedirectUrl(redirectUrl, {
      fetch: session.fetch,
    });
    const datasetUrl =
      accessGrantVc.credentialSubject.providedConsent.forPersonalData[0];

    const mySolidDataset = await getSolidDataset(datasetUrl, accessGrantVc, {
      fetch: session.fetch,
    });

    const webId = searchParams.get(DataFromAccessGrantSearchParams.WebId);
    let thing;
    if (webId) {
      thing = getThing(mySolidDataset, webId);
    } else {
      thing = getThingAll(mySolidDataset)[0];
    }

    return NextResponse.json({ thing }, { status: 200 });
  }

  return NextResponse.error();
};
