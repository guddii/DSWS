"use client";
import { Form } from "antd";
import { useIdentity } from "../../contexts/IdentityContext";
import { FormItemWebId } from "../formItem/FormItemWebId";
import { FormItemSelectedPodUrl } from "../formItem/FormItemSelectedPodUrl";

export function FormsProfile() {
  const { webId, storage } = useIdentity();

  return (
    <Form initialValues={{ webId: webId, selectedPodUrl: storage }}>
      <FormItemWebId formItemProps={{ hidden: false }} />
      <FormItemSelectedPodUrl />
    </Form>
  );
}
