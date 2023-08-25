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
  return (
    <ModalForm<{}>
      title="Missing Access Permission"
      successMessage="Successfully sent access request to inbox"
      open={open}
      initialValues={{}}
      onSubmit={onSubmit}
      onCancel={onCancel}
      modalProps={{
        cancelText: "No",
        okText: "Yes",
      }}
    >
      It seems like the application does not have the correct permissions to
      access the referenced data. Do you want to send an access request to the
      inbox of your data vault?
    </ModalForm>
  );
};
