import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerSubmitData } from "solid";
import { GOV } from "vocab";

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    const additionalUniqueData = [
      {
        name: "vehicleInsuranceID",
        predicate: GOV.VehicleInsuranceID.value,
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
