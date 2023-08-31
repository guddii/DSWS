import { getAgentUserSession } from "../../session";
import {
  LAND_REGISTRY_OFFICE_APP_URL,
  controllerRequestReferenceAccess,
} from "solid";

export async function POST(request: Request) {
  const session = await getAgentUserSession();
  return controllerRequestReferenceAccess({
    request,
    session,
    serviceProvider: LAND_REGISTRY_OFFICE_APP_URL,
  });
}
