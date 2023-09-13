import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerSubmitData } from "solid";
import { GOV } from "vocab";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max).toString();
}

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    const additionalData = {
      [GOV.FundingGrant.value]: getRandomInt(400),
    };
    return controllerSubmitData({ request, session, additionalData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
