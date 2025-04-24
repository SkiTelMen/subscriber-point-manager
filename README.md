
# Subscriber Management System

## Overview
This application is a comprehensive system for managing subscribers, contracts, and client relationships. It supports multiple languages (currently Russian) and provides various features for tracking and managing client data.

## Key Features
- Client Management
- Contract Tracking
- Subscriber Points Management
- TIN-based Lookup
- Multi-language Support (Russian)
- PostgreSQL Database Integration

## Module Description

### Client Management (`src/pages/ClientsPage.tsx`)
- Displays list of clients
- Supports searching by name or TIN
- CRUD operations for client records
- Automatic address and phone number copying functionality

### Contract Management (`src/components/ContractSection.tsx`)
- Manages contracts per client
- Tracks contract dates and numbers
- Links contracts to subscriber points

### Subscriber Points (`src/pages/SubscriberPointsPage.tsx`)
- Manages subscriber points
- Supports two types: Coordinator and Client
- Automatic 365-day validity period
- Filtering and sorting capabilities

### TIN Lookup (`src/pages/TinLookupPage.tsx`)
- Quick client search by TIN
- Displays associated subscriber points
- Shows contract information

## Database Configuration

### PostgreSQL Setup
1. Install PostgreSQL on your server
2. Configure database connection in \`src/utils/dbService.ts\`:
   ```typescript
   export const dbConfig = {
     host: process.env.DB_HOST || 'localhost',
     port: parseInt(process.env.DB_PORT || '5432'),
     database: process.env.DB_NAME || 'subscriber_manager',
     user: process.env.DB_USER || 'postgres',
     password: process.env.DB_PASSWORD || 'password',
   };
   ```
3. Set up environment variables in your deployment environment

### Database Migration
The application includes migration utilities in \`src/utils/dbService.ts\` for transferring data from local storage to PostgreSQL.

## Deployment Instructions

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn package manager

### Deployment Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd subscriber-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create environment variables in your deployment environment:
   - DB_HOST
   - DB_PORT
   - DB_NAME
   - DB_USER
   - DB_PASSWORD

4. **Build the Application**
   ```bash
   npm run build
   ```

5. **Deploy the Built Files**
   - Copy the contents of the \`dist\` directory to your web server
   - Configure your web server (nginx, Apache, etc.) to serve the static files

6. **Database Setup**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE subscriber_manager;
   
   # Configure database permissions
   GRANT ALL PRIVILEGES ON DATABASE subscriber_manager TO your_user;
   ```

7. **Start the Application**
   ```bash
   # For production
   npm run start
   
   # For development
   npm run dev
   ```

### Deployment Platforms

#### Heroku
1. Create a new Heroku application
2. Add PostgreSQL addon
3. Configure environment variables in Heroku dashboard
4. Deploy using Heroku Git or GitHub integration

#### DigitalOcean
1. Create a new DigitalOcean App
2. Connect to GitHub repository
3. Add PostgreSQL database
4. Configure environment variables
5. Deploy

## Development

### Local Development Setup
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start development server: \`npm run dev\`
4. Access the application at \`http://localhost:8080\`

### Adding New Features
1. Create new components in \`src/components\`
2. Add new pages in \`src/pages\`
3. Update translations in \`src/i18n.ts\`
4. Update types in \`src/types/index.ts\`

### Code Structure
- \`src/components\`: Reusable UI components
- \`src/pages\`: Main application pages
- \`src/context\`: React context providers
- \`src/utils\`: Utility functions
- \`src/types\`: TypeScript type definitions
- \`src/i18n\`: Internationalization configuration

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Create a pull request

## License
This project is licensed under the MIT License.
