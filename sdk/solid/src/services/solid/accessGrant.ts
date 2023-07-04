import {
  redirectToAccessManagementUi,
  RedirectToAccessManagementUiOptions,
} from "@inrupt/solid-client-access-grants";

interface IIssueAccessOptions {
  webId: URL;
  resource: URL;
}

export const issueAccess = async ({ webId, resource }: IIssueAccessOptions) => {
  const searchParams = new URLSearchParams({
    webId: webId.toString(),
    resource: resource.toString(),
  });

  const response: Response = await fetch("/api/issueAccessRequest?" + searchParams.toString());

  const accessRequestVc = await response.json();

  const redirectOptions: RedirectToAccessManagementUiOptions = {
    fallbackAccessManagementUi:
      "https://podbrowser.inrupt.com/privacy/access/requests/",
  };

  redirectToAccessManagementUi(
    accessRequestVc,
    globalThis.window.location.href.toString(),
    redirectOptions
  );
};
