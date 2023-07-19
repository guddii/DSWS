import { ModalForm } from "./ModalForm";
import { useIdentity } from "../../contexts/IdentityContext";
import { FormItemWebId } from "../formItem/FormItemWebId";
import { ReactElement } from "react";

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
    >
      {reasonElement}
      <FormItemWebId />
    </ModalForm>
  );
};
