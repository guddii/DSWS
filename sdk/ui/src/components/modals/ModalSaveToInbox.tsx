import { ModalForm } from "./ModalForm";

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
  return (
    <ModalForm<{}>
      title="Save to your inbox"
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: "No",
        okText: "Yes",
      }}
    >
      You have received data from the previous process. Do you want to store
      this data in the inbox of your data vault?
    </ModalForm>
  );
};
