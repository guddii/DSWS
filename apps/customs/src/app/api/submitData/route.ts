import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerSubmitData } from "solid";
import { GOV } from "vocab";

function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min).toString();
}

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    const additionalData = {
      [GOV.VehicleConstructionYear.value]: getRandomIntBetween(1950, 2024),
    };
    return controllerSubmitData({ request, session, additionalData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
