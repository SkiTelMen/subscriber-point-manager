
import React, { createContext, useContext, ReactNode } from "react";
import { Client, Contract, SubscriberPoint } from "@/types";
import { useClientData } from "@/hooks/useClientData";
import * as clientService from "@/services/clientService";
import { toast } from "sonner";

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "contracts">) => Promise<void>;
  updateClient: (client: Client) => Promise<void>;
  deleteClient: (clientId: string) => Promise<void>;
  addContract: (clientId: string, contractNumber: string, contractDate: string, numberOfApprovals?: string) => Promise<Contract>;
  deleteContract: (clientId: string, contractId: string) => Promise<void>;
  addSubscriberPoint: (
    clientId: string, 
    contractId: string, 
    name: string, 
    networkNumber: string,
    validityDate: string,
    type: 'Coordinator' | 'Client'
  ) => Promise<SubscriberPoint>;
  deleteSubscriberPoint: (clientId: string, contractId: string, pointId: string) => Promise<void>;
  getClient: (clientId: string) => Promise<Client | undefined>;
  getSubscriberPointsByTin: (tin: string) => Promise<{ client: Client, subscriberPoints: (SubscriberPoint & { contractId: string })[] } | null>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const { clients, setClients } = useClientData();

  const handleAddClient = async (clientData: Omit<Client, "id" | "contracts">) => {
    const newClient = await clientService.addClient(clientData);
    setClients(prev => [...prev, newClient]);
    toast.success("Client added successfully");
  };

  const handleUpdateClient = async (updatedClient: Client) => {
    await clientService.updateClient(updatedClient);
    setClients(prev => prev.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    toast.success("Client updated successfully");
  };

  const handleDeleteClient = async (clientId: string) => {
    await clientService.deleteClient(clientId);
    setClients(prev => prev.filter(client => client.id !== clientId));
    toast.success("Client deleted successfully");
  };

  const handleAddContract = async (
    clientId: string,
    contractNumber: string,
    contractDate: string,
    numberOfApprovals?: string
  ) => {
    const newContract = await clientService.addContract(clientId, contractNumber, contractDate, numberOfApprovals);
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          contracts: [...client.contracts, newContract]
        };
      }
      return client;
    }));
    toast.success("Contract added successfully");
    return newContract;
  };

  const handleDeleteContract = async (clientId: string, contractId: string) => {
    await clientService.deleteContract(contractId);
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          contracts: client.contracts.filter(contract => contract.id !== contractId)
        };
      }
      return client;
    }));
    toast.success("Contract deleted successfully");
  };

  const handleAddSubscriberPoint = async (
    clientId: string,
    contractId: string,
    name: string,
    networkNumber: string,
    validityDate: string,
    type: 'Coordinator' | 'Client'
  ) => {
    const newPoint = await clientService.addSubscriberPoint(
      contractId,
      name,
      networkNumber,
      validityDate,
      type
    );
    
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          contracts: client.contracts.map(contract => {
            if (contract.id === contractId) {
              return {
                ...contract,
                subscriberPoints: [...contract.subscriberPoints, newPoint]
              };
            }
            return contract;
          })
        };
      }
      return client;
    }));
    
    toast.success("Subscriber point added successfully");
    return newPoint;
  };

  const handleDeleteSubscriberPoint = async (clientId: string, contractId: string, pointId: string) => {
    await clientService.deleteSubscriberPoint(pointId);
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          contracts: client.contracts.map(contract => {
            if (contract.id === contractId) {
              return {
                ...contract,
                subscriberPoints: contract.subscriberPoints.filter(point => point.id !== pointId)
              };
            }
            return contract;
          })
        };
      }
      return client;
    }));
    toast.success("Subscriber point deleted successfully");
  };

  return (
    <ClientContext.Provider 
      value={{ 
        clients,
        addClient: handleAddClient,
        updateClient: handleUpdateClient,
        deleteClient: handleDeleteClient,
        addContract: handleAddContract,
        deleteContract: handleDeleteContract,
        addSubscriberPoint: handleAddSubscriberPoint,
        deleteSubscriberPoint: handleDeleteSubscriberPoint,
        getClient: clientService.getClient,
        getSubscriberPointsByTin: clientService.getSubscriberPointsByTin
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
};
