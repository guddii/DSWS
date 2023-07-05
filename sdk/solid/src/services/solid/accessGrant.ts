import {
  redirectToAccessManagementUi,
  RedirectToAccessManagementUiOptions,
} from "@inrupt/solid-client-access-grants";

interface IIssueAccessOptions {
  fetcher: (searchParams: URLSearchParams) => Promise<Response>;
  webId: URL;
  resource: URL;
}

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
    fallbackAccessManagementUi:
      "https://podbrowser.inrupt.com/privacy/access/requests/",
  };

  redirectToAccessManagementUi(
    accessRequestVc,
    globalThis.window.location.href.toString(),
    redirectOptions
  ).catch(console.error);
};
