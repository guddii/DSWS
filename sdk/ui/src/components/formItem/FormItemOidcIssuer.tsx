import { Form, Select } from "antd";
import { ReactElement, useState } from "react";
import { DEFAULT_OIDC_ISSUER, OIDC_ISSUER, toUrlString } from "solid";

export function FormItemOidcIssuer() {
  const [oidcIssuer, setOidcIssuer] = useState(
    toUrlString(DEFAULT_OIDC_ISSUER)
  );

  const handleSelect: any = (url: string) => {
    setOidcIssuer(url);
  };

  const oidcIssuerOptions: Array<ReactElement> = [];

  OIDC_ISSUER.forEach((url, index) => {
    oidcIssuerOptions.push(
      <Select.Option key={`oidcIssuer${index}`} value={toUrlString(url)}>
        {toUrlString(url)}
      </Select.Option>
    );
  });

  return (
    <Form.Item name="oidcIssuer" label="OIDC Issuer">
      <Select
        size="large"
        placeholder="Please choose the OIDC Issuer"
        onSelect={handleSelect}
      >
        {oidcIssuerOptions}
      </Select>
    </Form.Item>
  );
}
