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

interface IFolderStructureVerificationProperties {
  children: ReactNode;
}

export const FolderStructureVerification = ({
  children,
}: IFolderStructureVerificationProperties) => {
  const { storage } = useIdentity();
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
  }, [session, storage, verifiedFolderStructure]);

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
        status="warning"
        title="Some of the necessary data is missing."
        subTitle="To ensure correct functionality across all applications certain data and access configurations need to be created."
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
              Create missing data
            </Button>
          </Space>
        }
      />
    );
  }

  return <>{children}</>;
};
