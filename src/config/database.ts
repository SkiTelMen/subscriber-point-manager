
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
  connectionTimeout: number;
  idleTimeout: number;
  maxConnections: number;
}

const config: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'subscriber_manager',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.DB_SSL === 'true',
  connectionTimeout: parseInt(process.env.DB_CONNECTION_TIMEOUT || '30000'),
  idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '10000'),
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
};

export default config;
