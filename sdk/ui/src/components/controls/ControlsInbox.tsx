import { InboxOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export const ControlsInbox = () => {
  const router = useRouter();
  const routeToInbox = () => {
    router.push("/inbox");
  };

  return (
    <Button
      onClick={routeToInbox}
      type="text"
      icon={<InboxOutlined rev={"InboxOutlined"} />}
    />
  );
};
