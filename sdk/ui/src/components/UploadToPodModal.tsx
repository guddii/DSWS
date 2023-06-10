import { Input, Form, message, Modal } from "antd";
import { useState } from "react";
import { createResource, useSession, createUrl } from "solid";

interface IUploadToPodModalProperties {
  open: boolean;
  data: string;
  onSuccess: (response: Response) => void;
  onCancel: () => void;
}

interface IUploadToPodModalValues {
  containerUrl: string;
}

export const UploadToPodModal = ({
  open,
  data,
  onSuccess,
  onCancel,
}: IUploadToPodModalProperties) => {
  const { session } = useSession();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async ({ containerUrl }: IUploadToPodModalValues) => {
    setIsLoading(true);

    let url: URL;
    try {
      url = createUrl(containerUrl);
    } catch (error) {
      console.error(error);
      message.error("Error while creating URL from input");
      setIsLoading(false);
      return;
    }

    try {
      const response = await createResource({
        url: url,
        body: data,
        session,
      });
      message.success(response.statusText || "Successfully uploaded data");
      onSuccess(response);
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Error while uploading data");
    }
    setIsLoading(false);
  };

  const onReset = () => {
    form.resetFields();
    onCancel();
  };

  const initialValues: IUploadToPodModalValues = {
    containerUrl: "",
  };

  return (
    <Modal
      title="Please enter the upload location URL."
      open={open}
      onOk={form.submit}
      confirmLoading={isLoading}
      onCancel={onReset}
    >
      <Form
        name="upload to pod form"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Location URL"
          name="containerUrl"
          rules={[
            {
              required: true,
              type: "url",
              message: `Please input a valid location URL!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
