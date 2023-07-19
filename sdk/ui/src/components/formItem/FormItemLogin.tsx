import { Button, Form } from "antd";

export function FormItemLogin() {
  return (
    <Form.Item>
      <Button
        type="primary"
        htmlType={"submit"}
        size="large"
        style={{ width: "100%" }}
      >
        Login
      </Button>
    </Form.Item>
  );
}
