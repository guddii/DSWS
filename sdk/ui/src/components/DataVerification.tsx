import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  AccessModes,
  Session,
  WithServerResourceInfo,
  getResourceInfo,
  universalAccess,
} from "solid";
import { Button, Result, Space, Typography } from "antd";
import { createUrl } from "solid";
import { useSession } from "@inrupt/solid-ui-react";
import { Loading } from "./Loading";
import { VerifiedDataAlerts } from "./VerifiedDataAlerts";

export type VerifiedData = {
  stammdatenFolderExists: boolean;
  stammdatenFileExists: boolean;
  inboxFolderExists: boolean;
  inboxFolderPublicAppendAccessExists: boolean;
};

/**
 * Checks provided resource by fetching the resource info.
 * @param session running solid session
 * @param resourceUrl url of resource to check
 * @returns the info object or null if object doesn't exist
 */
const checkResourceInfo = async (
  session: Session,
  resourceUrl: URL
): Promise<WithServerResourceInfo | null> => {
  try {
    return await getResourceInfo(resourceUrl.toString(), {
      fetch: session.fetch,
    });
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Checks acl configuation of provided resource.
 * @param session running solid session
 * @param resourceUrl url of resource to check
 * @returns the acl configuration object or null if acl doesn't exist
 */
const checkResourceAcl = async (
  session: Session,
  resourceUrl: URL
): Promise<AccessModes | null> => {
  try {
    return await universalAccess.getPublicAccess(resourceUrl.toString(), {
      fetch: session.fetch,
    });
  } catch (error: any) {
    if (error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Verifies that the necessary data exists and has correct access configuration
 * in provided storage. Checks if "stammdaten" folder exists, "stammdaten.ttl"
 * file exists inside "stammdaten" folder, "inbox" folder exists and has public
 * append access enabled.
 * @param session running solid session
 * @param storage url of storage to use for data verification
 * @returns verified data object containing info about existing and missing data
 */
const verifyData = async (
  session: Session,
  storage: string
): Promise<VerifiedData> => {
  const verifiedData: VerifiedData = {
    stammdatenFolderExists: false,
    stammdatenFileExists: false,
    inboxFolderExists: false,
    inboxFolderPublicAppendAccessExists: false,
  };

  const stammdatenUrl = createUrl("stammdaten/", storage);
  const stammdatenFileUrl = createUrl("stammdaten/stammdaten.ttl", storage);
  const inboxUrl = createUrl("inbox/", storage);

  const stammdatenFolderInfo = await checkResourceInfo(session, stammdatenUrl);
  verifiedData.stammdatenFolderExists = !!stammdatenFolderInfo;

  const stammdatenFileInfo = await checkResourceInfo(
    session,
    stammdatenFileUrl
  );
  verifiedData.stammdatenFileExists = !!stammdatenFileInfo;

  const inboxFolderInfo = await checkResourceInfo(session, inboxUrl);
  verifiedData.inboxFolderExists = !!inboxFolderInfo;

  const inboxFolderAcl = await checkResourceAcl(session, inboxUrl);
  verifiedData.inboxFolderPublicAppendAccessExists = !!inboxFolderAcl?.append;

  return verifiedData;
};

/**
 * Checks if any of the entries of the provided data object is set to be missing.
 * @param verifiedData object containing info about existing and missing data
 * @returns info if any of the data entries is missing
 */
const isDataMissing = (verifiedData: VerifiedData | null): boolean => {
  if (!verifiedData) {
    return true;
  }
  return Object.values(verifiedData).some((exists) => !exists);
};

interface IDataVerificationProperties {
  storage: string;
  children: ReactNode;
}

export const DataVerification = ({
  storage,
  children,
}: IDataVerificationProperties) => {
  const { session } = useSession();
  const [verifyingData, setVerifyingData] = useState(true);
  const [verifiedData, setVerifiedData] = useState<VerifiedData | null>(null);
  const dataMissing = isDataMissing(verifiedData);

  const verifyDataHandler = useCallback(async () => {
    setVerifyingData(true);

    const verifyDataResult = await verifyData(session, storage);
    setVerifiedData(verifyDataResult);

    setVerifyingData(false);
  }, [session, storage]);

  useEffect(() => {
    verifyDataHandler();
  }, [verifyDataHandler]);

  if (verifyingData || !verifiedData) {
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

  if (dataMissing) {
    return (
      <Result
        status="warning"
        title="Some of the necessary data is missing."
        subTitle="To ensure correct functionality across all applications certain data and access configurations need to be created."
        extra={
          <Space direction="vertical" size="large">
            <VerifiedDataAlerts verifiedData={verifiedData} />
            <Button type="primary">Create missing data</Button>
          </Space>
        }
      />
    );
  }

  return <>{children}</>;
};
