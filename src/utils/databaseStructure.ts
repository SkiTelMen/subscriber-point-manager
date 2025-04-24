
import { Client, Contract, SubscriberPoint } from "@/types";

export interface DatabaseSchema {
  clients: {
    [id: string]: Client;
  };
  contracts: {
    [id: string]: Contract;
  };
  subscriberPoints: {
    [id: string]: SubscriberPoint;
  };
}

export const createDatabaseStructure = (): DatabaseSchema => {
  return {
    clients: {},
    contracts: {},
    subscriberPoints: {},
  };
};

export const logDatabaseOperation = (
  operation: 'create' | 'update' | 'delete',
  table: keyof DatabaseSchema,
  data: any
) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${operation.toUpperCase()} operation on ${table}:`, data);
};

// Helper function to format the database for display
export const formatDatabaseForDisplay = (db: DatabaseSchema): string => {
  return JSON.stringify(db, null, 2);
};

// Helper function to validate database structure
export const validateDatabaseStructure = (db: DatabaseSchema): boolean => {
  return (
    typeof db === 'object' &&
    'clients' in db &&
    'contracts' in db &&
    'subscriberPoints' in db
  );
};
