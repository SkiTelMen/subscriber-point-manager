
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

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export type DatabaseOperation = 'create' | 'read' | 'update' | 'delete' | 'connect' | 'disconnect' | 'query';

interface LogEntry {
  timestamp: string;
  operation: DatabaseOperation;
  table: keyof DatabaseSchema | 'connection';
  level: LogLevel;
  message: string;
  data?: any;
}

// Logger for database operations with enhanced details
export const logDatabaseOperation = (
  operation: DatabaseOperation,
  table: keyof DatabaseSchema | 'connection',
  message: string,
  data?: any,
  level: LogLevel = 'info'
) => {
  const timestamp = new Date().toISOString();
  const logEntry: LogEntry = {
    timestamp,
    operation,
    table,
    level,
    message,
    data
  };
  
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${operation.toUpperCase()} operation on ${table}: ${message}`);
  
  if (data && level !== 'info') {
    console.log(data);
  }
  
  // In a real implementation, this would send logs to a backend service
  return logEntry;
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

// Generate SQL-like query for debugging (simulation only)
export const generateQueryString = (
  operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE',
  table: keyof DatabaseSchema,
  conditions?: Record<string, any>,
  values?: Record<string, any>
): string => {
  let query = '';
  
  switch (operation) {
    case 'SELECT':
      query = `SELECT * FROM ${table}`;
      if (conditions) {
        const whereClause = Object.entries(conditions)
          .map(([key, value]) => `${key} = '${value}'`)
          .join(' AND ');
        query += ` WHERE ${whereClause}`;
      }
      break;
      
    case 'INSERT':
      if (values) {
        const columns = Object.keys(values).join(', ');
        const vals = Object.values(values).map(v => `'${v}'`).join(', ');
        query = `INSERT INTO ${table} (${columns}) VALUES (${vals})`;
      }
      break;
      
    case 'UPDATE':
      if (values && conditions) {
        const setClause = Object.entries(values)
          .map(([key, value]) => `${key} = '${value}'`)
          .join(', ');
        const whereClause = Object.entries(conditions)
          .map(([key, value]) => `${key} = '${value}'`)
          .join(' AND ');
        query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
      }
      break;
      
    case 'DELETE':
      query = `DELETE FROM ${table}`;
      if (conditions) {
        const whereClause = Object.entries(conditions)
          .map(([key, value]) => `${key} = '${value}'`)
          .join(' AND ');
        query += ` WHERE ${whereClause}`;
      }
      break;
  }
  
  return query + ';';
};
