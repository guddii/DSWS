import { Button, FormInstance, message, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import {
  IParsedProperty,
  getProperties,
  Session,
  createUrl,
  getStorageFromWebId,
  issueAccess,
  STAMMDATEN_FILE_PATH,
} from "solid";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { useRouter } from "next/navigation";
import { handleRevokeAccessGrant } from "./ControlsRevokeAccessGrant";
import { useIdentity } from "../../contexts/IdentityContext";
import { IModalWebIdValues, ModalWebId } from "../modals/ModalWebId";

interface IControlsAutofillWithoutSessionProperties {
  form?: FormInstance;
}

export const ControlsAutofillWithoutSession = ({
  form,
}: IControlsAutofillWithoutSessionProperties) => {
  const { webId } = useIdentity();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAutofillClick = () => {
    const redirectUrl = sessionStorage.getItem("redirectUrl");

    if (redirectUrl) {
      getAccessGrant(redirectUrl);
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

        const q = new URLSearchParams({
          redirectUrl,
        });
        const response = await fetch(`/api/dataFromAccessGrant?${q}`);
        const { thing } = await response.json();

        const properties: Array<IParsedProperty> = await getProperties({
          thing,
        });
        const formValues = formValuesGenerator({ properties });

        if (!form) {
          throw new Error("form is undefined");
        }

        form.setFieldsValue(formValues);
        router.push("/");
        setIsLoading(false);
      } catch (error: any) {
        console.error(error);
        message.error(error.message || "Error while fetching data");
        handleRevokeAccessGrant();
        setIsLoading(false);
      }
    },
    [form, router]
  );

  useEffect(() => {
    const queryString = globalThis.location?.search;
    const params = new URLSearchParams(queryString);
    const hasAccessGrantUrl = params.has("accessGrantUrl");

    if (hasAccessGrantUrl) {
      sessionStorage.setItem("redirectUrl", globalThis.location?.href);
      const redirectUrl = sessionStorage.getItem("redirectUrl");

      if (redirectUrl) {
        getAccessGrant(redirectUrl);
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
      webId: webIdUrl,
      resource: createUrl(STAMMDATEN_FILE_PATH, storage),
    });
  };

  return (
    <>
      <Button
        onClick={handleAutofillClick}
        disabled={isLoading}
        loading={isLoading}
      >
        Autofill Stammdaten
      </Button>
      <ModalWebId
        open={open}
        onCancel={onCancel}
        onSubmit={onSubmit}
        reasonElement={
          <>
            <Typography.Paragraph>
              The application needs your WebId to determine the address of your
              data vault and to retrieve the data from the
              <Typography.Text code>{STAMMDATEN_FILE_PATH}</Typography.Text>
              file stored there.
            </Typography.Paragraph>
            <Typography.Paragraph>
              The data from this file will be used to fill the content into the
              form.
            </Typography.Paragraph>
          </>
        }
      />
    </>
  );
};
