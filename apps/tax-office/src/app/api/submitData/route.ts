import { getAgentUserSession } from "../../session";
import { GOV, controllerSubmitData } from "solid";

export async function POST(request: Request) {
  const session = await getAgentUserSession();
  const additionalUniqueData = [
    {
      name: "taxId",
      predicate: GOV.TaxID.value,
    },
  ];
  return controllerSubmitData({ request, session, additionalUniqueData });
}
