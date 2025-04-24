
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client, Contract, SubscriberPoint } from "@/types";
import { loadClients, saveClients, generateId } from "@/utils/dataStorage";

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "contracts">) => void;
  updateClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  addContract: (clientId: string, contractNumber: string, contractDate: string) => Contract;
  deleteContract: (clientId: string, contractId: string) => void;
  addSubscriberPoint: (
    clientId: string, 
    contractId: string, 
    name: string, 
    networkNumber: string,
    validityDate: string,
    type: 'Coordinator' | 'Client'
  ) => SubscriberPoint;
  deleteSubscriberPoint: (clientId: string, contractId: string, pointId: string) => void;
  getClient: (clientId: string) => Client | undefined;
  getSubscriberPointsByTin: (tin: string) => { client: Client, subscriberPoints: (SubscriberPoint & { contractId: string })[] } | null;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    setClients(loadClients());
  }, []);

  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  const addClient = (clientData: Omit<Client, "id" | "contracts">) => {
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      contracts: []
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (updatedClient: Client) => {
    setClients(prev => prev.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const deleteClient = (clientId: string) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
  };

  const addContract = (clientId: string, contractNumber: string, contractDate: string): Contract => {
    const newContract: Contract = {
      id: generateId(),
      clientId,
      contractNumber,
      contractDate,
      subscriberPoints: []
    };

    setClients(prev => 
      prev.map(client => {
        if (client.id === clientId) {
          return {
            ...client,
            contracts: [...client.contracts, newContract]
          };
        }
        return client;
      })
    );

    return newContract;
  };

  const deleteContract = (clientId: string, contractId: string) => {
    setClients(prev => 
      prev.map(client => {
        if (client.id === clientId) {
          return {
            ...client,
            contracts: client.contracts.filter(contract => contract.id !== contractId)
          };
        }
        return client;
      })
    );
  };

  const addSubscriberPoint = (
    clientId: string, 
    contractId: string, 
    name: string, 
    networkNumber: string,
    validityDate: string,
    type: 'Coordinator' | 'Client'
  ): SubscriberPoint => {
    const newSubscriberPoint: SubscriberPoint = {
      id: generateId(),
      contractId,
      name,
      networkNumber,
      validityDate,
      type
    };

    setClients(prev => 
      prev.map(client => {
        if (client.id === clientId) {
          return {
            ...client,
            contracts: client.contracts.map(contract => {
              if (contract.id === contractId) {
                return {
                  ...contract,
                  subscriberPoints: [...contract.subscriberPoints, newSubscriberPoint]
                };
              }
              return contract;
            })
          };
        }
        return client;
      })
    );

    return newSubscriberPoint;
  };

  const deleteSubscriberPoint = (clientId: string, contractId: string, pointId: string) => {
    setClients(prev => 
      prev.map(client => {
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
      })
    );
  };

  const getClient = (clientId: string): Client | undefined => {
    return clients.find(client => client.id === clientId);
  };

  const getSubscriberPointsByTin = (tin: string) => {
    const client = clients.find(c => c.tin === tin);
    
    if (!client) return null;
    
    const subscriberPoints: (SubscriberPoint & { contractId: string })[] = [];
    
    client.contracts.forEach(contract => {
      contract.subscriberPoints.forEach(point => {
        subscriberPoints.push({
          ...point,
          contractId: contract.id
        });
      });
    });
    
    return { client, subscriberPoints };
  };

  return (
    <ClientContext.Provider 
      value={{ 
        clients, 
        addClient, 
        updateClient, 
        deleteClient, 
        addContract, 
        deleteContract,
        addSubscriberPoint,
        deleteSubscriberPoint, 
        getClient,
        getSubscriberPointsByTin
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
