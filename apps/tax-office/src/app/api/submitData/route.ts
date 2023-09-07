import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { GOV, controllerSubmitData } from "solid";

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    const additionalUniqueData = [
      {
        name: "taxId",
        predicate: GOV.TaxID.value,
      },
    ];
    return controllerSubmitData({ request, session, additionalUniqueData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
