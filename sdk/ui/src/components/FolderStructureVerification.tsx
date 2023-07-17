import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  ValidAndVerifiedFolderStructure,
  createCitizenFolderStructure,
  verifyCitizenFolderStructure,
} from "solid";
import { Button, Result, Space, Typography } from "antd";
import { useSession } from "@inrupt/solid-ui-react";
import { Loading } from "./Loading";
import { VerifiedFolderStructureAlerts } from "./VerifiedFolderStructureAlerts";

interface IFolderStructureVerificationProperties {
  storage: string;
  children: ReactNode;
}

export const FolderStructureVerification = ({
  storage,
  children,
}: IFolderStructureVerificationProperties) => {
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
    verifyFolderStructureHandler();
  }, [verifyFolderStructureHandler]);

  if (verifyingFolderStructure || !verifiedFolderStructure) {
    return (
      <Space
        align="center"
        direction="vertical"
        size="middle"
        style={{ width: "100%", marginTop: 50 }}
      >
        <Loading style={{ fontSize: 30 }} />
        <Typography>Validating Data...</Typography>
      </Space>
    );
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
