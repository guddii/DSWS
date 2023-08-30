import { Form, Input } from "antd";
import { toUrlString } from "solid";
import { IParsedPropertyWithRules } from "../../helper/propertiesGenerator";
import { useTranslation, I18nKey } from "i18n/client";

interface IFormItemProperties {
  property: IParsedPropertyWithRules;
}

export const FormItem = ({ property }: IFormItemProperties) => {
  const t = useTranslation();
  const predicateString = toUrlString(property.predicate);
  const propertyName: string = t(predicateString as I18nKey);

  return (
    <Form.Item
      label={propertyName}
      name={predicateString}
      rules={[
        {
          ...property.rules,
          message: t("_.pleaseEnter", propertyName as string),
        },
      ]}
      extra={predicateString}
    >
      <Input />
    </Form.Item>
  );
};
