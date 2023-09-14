import { useTranslation } from "i18n/client";
import { ModalForm } from "./ModalForm";

interface IModalModelDataOverwriteProperties {
  open: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const ModalModelDataOverwrite = ({
  open,
  onCancel,
  onSubmit,
}: IModalModelDataOverwriteProperties) => {
  const t = useTranslation();

  return (
    <ModalForm<{}>
      title={t("sdk.ui.components.modals.ModalModelDataOverwrite.title")}
      disableSuccessMessage
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: t("sdk.ui.components.modals.ModalModelDataOverwrite.keep"),
        okText: t("sdk.ui.components.modals.ModalModelDataOverwrite.overwrite"),
      }}
    >
      {t("sdk.ui.components.modals.ModalModelDataOverwrite")}
    </ModalForm>
  );
};
