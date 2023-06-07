import { Input, Form, message, Modal } from "antd";
import { useState } from "react";
import { logger, useResource } from "solid";

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
  const { createResource } = useResource();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = ({ containerUrl }: IUploadToPodModalValues) => {
    setIsLoading(true);

    let url: URL;
    try {
      url = new URL(containerUrl);
    } catch (error) {
      logger({ caller: "onFinish", error });
      message.error("Error while creating URL from input");
      setIsLoading(false);
      return;
    }

    createResource({
      url: url,
      body: data,
    }).then((responseOrVoid) => {
      setIsLoading(false);
      if (responseOrVoid) {
        message.success("Successfully uploaded data");
        onSuccess(responseOrVoid);
      } else {
        message.error("Error while uploading data");
      }
    });
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
