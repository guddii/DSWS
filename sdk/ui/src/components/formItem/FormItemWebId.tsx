import { Form, Input } from "antd";

export function FormItemWebId() {
  return (
    <Form.Item
      hidden={true}
      label="WebId"
      name="webId"
      rules={[
        {
          required: true,
          type: "url",
          message: `Please input a valid WebId URL!`,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
}
