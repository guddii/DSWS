import { ReactNode } from "react";
import { Button, Form, FormInstance } from "antd";
import { useTranslation } from "i18n/client";

interface IFormsTurtleEditorProperties {
  children: ReactNode;
  initialValues: Record<string, string>;
  onFinish: (values: Record<string, string>) => void;
  disabled?: boolean;
  form?: FormInstance;
}

export const FormsTurtleEditor = ({
  children,
  initialValues,
  onFinish,
  disabled,
  form,
}: IFormsTurtleEditorProperties) => {
  const t = useTranslation();

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      disabled={disabled}
    >
      {children}
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {t("_.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
};
