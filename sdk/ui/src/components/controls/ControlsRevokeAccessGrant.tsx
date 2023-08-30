import { Button } from "antd";
import { useEffect, useState } from "react";
import { REDIRECT_URL_FROM_AUTOFILL } from "./ControlsAutofillWithoutSession";
import { useTranslation } from "i18n/client";

export const handleRevokeAccessGrant = () => {
  sessionStorage.removeItem(REDIRECT_URL_FROM_AUTOFILL);
};

export const ControlsRevokeAccessGrant = () => {
  const t = useTranslation();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleRevokeAccessGrantInner = () => {
    handleRevokeAccessGrant();
    setRedirectUrl(null);
  };

  useEffect(() => {
    setRedirectUrl(sessionStorage.getItem(REDIRECT_URL_FROM_AUTOFILL));
  }, []);

  if (!redirectUrl) {
    return null;
  }

  return (
    <Button onClick={handleRevokeAccessGrantInner}>{t("_.revoke")}</Button>
  );
};
