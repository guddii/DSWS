import { Form, Modal, App, ModalProps } from "antd";
import { ReactNode, useState } from "react";
import { useTranslation } from "i18n/client";

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
  title,
  successMessage,
  initialValues,
  onSubmit,
  onCancel: onCancelProp,
  children,
  modalProps,
}: IModalFormProperties<T>) => {
  const t = useTranslation();
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  title = title || t("sdk.ui.components.modals.ModalForm.title");
  successMessage =
    successMessage || t("sdk.ui.components.modals.ModalForm.successMessage");

  const onFinish = async (values: T) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
      message.success(successMessage);
    } catch (error: any) {
      message.error(error.message || t("_.errorMessage"));
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
