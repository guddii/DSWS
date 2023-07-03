import { Button, FormInstance, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AutofillModal } from "../modals/AutofillModal";
import { IParsedProperty, getProperties } from "solid";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { useRouter } from "next/navigation";
import { handleRevokeAccessGrant } from "./ControlsRevokeAccessGrant";

interface IControlsAutofillWithoutSessionProperties {
  form?: FormInstance;
}

export const ControlsAutofillWithoutSession = ({
  form,
}: IControlsAutofillWithoutSessionProperties) => {
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

  return (
    <>
      <Button
        onClick={handleAutofillClick}
        disabled={isLoading}
        loading={isLoading}
      >
        Autofill Stammdaten
      </Button>
      <AutofillModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
