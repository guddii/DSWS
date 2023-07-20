import { Form, Input } from "antd";

export function FormItemSelectedPodUrl() {
  return (
    <Form.Item
      label="Pod"
      name="selectedPodUrl"
      rules={[
        {
          required: true,
          type: "url",
          message: `Please input a valid Pod URL!`,
        },
      ]}
    >
      <Input />
    </Form.Item>
  );
}
