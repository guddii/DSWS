import { ReactNode, useState } from "react";
import {
  createContainer,
  createResource,
  getContainerItems,
  FOAF,
} from "solid";
import { Button, Divider, message, Space } from "antd";
import { turtleFileGenerator } from "../../helper/turtleFileGenerator";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { useSession, createUrl, replacePathnameInUrl } from "solid";

interface IControlButtonsProperties {
  storage: string;
  setResource: (resource: string) => void;
}

const ControlButtons = ({
  storage,
  setResource,
}: IControlButtonsProperties) => {
  const { session } = useSession();

  const createContainerHandler = async () => {
    const url = createUrl(storage);
    try {
      const response = await createContainer({
        url,
        name: "stammdaten",
        session,
      });
      message.success(
        response.statusText || "Successfully created 'Stammdaten'-Container"
      );
    } catch (error: any) {
      console.error(error);
      message.error(
        error.message || "Error while creating 'Stammdaten'-Container"
      );
    }
  };

  const createResourceHandler = async () => {
    const url: URL = replacePathnameInUrl(storage, "stammdaten");
    const defaultData = {
      subject: "#me",
      values: {
        [FOAF.firstName.iri.value]: "",
        [FOAF.lastName.iri.value]: "",
      },
    };

    try {
      const response = await createResource({
        url,
        body: turtleFileGenerator(defaultData),
        session,
      });

      message.success(
        response.statusText || "Successfully created 'Stammdaten'-Resource"
      );
    } catch (error: any) {
      console.error(error);
      message.error(
        error.message || "Error while creating 'Stammdaten'-Resource"
      );
    }
  };

  const getResourceHandler = async () => {
    const url: URL = replacePathnameInUrl(storage, "stammdaten/");
    try {
      const { firstContainerItem } = await getContainerItems({ url, session });
      setResource(firstContainerItem);
    } catch (error: any) {
      console.error(error);
      message.error(
        error.message || "Error while creating 'Stammdaten'-Container"
      );
    }
  };

  return (
    <>
      <Space>
        <Button onClick={createContainerHandler}>Create Container</Button>
        <Button onClick={createResourceHandler}>Create Resource</Button>
        <Button onClick={getResourceHandler}>Get Resource</Button>
      </Space>
    </>
  );
};

interface IControlsStorageProperties {
  storage?: string;
  children: ReactNode;
}

export const ControlsStorage = ({
  storage,
  children,
}: IControlsStorageProperties) => {
  const [resource, setResource] = useState("");

  if (!storage) {
    return null;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    source: resource,
  });

  return (
    <>
      <Divider plain>Stammdaten</Divider>
      <ControlButtons storage={storage} setResource={setResource} />
      <Divider plain />
      {resource && childrenWithProps}
    </>
  );
};