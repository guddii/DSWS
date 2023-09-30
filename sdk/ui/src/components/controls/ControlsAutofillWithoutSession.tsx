import { Button, FormInstance, App, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  IParsedProperty,
  getProperties,
  Session,
  createUrl,
  getStorageFromWebId,
  issueAccess,
  MAINDATA_FILE_PATH,
} from "solid";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { useRouter } from "next/navigation";
import { handleRevokeAccessGrant } from "./ControlsRevokeAccessGrant";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";
import { useIdentity } from "../../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

export const REDIRECT_URL_FROM_AUTOFILL = "redirectUrl";

interface IControlsAutofillWithoutSessionProperties {
  form?: FormInstance;
}

export const ControlsAutofillWithoutSession = ({
  form,
}: IControlsAutofillWithoutSessionProperties) => {
  const t = useTranslation();
  const { message } = App.useApp();
  const { webId } = useIdentity();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAutofillClick = () => {
    const redirectUrl = sessionStorage.getItem(REDIRECT_URL_FROM_AUTOFILL);

    if (redirectUrl) {
      getAccessGrant(redirectUrl).catch(message.error);
    } else {
      openModal();
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const getAccessGrant = useCallback(
    async (redirectUrl: string) => {
      try {
        setIsLoading(true);

        const searchParams = new URLSearchParams({
          redirectUrl,
          webId,
        });
        const response = await fetch(
          `/api/dataFromAccessGrant?${searchParams}`
        );
        const { thing } = await response.json();

        const properties: Array<IParsedProperty> = await getProperties({
          thing,
        });
        const formValues = formValuesGenerator({ properties });

        if (!form) {
          throw new Error("form is undefined");
        }

        form.setFieldsValue(formValues);
        router.push(globalThis.location.pathname); // Removes the query to prevent infinite fetching
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        message.error(
          (error.message && t(error.message)) || t("_.errorMessage")
        );
        handleRevokeAccessGrant();
        setIsLoading(false);
      }
    },
    [form, message, router, t, webId]
  );

  useEffect(() => {
    const queryString = globalThis.location?.search;
    const params = new URLSearchParams(queryString);
    const hasAccessGrantUrl = params.has("accessGrantUrl");

    if (hasAccessGrantUrl) {
      sessionStorage.setItem(
        REDIRECT_URL_FROM_AUTOFILL,
        globalThis.location?.href
      );
      const redirectUrl = sessionStorage.getItem(REDIRECT_URL_FROM_AUTOFILL);

      if (redirectUrl) {
        getAccessGrant(redirectUrl).catch(console.error);
      }
    }
  }, [form, getAccessGrant, router]);

  const onCancel = () => {
    setOpen(false);
  };

  const onSubmit = async ({ webId }: IModalWebIdValues) => {
    const emptySession = new Session();

    const webIdUrl = createUrl(webId);
    const storage = await getStorageFromWebId({
      webId: webIdUrl,
      session: emptySession,
    });
    await issueAccess({
      fetcher: (searchParams) => {
        return fetch("/api/issueAccessRequest?" + searchParams.toString());
      },
      webId: webIdUrl,
      resource: createUrl(MAINDATA_FILE_PATH, storage),
    });
  };

  return (
    <>
      <Button
        onClick={handleAutofillClick}
        disabled={isLoading}
        loading={isLoading}
      >
        {t("_.autofill")}
      </Button>
      <ModalWebId
        open={open}
        onCancel={onCancel}
        onSubmit={onSubmit}
        reasonElement={
          <>
            <Typography.Paragraph>
              {t(
                "sdk.ui.components.controls.ControlsAutofillWithoutSession.reasonElement.1"
              )}
              <Typography.Text code>{MAINDATA_FILE_PATH}</Typography.Text>
              {t(
                "sdk.ui.components.controls.ControlsAutofillWithoutSession.reasonElement.2"
              )}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {t(
                "sdk.ui.components.controls.ControlsAutofillWithoutSession.reasonElement.3"
              )}
            </Typography.Paragraph>
          </>
        }
      />
    </>
  );
};
