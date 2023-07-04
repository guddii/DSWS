import { Input, Form } from "antd";
import { FormModal } from "./FormModal";

interface IWebIdModalProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: IWebIdModalValues) => Promise<void>;
}

export interface IWebIdModalValues {
  webId: string;
}

export const WebIdModal = ({
  open,
  onCancel,
  onSubmit,
}: IWebIdModalProperties) => {
  const initialValues: IWebIdModalValues = {
    webId: "",
  };

  return (
    <FormModal<IWebIdModalValues>
      title="Please enter your WebId."
      open={open}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Form.Item
        label="WebId"
        name="webId"
        rules={[
          {
            required: true,
            type: "url",
            message: `Please input a valid WebId URL!`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </FormModal>
  );
};
