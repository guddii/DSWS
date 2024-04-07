import { RedirectToAccessManagementUiOptions } from "@inrupt/solid-client-access-grants";

interface IIssueAccessOptions {
  fetcher: (searchParams: URLSearchParams) => Promise<Response>;
  webId: URL;
  resource: URL;
}

const redirectToAccessManagementUi = (
  accessRequestVc: any,
  redirectUrl: string,
  redirectOptions: any
) => {
  if (!accessRequestVc.id) {
    throw new Error("ID missing in Verifiable Credential");
  }
  const searchParams = new URLSearchParams({
    requestVcUrl: accessRequestVc.id,
    redirectUrl: redirectUrl,
  });

  location.href = `${redirectOptions.fallbackAccessManagementUi}?${searchParams}`;
};

export const issueAccess = async ({
  webId,
  resource,
  fetcher,
}: IIssueAccessOptions) => {
  const searchParams = new URLSearchParams({
    webId: webId.toString(),
    resource: resource.toString(),
  });

  const response: Response = await fetcher(searchParams);

  const accessRequestVc = await response.json();

  const redirectOptions: RedirectToAccessManagementUiOptions = {
    fallbackAccessManagementUi: "https://amc.inrupt.com/accessRequest",
  };

  redirectToAccessManagementUi(
    accessRequestVc,
    globalThis.window.location.href.toString(),
    redirectOptions
  );
};
