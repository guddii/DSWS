import { Button } from "antd";
import { useEffect, useState } from "react";

export const handleRevokeAccessGrant = () => {
  sessionStorage.removeItem("redirectUrl");
};

export const ControlsRevokeAccessGrant = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const handleRevokeAccessGrantInner = () => {
    handleRevokeAccessGrant();
    setRedirectUrl(null);
  };

  useEffect(() => {
    setRedirectUrl(sessionStorage.getItem("redirectUrl"));
  }, []);

  if (!redirectUrl) {
    return null;
  }

  return (
    <Button onClick={handleRevokeAccessGrantInner}>
      Revoke Access Grant Session
    </Button>
  );
};
