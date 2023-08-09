import { Form, Input } from "antd";
import { toUrlString } from "solid";
import { IParsedPropertyWithRules } from "../../helper/propertiesGenerator";

interface IFormItemProperties {
  property: IParsedPropertyWithRules;
}

export const FormItem = ({ property }: IFormItemProperties) => {
  const predicateString = toUrlString(property.predicate);
  const propertyName: string | undefined = predicateString.split("/").pop();

  return (
    <Form.Item
      label={propertyName}
      name={predicateString}
      rules={[
        {
          ...property.rules,
          message: `Please input your ${propertyName}!`,
        },
      ]}
      extra={predicateString}
    >
      <Input />
    </Form.Item>
  );
};
