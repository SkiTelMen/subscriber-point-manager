
export interface Client {
  id: string;
  name: string;
  tin: string;
  ogrn: string;
  legalAddress: string;
  actualAddress: string;
  phoneNumber: string;
  contactPerson: string;
  contactPersonPhone: string;
  contracts: Contract[];
}

export interface Contract {
  id: string;
  clientId: string;
  contractNumber: string;
  contractDate: string;
  subscriberPoints: SubscriberPoint[];
}

export interface SubscriberPoint {
  id: string;
  contractId: string;
  name: string;
  networkNumber: string;
  validityDate: string;
  type: 'Coordinator' | 'Client';
}
