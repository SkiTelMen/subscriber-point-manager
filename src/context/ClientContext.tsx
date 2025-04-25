
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client, Contract, SubscriberPoint } from "@/types";
import { supabase } from "@/integrations/supabase/client";
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
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select(`
          *,
          contracts:contracts (
            *,
            subscriberPoints:subscriber_points (*)
          )
        `);

      if (clientsError) throw clientsError;

      const formattedClients = clientsData.map((client: any) => ({
        ...client,
        contracts: client.contracts || []
      }));

      setClients(formattedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error("Failed to load clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const addClient = async (clientData: Omit<Client, "id" | "contracts">) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;

      setClients(prev => [...prev, { ...data, contracts: [] }]);
      toast.success("Client added successfully");
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error("Failed to add client");
      throw error;
    }
  };

  const updateClient = async (updatedClient: Client) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          name: updatedClient.name,
          tin: updatedClient.tin,
          ogrn: updatedClient.ogrn,
          legal_address: updatedClient.legalAddress,
          actual_address: updatedClient.actualAddress,
          phone_number: updatedClient.phoneNumber,
          contact_person: updatedClient.contactPerson,
          contact_person_phone: updatedClient.contactPersonPhone,
        })
        .eq('id', updatedClient.id);

      if (error) throw error;

      setClients(prev => prev.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      ));
      toast.success("Client updated successfully");
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error("Failed to update client");
      throw error;
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) throw error;

      setClients(prev => prev.filter(client => client.id !== clientId));
      toast.success("Client deleted successfully");
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error("Failed to delete client");
      throw error;
    }
  };

  const addContract = async (
    clientId: string,
    contractNumber: string,
    contractDate: string,
    numberOfApprovals?: string
  ): Promise<Contract> => {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .insert([{
          client_id: clientId,
          contract_number: contractNumber,
          contract_date: contractDate,
          number_of_approvals: numberOfApprovals,
        }])
        .select()
        .single();

      if (error) throw error;

      const newContract: Contract = {
        id: data.id,
        clientId: data.client_id,
        contractNumber: data.contract_number,
        contractDate: data.contract_date,
        numberOfApprovals: data.number_of_approvals,
        subscriberPoints: []
      };

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
    } catch (error) {
      console.error('Error adding contract:', error);
      toast.error("Failed to add contract");
      throw error;
    }
  };

  const deleteContract = async (clientId: string, contractId: string) => {
    try {
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', contractId);

      if (error) throw error;

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
    } catch (error) {
      console.error('Error deleting contract:', error);
      toast.error("Failed to delete contract");
      throw error;
    }
  };

  const addSubscriberPoint = async (
    clientId: string,
    contractId: string,
    name: string,
    networkNumber: string,
    validityDate: string,
    type: 'Coordinator' | 'Client'
  ): Promise<SubscriberPoint> => {
    try {
      const { data, error } = await supabase
        .from('subscriber_points')
        .insert([{
          contract_id: contractId,
          name,
          network_number: networkNumber,
          validity_date: validityDate,
          type
        }])
        .select()
        .single();

      if (error) throw error;

      const newPoint: SubscriberPoint = {
        id: data.id,
        contractId: data.contract_id,
        name: data.name,
        networkNumber: data.network_number,
        validityDate: data.validity_date,
        type: data.type
      };

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
    } catch (error) {
      console.error('Error adding subscriber point:', error);
      toast.error("Failed to add subscriber point");
      throw error;
    }
  };

  const deleteSubscriberPoint = async (clientId: string, contractId: string, pointId: string) => {
    try {
      const { error } = await supabase
        .from('subscriber_points')
        .delete()
        .eq('id', pointId);

      if (error) throw error;

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
    } catch (error) {
      console.error('Error deleting subscriber point:', error);
      toast.error("Failed to delete subscriber point");
      throw error;
    }
  };

  const getClient = async (clientId: string): Promise<Client | undefined> => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          contracts:contracts (
            *,
            subscriberPoints:subscriber_points (*)
          )
        `)
        .eq('id', clientId)
        .single();

      if (error) throw error;
      if (!data) return undefined;

      return {
        ...data,
        contracts: data.contracts || []
      };
    } catch (error) {
      console.error('Error fetching client:', error);
      toast.error("Failed to fetch client");
      return undefined;
    }
  };

  const getSubscriberPointsByTin = async (tin: string) => {
    try {
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select(`
          *,
          contracts:contracts (
            *,
            subscriberPoints:subscriber_points (*)
          )
        `)
        .eq('tin', tin)
        .single();

      if (clientError) throw clientError;
      if (!client) return null;

      const subscriberPoints = client.contracts.flatMap((contract: any) =>
        contract.subscriberPoints.map((point: any) => ({
          ...point,
          contractId: contract.id
        }))
      );

      return {
        client: {
          ...client,
          contracts: client.contracts || []
        },
        subscriberPoints
      };
    } catch (error) {
      console.error('Error fetching subscriber points by TIN:', error);
      toast.error("Failed to fetch subscriber points");
      return null;
    }
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
