import {
  getAccessGrantFromRedirectUrl,
  getSolidDataset,
} from "@inrupt/solid-client-access-grants";
import { NextResponse } from "next/server";
import { getTaxOfficeUserSession } from "../../session";
import { getThing } from "@inrupt/solid-client";

export async function GET(request: Request) {
  const session = await getTaxOfficeUserSession();
  const searchParams = new URL(request.url).searchParams;

  const redirectUrl = searchParams.get("redirectUrl");

  if (redirectUrl) {
    const accessGrantVc = await getAccessGrantFromRedirectUrl(redirectUrl, {
      fetch: session.fetch,
    });
    const datasetUrl =
      accessGrantVc.credentialSubject.providedConsent.forPersonalData[0];

    const mySolidDataset = await getSolidDataset(datasetUrl, accessGrantVc, {
      fetch: session.fetch,
    });

    const thing = getThing(mySolidDataset, `${datasetUrl}#me`);

    return NextResponse.json({ thing }, { status: 200 });
  }

  return NextResponse.error();
}
