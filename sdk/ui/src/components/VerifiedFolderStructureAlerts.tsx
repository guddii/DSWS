import { Alert, Space, Typography } from "antd";
import { ValidAndVerifiedFolderStructure } from "solid";

interface IVerifiedFolderStructureAlertsProperties {
  verifiedFolderStructure: ValidAndVerifiedFolderStructure;
}

export const VerifiedFolderStructureAlerts = ({
  verifiedFolderStructure,
}: IVerifiedFolderStructureAlertsProperties) => {
  return (
    <Space direction="vertical" style={{ textAlign: "start" }}>
      <Alert
        message={
          <Typography>
            <strong>stammdaten</strong> folder{" "}
            {verifiedFolderStructure.stammdatenFolderExists
              ? "exists."
              : "is missing!"}
          </Typography>
        }
        type={
          verifiedFolderStructure.stammdatenFolderExists ? "success" : "error"
        }
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>stammdaten.ttl</strong> file{" "}
            {verifiedFolderStructure.stammdatenFileExists
              ? "exists."
              : "is missing!"}
          </Typography>
        }
        type={
          verifiedFolderStructure.stammdatenFileExists ? "success" : "error"
        }
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>inbox</strong> folder{" "}
            {verifiedFolderStructure.inboxFolderExists
              ? "exists."
              : "is missing!"}
          </Typography>
        }
        type={verifiedFolderStructure.inboxFolderExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            <strong>inbox</strong> folder{" "}
            {verifiedFolderStructure.inboxFolderPublicAppendAccessExists
              ? "is"
              : "is not"}{" "}
            publicly available
            {verifiedFolderStructure.inboxFolderPublicAppendAccessExists
              ? "."
              : "!"}
          </Typography>
        }
        type={
          verifiedFolderStructure.inboxFolderPublicAppendAccessExists
            ? "success"
            : "error"
        }
        showIcon
      />
    </Space>
  );
};
