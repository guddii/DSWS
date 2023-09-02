import { useTranslation } from "i18n/client";
import { ModalForm } from "./ModalForm";

interface IModalAccessRequestToInboxProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const ModalAccessRequestToInbox = ({
  open,
  onCancel,
  onSubmit,
}: IModalAccessRequestToInboxProperties) => {
  const t = useTranslation();

  return (
    <ModalForm<{}>
      title={t("sdk.ui.components.modals.ModalAccessRequestToInbox.title")}
      successMessage={t(
        "sdk.ui.components.modals.ModalAccessRequestToInbox.successMessage"
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
      {t("sdk.ui.components.modals.ModalAccessRequestToInbox")}
    </ModalForm>
  );
};
