import { ModalForm } from "./ModalForm";
import { useIdentity } from "../../contexts/IdentityContext";
import { FormItemWebId } from "../formItem/FormItemWebId";
import { ReactElement } from "react";
import { Alert, Space } from "antd";
import { ControlsLogin } from "../controls/ControlsLogin";
import { useTranslation } from "i18n/client";

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
  const t = useTranslation();
  const { webId } = useIdentity();
  const initialValues: IModalWebIdValues = {
    webId: webId,
  };

  return (
    <ModalForm<IModalWebIdValues>
      title={t("sdk.ui.components.modals.ModalWebId.title")}
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
          message={t("sdk.ui.components.modals.ModalWebId.message")}
          description={t("sdk.ui.components.modals.ModalWebId.description")}
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
