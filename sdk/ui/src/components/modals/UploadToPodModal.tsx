import { Input, Form, message } from "antd";
import { createResource, useSession, createUrl } from "solid";
import { FormModal } from "./FormModal";

interface IUploadToPodModalProperties {
  open: boolean;
  data: string;
  onSuccess: (response: Response) => void;
  onClose: () => void;
}

interface IUploadToPodModalValues {
  containerUrl: string;
}

export const UploadToPodModal = ({
  open,
  data,
  onSuccess,
  onClose,
}: IUploadToPodModalProperties) => {
  const { session } = useSession();

  const onSubmit = async ({ containerUrl }: IUploadToPodModalValues) => {
    let url: URL;
    try {
      url = createUrl(`steuererklärung-${Date.now()}.ttl`, containerUrl);
    } catch (error) {
      console.error(error);
      message.error("Error while creating URL from input");
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
  };

  const initialValues: IUploadToPodModalValues = {
    containerUrl: "",
  };

  return (
    <FormModal<IUploadToPodModalValues>
      title="Please enter the upload location URL."
      open={open}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onClose}
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
    </FormModal>
  );
};
