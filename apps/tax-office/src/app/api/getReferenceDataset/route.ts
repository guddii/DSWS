import { getAgentUserSession } from "../../session";
import { controllerGetReferenceDataset } from "solid";

/**
 * This handles the fetching of a referenced dataset
 * @param request
 */
export async function GET(request: Request) {
  const session = await getAgentUserSession();

  return await controllerGetReferenceDataset({
    request,
    session,
  });
}
