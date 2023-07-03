import { Button, FormInstance, message } from "antd";
import {
  getProperties,
  IParsedProperty,
  useSession,
  getContainerItems,
  getThing,
  createUrl,
} from "solid";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { replaceHashInUrl } from "solid";

interface IControlsAutofillWithSessionProperties {
  storage?: string;
  form?: FormInstance;
}

export const ControlsAutofillWithSession = ({
  storage,
  form,
}: IControlsAutofillWithSessionProperties) => {
  const { session } = useSession();

  if (!storage || !session) {
    return null;
  }

  const getResourceHandler = async () => {
    try {
      const url: URL = createUrl("stammdaten/", storage);
      const { firstContainerItem } = await getContainerItems({ url, session });

      const thing = await getThing({
        datasetUrl: createUrl(firstContainerItem),
        thingUrl: replaceHashInUrl(firstContainerItem, "#me"),
        session,
      });

      const properties: Array<IParsedProperty> = await getProperties({
        thing,
      });
      const formValues = formValuesGenerator({ properties });

      if (!form) {
        throw new Error("form is undefined");
      }

      form.setFieldsValue(formValues);
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while fetching data");
    }
  };

  return (
    <Button onClick={getResourceHandler}>
      Stammdaten einfüllen mit Session
    </Button>
  );
};
