import { ModalForm } from "./ModalForm";

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
  return (
    <ModalForm<{}>
      title="Delete message from inbox"
      successMessage="Successfully deleted message"
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: "No",
        okText: "Yes",
      }}
    >
      Do you want to delete this message with all its data from your inbox?
    </ModalForm>
  );
};
