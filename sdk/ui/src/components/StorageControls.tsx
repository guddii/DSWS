import { ReactNode, useState } from "react";
import { useContainer, useResource } from "solid";
import { Button, Divider, message, Space } from "antd";
import { turtleFileGenerator } from "../helper/turtleFileGenerator";
import { assignPropsToChildren } from "../helper/assignPropsToChildren";

interface IControlButtonsProperties {
  storage: string;
  setResource: (resource: string) => void;
}

const ControlButtons = ({
  storage,
  setResource,
}: IControlButtonsProperties) => {
  const { createResource } = useResource();
  const { createContainer, getContainerItems } = useContainer();

  const createContainerHandler = () => {
    createContainer({ url: new URL(storage), name: "stammdaten" }).then(
      (responseOrVoid) =>
        responseOrVoid
          ? message.success("Successfully created 'Stammdaten'-Container")
          : message.error("Error while creating 'Stammdaten'-Container")
    );
  };

  const createResourceHandler = () => {
    const url: URL = new URL(`${storage}stammdaten`);
    createResource({
      url,
      body: turtleFileGenerator(),
    }).then((responseOrVoid) =>
      responseOrVoid
        ? message.success("Successfully created 'Stammdaten'-Resource")
        : message.error("Error while creating 'Stammdaten'-Resource")
    );
  };

  const getResourceHandler = async () => {
    const url: URL = new URL(`${storage}stammdaten/`);
    const { firstContainerItem } = await getContainerItems({ url });
    setResource(firstContainerItem);
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

interface IStorageControlsProperties {
  storage?: string;
  children: ReactNode;
}

export const StorageControls = ({
  storage,
  children,
}: IStorageControlsProperties) => {
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
