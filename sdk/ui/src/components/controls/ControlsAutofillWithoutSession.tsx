import { Button, FormInstance, message } from "antd";
import { useEffect, useState } from "react";
import { AutofillModal } from "../modals/AutofillModal";
import { IParsedProperty, getProperties } from "solid";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { useRouter } from "next/navigation";

interface IControlsAutofillWithoutSessionProperties {
  form?: FormInstance;
}

export const ControlsAutofillWithoutSession = ({
  form,
}: IControlsAutofillWithoutSessionProperties) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getResourceHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    try {
      const queryString = globalThis.location?.search;
      const params = new URLSearchParams(queryString);
      const hasAccessGrantUrl = params.has("accessGrantUrl");

      if (hasAccessGrantUrl) {
        setIsLoading(true);
        const q = new URLSearchParams({
          redirectUrl: globalThis.location?.href,
        });

        const getAccessGrant = async () => {
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
        };

        getAccessGrant();
      }
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while fetching data");
      setIsLoading(false);
    }
  }, [form, router]);

  return (
    <>
      <Button
        onClick={getResourceHandler}
        disabled={isLoading}
        loading={isLoading}
      >
        Stammdaten einfüllen ohne Session
      </Button>
      <AutofillModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
