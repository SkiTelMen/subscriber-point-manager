import { DatabaseSchema, createDatabaseStructure, logDatabaseOperation } from './databaseStructure';

// Database instance
let database: DatabaseSchema | null = null;

// Initialize the database
export const initializeDatabase = async () => {
  if (!database) {
    database = createDatabaseStructure();
    logDatabaseOperation('create', 'clients', 'Database initialized');
  }
  return database;
};

// Get database instance
export const getDatabase = (): DatabaseSchema => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

// Reset database (useful for testing)
export const resetDatabase = () => {
  database = createDatabaseStructure();
  logDatabaseOperation('create', 'clients', 'Database reset');
};

// Export configuration (keep existing configuration)
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'subscriber_manager',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

/**
 * Note: For a complete implementation of PostgreSQL in a web application,
 * you should use a backend service like Supabase, Firebase, or a custom
 * Node.js/Express server with pg (node-postgres) library.
 * 
 * Browser-based applications cannot directly connect to PostgreSQL
 * due to security restrictions.
 */
