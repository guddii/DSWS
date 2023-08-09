import { getAgentUserSession } from "../../session";
import { controllerIssueAccessRequest } from "solid";

/**
 * This handles the reading of an issue access request function
 * @param request
 * @constructor
 */
export async function GET(request: Request) {
  const session = await getAgentUserSession();
  const access = {
    read: true,
  };
  return await controllerIssueAccessRequest({
    request,
    session,
    access,
  });
}
