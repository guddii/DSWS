import { Button, Divider, FormInstance, message, Space } from "antd";
import {
  getProperties,
  IParsedProperty,
  useSession,
  getContainerItems,
  getThing,
  createUrl,
} from "solid";
import { SessionContent } from "../SessionContent";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { replaceHashInUrl, replacePathnameInUrl } from "solid";

interface IControlButtonsProperties {
  storage?: string;
  form?: FormInstance;
}

const ControlButtons = ({ storage, form }: IControlButtonsProperties) => {
  const { session } = useSession();

  if (!storage) {
    return null;
  }

  const getResourceHandler = async () => {
    try {
      const url: URL = replacePathnameInUrl(storage, "stammdaten/");
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
    <>
      <Space>
        <Button onClick={getResourceHandler}>Stammdaten einfüllen</Button>
      </Space>
    </>
  );
};

interface IControlsAutofillProperties {
  form?: FormInstance;
}
export const ControlsAutofill = ({ form }: IControlsAutofillProperties) => {
  return (
    <SessionContent>
      <Divider plain>Steuererklärung</Divider>
      <ControlButtons form={form} />
      <Divider plain />
    </SessionContent>
  );
};
