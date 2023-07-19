"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { WebId } from "solid";

interface IIdentityContext {
  webId: WebId;
  setWebId: Dispatch<SetStateAction<WebId>>;
  drawerIdentityOpen: boolean;
  setDrawerIdentityOpen: Dispatch<SetStateAction<boolean>>;
}

interface StorageKeyAndDispatcher {
  key: StorageKey;
  dispatcher: Dispatch<SetStateAction<string>>;
}

enum StorageKey {
  WebId = "webId",
}

type StorageSyncStates = Record<StorageKey, StorageKeyAndDispatcher>;

const IdentityContext = createContext<IIdentityContext | undefined>(undefined);

export function IdentityProvider({ children }: { children: ReactNode }) {
  const { session } = useSession();
  const [webId, setWebId] = useState("");
  const [drawerIdentityOpen, setDrawerIdentityOpen] = useState(false);

  /**
   * Pairs of storage keys and dispatchers to be used for storing and syncing
   */
  const storageSyncStates: StorageSyncStates = useMemo(() => {
    return {
      [StorageKey.WebId]: { key: StorageKey.WebId, dispatcher: setWebId },
    };
  }, []);

  /**
   * Updates every key and dispatcher pair listed in {@link storageSyncStates}
   */
  useEffect(() => {
    Object.values(storageSyncStates).forEach((value) => {
      const storedValue = sessionStorage.getItem(value.key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);
        if (parsedValue) {
          value.dispatcher(parsedValue);
        }
      }
    });
  }, [storageSyncStates]);

  /**
   * Updates the webId if the external state changes
   */
  useEffect(() => {
    if (session.info.webId) {
      setWebId(session.info.webId);
    }
  }, [session.info.webId]);

  /**
   * Updates a new state and stores the value in the session storage
   * @param storageKeyAndDispatcher - The storage key and dispatcher to store and dispatch a new state
   */
  const updateStateAndStorage = (
    storageKeyAndDispatcher: StorageKeyAndDispatcher
  ) => {
    return (newState: any) => {
      sessionStorage.setItem(
        storageKeyAndDispatcher.key,
        JSON.stringify(newState)
      );
      storageKeyAndDispatcher.dispatcher(newState);
    };
  };

  /**
   * The shared state available child nodes
   */
  const value: IIdentityContext = {
    webId,
    setWebId: updateStateAndStorage(storageSyncStates[StorageKey.WebId]),
    drawerIdentityOpen,
    setDrawerIdentityOpen,
  };

  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
}

/**
 * Returns the identity context
 */
export function useIdentity() {
  const context = useContext(IdentityContext);
  if (context === undefined) {
    throw new Error("useIdentity must be used within a IdentityProvider");
  }
  return context;
}
