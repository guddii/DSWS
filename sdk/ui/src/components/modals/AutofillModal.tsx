import { Input, Form } from "antd";
import {
  createUrl,
  issueAccess,
  getStorageFromWebId,
  Session,
  STAMMDATEN_FILE_PATH,
} from "solid";
import { FormModal } from "./FormModal";

interface IAutofillModalProperties {
  open: boolean;
  onClose: () => void;
}

interface IAutofillModalValues {
  webId: string;
}

export const AutofillModal = ({ open, onClose }: IAutofillModalProperties) => {
  const onSubmit = async ({ webId }: IAutofillModalValues) => {
    const emptySession = new Session();

    const webIdUrl = createUrl(webId);
    const storage = await getStorageFromWebId({
      webId: webIdUrl,
      session: emptySession,
    });
    await issueAccess({
      webId: webIdUrl,
      resource: createUrl(STAMMDATEN_FILE_PATH, storage),
    });
  };

  const initialValues: IAutofillModalValues = {
    webId: "",
  };

  return (
    <FormModal<IAutofillModalValues>
      title="Please enter your WebId."
      open={open}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onClose}
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
