import { ModalForm } from "./ModalForm";
import { useTranslation } from "i18n/client";

interface IModalSaveToInboxProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const ModalSaveToInbox = ({
  open,
  onCancel,
  onSubmit,
}: IModalSaveToInboxProperties) => {
  const t = useTranslation();

  return (
    <ModalForm<{}>
      title={t("sdk.ui.components.modals.ModalSaveToInbox.title")}
      successMessage={t(
        "sdk.ui.components.modals.ModalSaveToInbox.successMessage"
      )}
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: t("_.no"),
        okText: t("_.yes"),
      }}
    >
      {t("sdk.ui.components.modals.ModalSaveToInbox")}
    </ModalForm>
  );
};
