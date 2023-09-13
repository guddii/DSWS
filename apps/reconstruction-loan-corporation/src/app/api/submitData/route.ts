import { NextResponse } from "next/server";
import { getAgentUserSession } from "../../session";
import { controllerSubmitData } from "solid";
import { GOV } from "vocab";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max).toString();
}

function getRandomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min).toString();
}

export async function POST(request: Request) {
  try {
    const session = await getAgentUserSession();
    const additionalData = {
      [GOV.CreditAmount.value]: getRandomInt(100000),
      [GOV.CreditPeriod.value]: getRandomIntBetween(5, 21),
    };
    return controllerSubmitData({ request, session, additionalData });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
