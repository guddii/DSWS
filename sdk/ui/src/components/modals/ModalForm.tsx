import { Form, Modal, ButtonProps } from "antd";
import { ReactNode, useState } from "react";

type Store = Record<string, any>;

interface IModalFormProperties<T extends Store> {
  open: boolean;
  title?: string;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  onCancel: () => void;
  children: ReactNode;
  okButtonProps: ButtonProps;
}

export const ModalForm = <T extends Store>({
  open,
  title = "Please enter the required data.",
  initialValues,
  onSubmit,
  onCancel: onCancelProp,
  children,
  okButtonProps,
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
      okButtonProps={okButtonProps}
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
