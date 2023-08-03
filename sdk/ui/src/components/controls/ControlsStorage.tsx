"use client";
import { ReactNode, useState } from "react";
import {
  createContainer,
  createResource,
  getContainerItems,
  FOAF,
  turtleFileGenerator,
  STAMMDATEN_FOLDER_PATH,
  STAMMDATEN_FILE_PATH,
} from "solid";
import { Button, Divider, message, Space } from "antd";
import { assignPropsToChildren } from "../../helper/assignPropsToChildren";
import { createUrl } from "solid";
import { useSession } from "@inrupt/solid-ui-react";
import { FolderStructureVerification } from "../FolderStructureVerification";
import { useIdentity } from "../../contexts/IdentityContext";

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
    const url: URL = createUrl(STAMMDATEN_FILE_PATH, storage);
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
    const url: URL = createUrl(STAMMDATEN_FOLDER_PATH, storage);
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
  children: ReactNode;
}

export const ControlsStorage = ({ children }: IControlsStorageProperties) => {
  const { storage } = useIdentity();
  const [resource, setResource] = useState("");

  if (!storage) {
    return null;
  }

  const childrenWithProps = assignPropsToChildren(children, {
    source: resource,
  });

  return (
    <FolderStructureVerification storage={storage}>
      <ControlButtons storage={storage} setResource={setResource} />
      <Divider plain />
      {resource && childrenWithProps}
    </FolderStructureVerification>
  );
};
