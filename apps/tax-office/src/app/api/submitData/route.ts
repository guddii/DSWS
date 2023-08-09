import { getAgentUserSession } from "../../session";
import { controllerSubmitData } from "solid";

export async function POST(request: Request) {
  const session = await getAgentUserSession();
  return controllerSubmitData({ request, session });
}
