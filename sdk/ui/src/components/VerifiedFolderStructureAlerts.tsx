import { Alert, Space, Typography } from "antd";
import { ValidAndVerifiedFolderStructure } from "solid";
import { useTranslation } from "i18n/client";

interface IVerifiedFolderStructureAlertsProperties {
  verifiedFolderStructure: ValidAndVerifiedFolderStructure;
}

export const VerifiedFolderStructureAlerts = ({
  verifiedFolderStructure,
}: IVerifiedFolderStructureAlertsProperties) => {
  const t = useTranslation();
  return (
    <Space direction="vertical" style={{ textAlign: "start" }}>
      <Alert
        message={
          <Typography>
            {verifiedFolderStructure.maindataFolderExists
              ? t("_.exists", "/maindata")
              : t("_.missing", "/maindata")}
          </Typography>
        }
        type={
          verifiedFolderStructure.maindataFolderExists ? "success" : "error"
        }
        showIcon
      />
      <Alert
        message={
          <Typography>
            {verifiedFolderStructure.maindataFileExists
              ? t("_.exists", "/maindata/maindata.ttl")
              : t("_.missing", "/maindata/maindata.ttl")}
          </Typography>
        }
        type={verifiedFolderStructure.maindataFileExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            {verifiedFolderStructure.inboxFolderExists
              ? t("_.exists", "/inbox")
              : t("_.missing", "/inbox")}
          </Typography>
        }
        type={verifiedFolderStructure.inboxFolderExists ? "success" : "error"}
        showIcon
      />
      <Alert
        message={
          <Typography>
            {verifiedFolderStructure.inboxFolderPublicAppendAccessExists
              ? t("_.public", "/inbox")
              : t("_.notPublic", "/inbox")}
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
