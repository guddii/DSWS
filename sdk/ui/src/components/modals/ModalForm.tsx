import { Form, Modal } from "antd";
import { ReactNode, useState } from "react";

type Store = Record<string, any>;

interface IModalFormProperties<T extends Store> {
  open: boolean;
  title?: string;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  onCancel: () => void;
  children: ReactNode;
}

export const ModalForm = <T extends Store>({
  open,
  title = "Please enter the required data.",
  initialValues,
  onSubmit,
  onCancel: onCancelProp,
  children,
}: IModalFormProperties<T>) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: T) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  const onCancel = () => {
    form.resetFields();
    onCancelProp();
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={form.submit}
      confirmLoading={isLoading}
      onCancel={onCancel}
    >
      <Form
        name="modal form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        {children}
      </Form>
    </Modal>
  );
};
