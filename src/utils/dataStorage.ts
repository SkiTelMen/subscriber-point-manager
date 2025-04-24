
import { Client, Contract, SubscriberPoint } from "@/types";

// Local storage keys
const CLIENTS_STORAGE_KEY = "subscriber-manager-clients";

// Helper to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Load clients from local storage
export const loadClients = (): Client[] => {
  const storedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);
  return storedClients ? JSON.parse(storedClients) : [];
};

// Save clients to local storage
export const saveClients = (clients: Client[]): void => {
  localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
};

// Add a new client
export const addClient = (client: Omit<Client, "id" | "contracts">): Client => {
  const newClient: Client = {
    ...client,
    id: generateId(),
    contracts: []
  };
  
  const clients = loadClients();
  clients.push(newClient);
  saveClients(clients);
  
  return newClient;
};

// Update an existing client
export const updateClient = (client: Client): void => {
  const clients = loadClients();
  const index = clients.findIndex(c => c.id === client.id);
  
  if (index !== -1) {
    clients[index] = client;
    saveClients(clients);
  }
};

// Delete a client
export const deleteClient = (clientId: string): void => {
  const clients = loadClients();
  const updatedClients = clients.filter(client => client.id !== clientId);
  saveClients(updatedClients);
};

// Add a contract to a client
export const addContract = (clientId: string, contractNumber: string, contractDate: string): Contract => {
  const newContract: Contract = {
    id: generateId(),
    clientId,
    contractNumber,
    contractDate,
    subscriberPoints: []
  };
  
  const clients = loadClients();
  const clientIndex = clients.findIndex(c => c.id === clientId);
  
  if (clientIndex === -1) {
    throw new Error(`Client with id ${clientId} not found`);
  }
  
  clients[clientIndex].contracts.push(newContract);
  saveClients(clients);
  
  return newContract;
};

// Add a subscriber point to a contract
export const addSubscriberPoint = (
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
  
  const clients = loadClients();
  const clientIndex = clients.findIndex(c => c.id === clientId);
  
  if (clientIndex === -1) {
    throw new Error(`Client with id ${clientId} not found`);
  }
  
  const contractIndex = clients[clientIndex].contracts.findIndex(c => c.id === contractId);
    
  if (contractIndex === -1) {
    throw new Error(`Contract with id ${contractId} not found`);
  }
  
  clients[clientIndex].contracts[contractIndex].subscriberPoints.push(newSubscriberPoint);
  saveClients(clients);
  
  return newSubscriberPoint;
};

// Get all subscriber points by TIN
export const getSubscriberPointsByTin = (tin: string): { client: Client, subscriberPoints: (SubscriberPoint & { contractId: string })[] } | null => {
  const clients = loadClients();
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
