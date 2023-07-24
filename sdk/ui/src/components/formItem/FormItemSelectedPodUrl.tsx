import { Form, Input } from "antd";

export function FormItemSelectedPodUrl() {
  return (
    <Form.Item
      label="Storage"
      name="storage"
      rules={[
        {
          required: true,
          type: "url",
          message: `Please input a valid storage URL!`,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
}
