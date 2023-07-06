import { Alert, Space, Typography } from "antd";
import { VerifiedData } from "./DataVerification";

interface IVerifiedDataAlertsProperties {
  verifiedData: VerifiedData;
}

export const VerifiedDataAlerts = ({
  verifiedData,
}: IVerifiedDataAlertsProperties) => {
  return (
    <Space direction="vertical" style={{ textAlign: "start" }}>
      <Alert
        message={
          <Typography>
            <strong>stammdaten</strong> folder{" "}
            {verifiedData.stammdatenFolderExists ? "exists." : "is missing!"}
          </Typography>
        }
        type={verifiedData.stammdatenFolderExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>stammdaten.ttl</strong> file{" "}
            {verifiedData.stammdatenFileExists ? "exists." : "is missing!"}
          </Typography>
        }
        type={verifiedData.stammdatenFileExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>inbox</strong> folder{" "}
            {verifiedData.inboxFolderExists ? "exists." : "is missing!"}
          </Typography>
        }
        type={verifiedData.inboxFolderExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>inbox</strong> folder{" "}
            {verifiedData.inboxFolderPublicAppendAccessExists ? "is" : "is not"}{" "}
            publicly available
            {verifiedData.inboxFolderPublicAppendAccessExists ? "." : "!"}
          </Typography>
        }
        type={
          verifiedData.inboxFolderPublicAppendAccessExists ? "success" : "error"
        }
        showIcon
      />
    </Space>
  );
};
