import { getAgentUserSession } from "../../session";
import { controllerDataFromAccessGrant } from "solid";

export async function GET(request: Request) {
  const session = await getAgentUserSession();
  return controllerDataFromAccessGrant({ request, session });
}
