import { useSession } from "@inrupt/solid-ui-react";
import { useEffect, useMemo } from "react";
import { LoadingFailedFullbleed } from "../Loading";
import { formValuesGenerator } from "../../helper/formValuesGenerator";
import { Form, App } from "antd";
import {
  getProperties,
  toUrlString,
  createUrl,
  getThing,
  setStringNoLocale,
  setThing,
  saveSolidDatasetAt,
} from "solid";
import { FormItem } from "../formItem/FormItem";
import { FormsTurtleEditor } from "../forms/FormsTurtleEditor";
import { Dataset, useLoadAndSetDataset } from "../../contexts/PageContext";
import { useTranslation } from "i18n/client";

interface IEditorTurtleDatasetProperties {
  dataset: Dataset;
  subject: string;
}

export const EditorTurtleDataset = ({
  dataset,
  subject,
}: IEditorTurtleDatasetProperties) => {
  const t = useTranslation();
  const { session } = useSession();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const loadAndSetDataset = useLoadAndSetDataset();

  const data = useMemo(() => {
    const datasetUrl = dataset.internal_resourceInfo.sourceIri;
    const thingUrl = createUrl(subject, datasetUrl);
    const thing = getThing(dataset, toUrlString(thingUrl));

    const properties = thing ? getProperties({ thing }) : undefined;

    const propertyValues = properties
      ? formValuesGenerator({ properties: properties })
      : undefined;

    return { datasetUrl, thingUrl, thing, properties, propertyValues };
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
      if (data.thing == null) {
        return;
      }
      let updatedThing = data.thing;

      Object.entries(values).forEach(([predicate, value]) => {
        updatedThing = setStringNoLocale(updatedThing, predicate, value);
      });

      const updatedDataset = setThing(dataset, updatedThing);

      await saveSolidDatasetAt(data.datasetUrl, updatedDataset, {
        fetch: session.fetch,
      });

      // reload dataset to get newest changes to prevent problems with multiple updates
      await loadAndSetDataset(data.datasetUrl);

      message.success(t("_.success"));
    } catch (error: any) {
      console.error(error);
      message.error(error.message || t("_.errorMessage"));
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
