import { ReactNode } from "react";
import { Button, Form, FormInstance } from "antd";

interface ITurtleEditorFormProperties {
  children: ReactNode;
  initialValues: Record<string, string>;
  onFinish: (values: Record<string, string>) => void;
  disabled?: boolean;
  form?: FormInstance;
}

export const TurtleEditorForm = ({
  children,
  initialValues,
  onFinish,
  disabled,
  form,
}: ITurtleEditorFormProperties) => {
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      disabled={disabled}
    >
      {children}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
