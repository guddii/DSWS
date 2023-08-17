"use client";
import { Form, Input, App } from "antd";
import { webIdFactories, DEFAULT_OIDC_ISSUER, toUrlString } from "solid";
import { UserOutlined } from "@ant-design/icons";

import { FormItemOidcIssuer } from "../formItem/FormItemOidcIssuer";
import { FormItemLogin } from "../formItem/FormItemLogin";
import { useIdentity } from "../../contexts/IdentityContext";

export function FormsAuthNWebId() {
  const { message } = App.useApp();
  const { setWebId, setDrawerIdentityOpen } = useIdentity();

  const onFinish = (values: any) => {
    if (values.username && webIdFactories.has(values.oidcIssuer)) {
      const webIdFactory = webIdFactories.get(values.oidcIssuer);
      if (webIdFactory) {
        const webId = webIdFactory(values.username);
        if (webId) setWebId(webId);
        setDrawerIdentityOpen(false);
      } else {
        message.error("The WebID generator was not present");
      }
    } else {
      message.error("The OIDC issuer is not supported");
    }
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{ oidcIssuer: toUrlString(DEFAULT_OIDC_ISSUER) }}
    >
      <FormItemOidcIssuer />
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please enter username" }]}
      >
        <Input size="large" prefix={<UserOutlined rev={"username"} />} />
      </Form.Item>
      <FormItemLogin />
    </Form>
  );
}
