"use client";
import { createContext, ReactNode, useContext } from "react";
import { IAgent } from "../interfaces/IAgent";
import { WebId } from "solid";

export interface IAgentContext extends IAgent {
  webId: WebId;
}

const AgentContext = createContext<IAgentContext | undefined>(undefined);

interface IAgentProviderProperties {
  children: ReactNode;
  agent?: IAgent;
}
export function AgentProvider({ children, agent }: IAgentProviderProperties) {
  const defaultAgent: IAgent = {
    webId: "",
  };

  /**
   * The shared state available child nodes
   */
  const value: IAgentContext = {
    ...defaultAgent,
    ...agent,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
}

/**
 * Returns the Agent context
 */
export function useAgent() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within a AgentProvider");
  }
  return context;
}
