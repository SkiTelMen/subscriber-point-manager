
import { SubscriberPoint, Client, Contract } from "@/types";
import { getFutureDate } from "./dateUtils";

/**
 * Interface to represent subscriber points with additional details
 */
export interface SubscriberPointWithDetails {
  id: string;
  name: string;
  networkNumber: string;
  validityDate: string;
  type: 'Coordinator' | 'Client';
  contractNumber: string;
  contractDate: string;
  clientName: string;
  clientTin: string;
  clientId: string;
  contractId: string;
}

/**
 * Creates a default subscriber point with a validity date set to 365 days from now
 * @returns Partial subscriber point with defaults
 */
export const createDefaultSubscriberPoint = (): Partial<SubscriberPoint> => {
  return {
    validityDate: getFutureDate(365), // 365 days from now
    type: 'Coordinator'
  };
};

/**
 * Enrich subscriber points with client and contract details for display
 * @param clients List of all clients
 * @returns Array of subscriber points with additional details
 */
export const getEnrichedSubscriberPoints = (clients: Client[]): SubscriberPointWithDetails[] => {
  const points: SubscriberPointWithDetails[] = [];
  
  clients.forEach((client: Client) => {
    client.contracts.forEach((contract: Contract) => {
      contract.subscriberPoints.forEach((point: SubscriberPoint) => {
        points.push({
          id: point.id,
          name: point.name,
          networkNumber: point.networkNumber,
          validityDate: point.validityDate,
          type: point.type,
          contractNumber: contract.contractNumber,
          contractDate: contract.contractDate,
          clientName: client.name,
          clientTin: client.tin,
          clientId: client.id,
          contractId: contract.id
        });
      });
    });
  });
  
  return points;
};

/**
 * Filter subscriber points based on search term and filters
 * @param points List of all subscriber points with details
 * @param searchTerm General search term
 * @param filters Specific filters for fields
 * @returns Filtered subscriber points
 */
export const filterSubscriberPoints = (
  points: SubscriberPointWithDetails[], 
  searchTerm: string,
  filters: Record<string, string>
): SubscriberPointWithDetails[] => {
  return points.filter(point => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        point.name.toLowerCase().includes(searchLower) ||
        point.networkNumber.toLowerCase().includes(searchLower) ||
        point.clientName.toLowerCase().includes(searchLower) ||
        point.clientTin.toLowerCase().includes(searchLower) ||
        point.contractNumber.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }
    
    for (const key in filters) {
      if (filters[key]) {
        const filterValue = filters[key]?.toLowerCase();
        const pointValue = String(point[key as keyof SubscriberPointWithDetails]).toLowerCase();
        
        if (filterValue && !pointValue.includes(filterValue)) {
          return false;
        }
      }
    }
    
    return true;
  });
};

/**
 * Sort subscriber points based on a field and direction
 * @param points List of subscriber points to sort
 * @param key Field to sort by
 * @param direction Sort direction ('asc' or 'desc')
 * @returns Sorted subscriber points
 */
export const sortSubscriberPoints = (
  points: SubscriberPointWithDetails[],
  key: keyof SubscriberPointWithDetails | null,
  direction: 'asc' | 'desc'
): SubscriberPointWithDetails[] => {
  const sorted = [...points];
  if (key) {
    sorted.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  return sorted;
};
