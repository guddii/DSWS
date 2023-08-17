import { Form, Modal, App, ModalProps } from "antd";
import { ReactNode, useState } from "react";

type Store = Record<string, any>;

interface IModalFormProperties<T extends Store> {
  open: boolean;
  title?: string;
  successMessage?: string;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
  onCancel: () => void;
  children: ReactNode;
  modalProps?: ModalProps;
}

export const ModalForm = <T extends Store>({
  open,
  title = "Please enter the required data.",
  successMessage = "The task has been successfully performed",
  initialValues,
  onSubmit,
  onCancel: onCancelProp,
  children,
  modalProps,
}: IModalFormProperties<T>) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: T) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
      message.success(successMessage);
    } catch (error: any) {
      message.error(error.message || "An error has occurred");
      console.error(error);
    }
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
      {...modalProps}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        {children}
      </Form>
    </Modal>
  );
};
