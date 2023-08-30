import { ModalForm } from "./ModalForm";
import { useTranslation } from "i18n/client";

interface IModalDeleteMessageFromInboxProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const ModalDeleteMessageFromInbox = ({
  open,
  onCancel,
  onSubmit,
}: IModalDeleteMessageFromInboxProperties) => {
  const t = useTranslation();

  return (
    <ModalForm<{}>
      title={t("_.delete")}
      successMessage={t("_.success")}
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: t("_.no"),
        okText: t("_.yes"),
      }}
    >
      {t("sdk.ui.components.modals.ModalDeleteMessageFromInbox")}
    </ModalForm>
  );
};
