import { ModalForm } from "./ModalForm";
import { useIdentity } from "../../contexts/IdentityContext";
import { FormItemWebId } from "../formItem/FormItemWebId";
import { ReactElement } from "react";
import { Alert, Space } from "antd";
import { ControlsLogin } from "../controls/ControlsLogin";

interface IModalWebIdProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: IModalWebIdValues) => Promise<void>;
  reasonElement?: ReactElement;
}

export interface IModalWebIdValues {
  webId: string;
}

export const ModalWebId = ({
  open,
  onCancel,
  onSubmit,
  reasonElement,
}: IModalWebIdProperties) => {
  const { webId } = useIdentity();
  const initialValues: IModalWebIdValues = {
    webId: webId,
  };

  return (
    <ModalForm<IModalWebIdValues>
      title="WebId Usage"
      open={open}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        okButtonProps: {
          disabled: !webId,
        },
      }}
    >
      {reasonElement}
      <div hidden={!!webId}>
        <Alert
          message="Login required"
          description="A login is required to perform this action. Please click on login to activate the OK button"
          type="info"
          action={
            <Space direction="vertical">
              <ControlsLogin />
            </Space>
          }
        />
      </div>
      <FormItemWebId />
    </ModalForm>
  );
};
