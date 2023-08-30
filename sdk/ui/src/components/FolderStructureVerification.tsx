"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  ValidAndVerifiedFolderStructure,
  createCitizenFolderStructure,
  verifyCitizenFolderStructure,
} from "solid";
import { Button, Result, Space } from "antd";
import { useSession } from "@inrupt/solid-ui-react";
import { LoadingFullbleed } from "./Loading";
import { VerifiedFolderStructureAlerts } from "./VerifiedFolderStructureAlerts";
import { useIdentity } from "../contexts/IdentityContext";
import { useTranslation } from "i18n/client";

interface IFolderStructureVerificationProperties {
  children: ReactNode;
}

export const FolderStructureVerification = ({
  children,
}: IFolderStructureVerificationProperties) => {
  const t = useTranslation();
  const { storage, webId } = useIdentity();
  const { session } = useSession();
  const [verifyingFolderStructure, setVerifyingFolderStructure] =
    useState(true);
  const [creatingFolderStructure, setCreatingFolderStructure] = useState(false);
  const [verifiedFolderStructure, setVerifiedFolderStructure] =
    useState<ValidAndVerifiedFolderStructure | null>(null);

  const verifyFolderStructureHandler = useCallback(async () => {
    setVerifyingFolderStructure(true);

    const verifyFolderStructureResult = await verifyCitizenFolderStructure(
      session,
      storage
    );
    setVerifiedFolderStructure(verifyFolderStructureResult);

    setVerifyingFolderStructure(false);
  }, [session, storage]);

  const createFolderStructureHandler = useCallback(async () => {
    setCreatingFolderStructure(true);

    if (verifiedFolderStructure) {
      await createCitizenFolderStructure(
        session,
        storage,
        webId,
        verifiedFolderStructure
      );

      const updatedVerifiedFolderStructure: ValidAndVerifiedFolderStructure = {
        stammdatenFolderExists: true,
        stammdatenFileExists: true,
        inboxFolderExists: true,
        inboxFolderPublicAppendAccessExists: true,
        validFolderStructure: true,
      };
      setVerifiedFolderStructure(updatedVerifiedFolderStructure);
    }

    setCreatingFolderStructure(false);
  }, [session, storage, verifiedFolderStructure, webId]);

  useEffect(() => {
    if (storage) {
      verifyFolderStructureHandler();
    }
  }, [storage, verifyFolderStructureHandler]);

  if (!storage) {
    return null;
  }

  if (verifyingFolderStructure || !verifiedFolderStructure) {
    return <LoadingFullbleed />;
  }

  if (!verifiedFolderStructure.validFolderStructure) {
    return (
      <Result
        style={{ margin: "50px auto" }}
        status="warning"
        title={t("sdk.ui.components.FolderStructureVerification.title")}
        subTitle={t("sdk.ui.components.FolderStructureVerification.subTitle")}
        extra={
          <Space direction="vertical" size="large">
            <VerifiedFolderStructureAlerts
              verifiedFolderStructure={verifiedFolderStructure}
            />
            <Button
              type="primary"
              onClick={createFolderStructureHandler}
              loading={creatingFolderStructure}
              disabled={creatingFolderStructure}
            >
              {t("_.create")}
            </Button>
          </Space>
        }
      />
    );
  }

  return <>{children}</>;
};
