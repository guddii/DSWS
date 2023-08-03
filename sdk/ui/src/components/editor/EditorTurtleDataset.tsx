import { useSession } from "@inrupt/solid-ui-react";
import { useEffect, useMemo, useRef } from "react";
import { LoadingFailedFullbleed } from "../Loading";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { Form, message } from "antd";
import {
  getProperties,
  putResource,
  toUrlString,
  turtleFileGenerator,
  createUrl,
  getThing,
} from "solid";
import { FormItem } from "../formItem/FormItem";
import { FormsTurtleEditor } from "../forms/FormsTurtleEditor";
import { Dataset } from "../../contexts/PageContext";

interface IEditorTurtleDatasetProperties {
  dataset: Dataset;
  subject: string;
}

export const EditorTurtleDataset = ({
  dataset,
  subject,
}: IEditorTurtleDatasetProperties) => {
  const { session } = useSession();
  const [form] = Form.useForm();

  const data = useMemo(() => {
    const datasetUrl = dataset.internal_resourceInfo.sourceIri;
    const thingUrl = createUrl(subject, datasetUrl);
    const thing = getThing(dataset, toUrlString(thingUrl));

    const properties = thing ? getProperties({ thing }) : undefined;

    const propertyValues = properties
      ? formValuesGenerator({ properties: properties })
      : undefined;

    return { thingUrl, thing, properties, propertyValues };
  }, [dataset, subject]);

  useEffect(() => {
    if (data.propertyValues) {
      form.setFieldsValue(data.propertyValues);
    }
  }, [data.propertyValues, form]);

  if (!data.thing || !data.properties || !data.propertyValues) {
    return <LoadingFailedFullbleed />;
  }

  const onFinish = async (values: Record<string, string>) => {
    try {
      const response = await putResource({
        url: data.thingUrl,
        body: turtleFileGenerator({ subject, values }),
        session,
      });
      message.success(response.statusText || "Successfully updated data");
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while updating data");
    }
  };

  return (
    <FormsTurtleEditor
      form={form}
      initialValues={data.propertyValues}
      onFinish={onFinish}
    >
      {data.properties.map((property) => (
        <FormItem key={toUrlString(property.predicate)} property={property} />
      ))}
    </FormsTurtleEditor>
  );
};
