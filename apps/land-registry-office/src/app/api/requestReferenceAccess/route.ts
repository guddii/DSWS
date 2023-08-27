import { getAgentUserSession } from "../../session";
import { controllerRequestReferenceAccess } from "solid";

export async function POST(request: Request) {
  const session = await getAgentUserSession();
  return controllerRequestReferenceAccess({ request, session });
}
