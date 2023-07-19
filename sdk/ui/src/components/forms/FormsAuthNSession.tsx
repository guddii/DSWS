"use client";
import { Form } from "antd";
import { SessionContext } from "@inrupt/solid-ui-react";
import { useContext, useEffect, useState } from "react";
import { Metadata } from "next";
import { toUrlString, DEFAULT_OIDC_ISSUER } from "solid";
import { FormItemOidcIssuer } from "../formItem/FormItemOidcIssuer";
import { FormItemLogin } from "../formItem/FormItemLogin";

interface IFormsAuthNSessionProperties {
  metadata: Metadata;
}

export function FormsAuthNSession({ metadata }: IFormsAuthNSessionProperties) {
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    setRedirectUrl(globalThis.location.href);
  }, []);

  const authOptions = { clientName: String(metadata.title) };

  const { login, setSessionRequestInProgress } = useContext(SessionContext);

  const onFinish = async (values: any) => {
    const { oidcIssuer } = values;
    setSessionRequestInProgress(true);

    const options = {
      redirectUrl,
      oidcIssuer,
      ...authOptions,
    };

    try {
      await login(options);
      setSessionRequestInProgress(false);
    } catch (error) {
      setSessionRequestInProgress(false);
    }
  };

  return (
    <Form
      initialValues={{ oidcIssuer: toUrlString(DEFAULT_OIDC_ISSUER) }}
      onFinish={onFinish}
    >
      <FormItemOidcIssuer />
      <FormItemLogin />
    </Form>
  );
}
