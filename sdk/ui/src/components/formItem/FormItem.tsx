import { Form, Input } from "antd";
import { toUrlString, IParsedProperty } from "solid";

interface IFormItemProperties {
  property: IParsedProperty;
}

export const FormItem = ({ property }: IFormItemProperties) => {
  const predicateString = toUrlString(property.predicate);
  const propertyName: string | undefined = predicateString.split("/").pop();

  return (
    <Form.Item
      label={propertyName}
      name={predicateString}
      rules={[
        { required: true, message: `Please input your ${propertyName}!` },
      ]}
      extra={predicateString}
    >
      <Input />
    </Form.Item>
  );
};
