import { getAgentUserSession } from "../../session";
import { controllerGrantReferenceAccess } from "solid";

export async function POST(request: Request) {
  const session = await getAgentUserSession();
  return controllerGrantReferenceAccess({
    request,
    session,
  });
}
