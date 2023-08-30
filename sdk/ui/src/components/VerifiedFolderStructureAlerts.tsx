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
            {verifiedFolderStructure.stammdatenFolderExists
              ? t("_.exists", "/stammdaten")
              : t("_.missing", "/stammdaten")}
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
            {verifiedFolderStructure.stammdatenFileExists
              ? t("_.exists", "/stammdaten/stammdaten.ttl")
              : t("_.missing", "/stammdaten/stammdaten.ttl")}
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
