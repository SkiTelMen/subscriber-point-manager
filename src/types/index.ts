
export interface SubscriberPoint {
  id: string;
  contractId: string;
  name: string;
  networkNumber: string;
  validityDate: string;
  type: 'Coordinator' | 'hardware';
}
